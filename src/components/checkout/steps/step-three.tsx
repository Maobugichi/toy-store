import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { useState } from "react";

import { paymentSchema } from "../validation";
import type { PaymentData } from "../validation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Lock, ChevronDown } from "lucide-react";
import PaymentStatusModal from "../payment-modal"; 

async function fetchRate() {
  const res = await fetch("https://api.exchangerate-api.com/v4/latest/NGN");
  const data = await res.json();
  return data.rates.USD;
}

const backendEndpoint = import.meta.env.VITE_API_URL;

const NGN_TO_USD_RATE = await fetchRate();

interface StepThreeProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  subtotal: number;
  shippingCost: number;
}

export default function StepThree({
  currentStep,
  setCurrentStep,
  subtotal,
  shippingCost,
}: StepThreeProps) {
  const total = subtotal + shippingCost;
  const totalInUSD = Math.round(total * NGN_TO_USD_RATE * 100) / 100; 
  
  const [open, setOpen] = useState(false);
  const [paymentData, setPaymentData] = useState<any>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

 
  const handlePaymentComplete = () => {
    toast.success("Payment confirmed! Redirecting...", {
      duration: 3000,
    });
    
    // Close modal after a short delay
    setTimeout(() => {
      setShowPaymentModal(false);
      
      
      setTimeout(() => {
        window.location.href = "/"; // Change to your success route
      }, 500);
    }, 2000);
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PaymentData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      paymentMethod: "crypto",
      payCurrency: "",
      saveInfo: false,
      sameAsShipping: true,
    },
  });

  const paymentMethod = watch("paymentMethod");
  const payCurrency = watch("payCurrency");

  // ✅ Fetch currencies using TanStack Query
  const { data: currencies, isLoading: loadingCurrencies } = useQuery({
    queryKey: ["currencies"],
    queryFn: async () => {
      const res = await axios.get(`${backendEndpoint}/api/payments/currencies`, {
        withCredentials: true,
      });
      return res.data;
    },
  });

  
  const createInvoice = useMutation({
    mutationFn: async (payload: {
      price_amount: number;
      pay_currency: string;
    }) => {
      const res = await axios.post(
        `${backendEndpoint}/api/payments/create-payment`,
        {
          order_id: `ORDER-${Date.now()}`,
          price_amount: payload.price_amount,
          price_currency: "usd",
          pay_currency: payload.pay_currency,
          order_description: "Order payment via NOWPayments",
        },
        { withCredentials: true }
      );
      console.log("Payment created:", res.data);
      return res.data;
    },
    onMutate: () => {
      toast.loading("Creating your payment invoice...", {
        id: "create-payment",
      });
    },
    onSuccess: (data) => {
      toast.dismiss("create-payment");
      
     
      setPaymentData(data);
      setShowPaymentModal(true);
      
      toast.success("Payment invoice created! Please complete the payment.", {
        duration: 4000,
      });
      
      // Optional: If you want to also redirect to NOWPayments hosted page
      // Uncomment the lines below
      // if (data.invoice_url) {
      //   setTimeout(() => {
      //     window.open(data.invoice_url, '_blank');
      //   }, 1000);
      // }
    },
    onError: (error: any) => {
      toast.dismiss("create-payment");
      console.error("Payment creation error:", error);
      toast.error(
        error?.response?.data?.message || 
        error?.response?.data?.error || 
        "Failed to create payment. Please try again.",
        { duration: 5000 }
      );
    },
  });

  const onSubmit = (data: PaymentData) => {
    if (!data.payCurrency) {
      toast.error("Please select a cryptocurrency.");
      return;
    }
    
    createInvoice.mutate({
      price_amount: totalInUSD, 
      pay_currency: data.payCurrency,
    });
  };

  if (currentStep !== 3) return null;

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold">
              3
            </div>
            Payment Information
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Tabs
              value={paymentMethod}
              onValueChange={(val) => setValue("paymentMethod", val)}
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="crypto">Crypto</TabsTrigger>
              </TabsList>

              <TabsContent value="crypto" className="space-y-4">
                <Label>Select Cryptocurrency</Label>

                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      className="w-full justify-between"
                      disabled={loadingCurrencies}
                    >
                      {payCurrency
                        ? payCurrency.toUpperCase()
                        : loadingCurrencies
                          ? "Loading currencies..."
                          : "Select a crypto currency..."}
                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent className="w-[300px] p-0">
                    <Command>
                      <CommandInput placeholder="Search currency..." />
                      <CommandList>
                        <CommandEmpty>No currency found.</CommandEmpty>
                        <CommandGroup>
                          {currencies?.currencies?.map((currency: any) => (
                            <CommandItem
                              key={currency}
                              onSelect={() => {
                                setValue("payCurrency", currency);
                                setOpen(false);
                              }}
                            >
                              <div className="flex justify-between w-full">
                                <span className="text-gray-500 text-sm">
                                  {currency.toUpperCase()}
                                </span>
                              </div>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>

                {errors.payCurrency && (
                  <p className="text-red-500 text-sm">
                    {errors.payCurrency.message}
                  </p>
                )}

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-sm text-blue-900 font-medium">
                    Total Amount: ₦{total.toLocaleString()} ≈ ${totalInUSD.toFixed(2)} USD
                  </p>
                  <p className="text-xs text-blue-700 mt-1">
                    You'll pay in {payCurrency ? payCurrency.toUpperCase() : "cryptocurrency"}
                  </p>
                </div>

                <p className="text-gray-600 text-sm">
                  Complete your crypto payment securely via NOWPayments. Your payment will be automatically confirmed.
                </p>
              </TabsContent>
            </Tabs>

            <div className="flex items-center space-x-2 pt-4">
              <Checkbox id="sameAsShipping" {...register("sameAsShipping")} />
              <Label htmlFor="sameAsShipping">
                Billing address same as shipping
              </Label>
            </div>

            <div className="flex items-center space-x-2 pt-4">
              <Checkbox id="saveInfo" {...register("saveInfo")} />
              <Label htmlFor="saveInfo" className="text-sm">
                Save payment info for future purchases
              </Label>
            </div>

            <Alert className="mt-10 flex items-center">
              <Lock className="h-4 w-4" />
              <AlertDescription className="text-xs md:text-sm">
                Your payment is processed securely via NOWPayments. All transactions are encrypted and secure.
              </AlertDescription>
            </Alert>

            <div className="flex md:flex-row flex-col gap-3 md:justify-between pt-6">
              <Button 
                type="button"
                variant="outline" 
                onClick={() => setCurrentStep(2)}
                disabled={createInvoice.isPending}
              >
                Back to Shipping
              </Button>

              <Button
                type="submit"
                className="bg-green-600 hover:bg-green-700"
                disabled={createInvoice.isPending || !payCurrency}
              >
                {createInvoice.isPending ? (
                  <>
                    <span className="mr-2">Processing...</span>
                    <Lock className="h-4 w-4 animate-pulse" />
                  </>
                ) : (
                  <>
                    Complete Order - ₦{total.toLocaleString()}
                    <Lock className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Payment Status Modal with Auto-Polling */}
      <PaymentStatusModal
        paymentData={paymentData}
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onPaymentComplete={handlePaymentComplete}
      />
    </>
  );
}