import { useQuery } from "@tanstack/react-query";
import api from "@/config/axios-config";

export const useCurrencies = () => {
  return useQuery({
    queryKey: ["currencies"],
    queryFn: async () => {
      const res = await api.get("/api/payments/currencies");
      return res.data;
    },
    retry: 2,
  });
};