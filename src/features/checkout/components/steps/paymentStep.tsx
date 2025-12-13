import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";
import { paymentSchema, type PaymentFormData } from "../../validation/checkoutSchema";
import type { PaymentData } from "../../types/checkout.types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Lock } from "lucide-react";
import { CryptoPaymentSection } from "./sections/cryptoPaymentSection";
import PaymentStatusModal from "../paymentModal/paymentStatusModal";
import { useCreatePayment } from "../../hooks/useCreatePayment";
import { useCurrencies } from "../../hooks/useCurrencies";
import { convertNGNtoUSD } from "../../utils/checkOutHelper";

interface PaymentStepProps {
  currentStep: number;
  subtotal: number;
  shippingCost: number;
  onBack:() => void
}

export default function PaymentStep({
  currentStep,
  subtotal,
  shippingCost,
  onBack
}: PaymentStepProps) {
  const total = subtotal + shippingCost;
  const totalInUSD = convertNGNtoUSD(total);
  
  const [open, setOpen] = useState<boolean>(false);
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);

  const { data: currencies, isLoading: loadingCurrencies } = useCurrencies();
  const createInvoice = useCreatePayment({
    onSuccess: (data:PaymentData) => {
      setPaymentData(data);
      setShowPaymentModal(true);
    }
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PaymentFormData>({
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

  const handlePaymentComplete = () => {
    toast.success("Payment confirmed! Redirecting...", {
      duration: 3000,
    });
    
    setTimeout(() => {
      setShowPaymentModal(false);
      setTimeout(() => {
        window.location.href = "/";
      }, 500);
    }, 2000);
  };

  const onSubmit = (data: PaymentFormData) => {
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
                <CryptoPaymentSection
                  currencies={currencies}
                  loadingCurrencies={loadingCurrencies}
                  payCurrency={payCurrency}
                  setValue={setValue}
                  errors={errors}
                  open={open}
                  setOpen={setOpen}
                  total={total}
                  totalInUSD={totalInUSD}
                />
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
                onClick={onBack}
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

      <PaymentStatusModal
        paymentData={paymentData}
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onPaymentComplete={handlePaymentComplete}
      />
    </>
  );
}