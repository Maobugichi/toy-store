import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { ChevronDown } from "lucide-react";
import type { UseFormSetValue, FieldErrors } from "react-hook-form";

interface CryptoPaymentSectionProps {
  currencies: any;
  loadingCurrencies: boolean;
  payCurrency: string;
  setValue: UseFormSetValue<any>;
  errors: FieldErrors<any>;
  open: boolean;
  setOpen: (open: boolean) => void;
  total: number;
  totalInUSD: number;
}

export const CryptoPaymentSection = ({
  currencies,
  loadingCurrencies,
  payCurrency,
  setValue,
  errors,
  open,
  setOpen,
  total,
  totalInUSD,
}: CryptoPaymentSectionProps) => {
  return (
    <>
      <Label>Select Cryptocurrency</Label>

      <Popover open={open} onOpenChange={setOpen} modal={true}>
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

        <PopoverContent 
          className="w-[var(--radix-popover-trigger-width)] p-0 max-h-[300px] overflow-hidden"
          align="start"
          side="bottom"
          sideOffset={4}
        >
          <Command className="max-h-[300px]">
            <CommandInput placeholder="Search currency..." className="h-9" />
            <CommandList className="max-h-[250px] overflow-y-auto">
              <CommandEmpty>No currency found.</CommandEmpty>
              <CommandGroup>
                {currencies?.currencies?.map((currency: any) => (
                  <CommandItem
                    key={currency}
                    value={currency}
                    onSelect={() => {
                      setValue("payCurrency", currency);
                      setOpen(false);
                    }}
                    className="cursor-pointer"
                  >
                    <div className="flex justify-between w-full">
                      <span className="font-medium">
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
          {errors.payCurrency.message as string}
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
    </>
  );
};