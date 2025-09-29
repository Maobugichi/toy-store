import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const fetchProducts = async () => {
  const res = await axios.get("http://localhost:3000/api/products/");
  return res.data;
};

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5,
  });
};