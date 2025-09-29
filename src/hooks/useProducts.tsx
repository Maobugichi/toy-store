import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const fetchProducts = async () => {
  const url = import.meta.env.VITE_API_URL
  const res = await axios.get(`${url}/api/products/`);
  return res.data;
};

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5,
  });
};