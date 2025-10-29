import { queryOptions } from "@tanstack/react-query";
import api from "@/lib/axios-config";


const fetchProducts = async () => {
  const url = import.meta.env.VITE_API_URL;
  try {
    const response = await api.get(`${url}/api/products/`);
    const products = response.data;


    for (let i = products.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [products[i], products[j]] = [products[j], products[i]];
    }

    return products;
  } catch (err) {
    console.log(err);
    return [];
  }
};


export const productsQueryOptions = queryOptions({
  queryKey: ["products"],
  queryFn: fetchProducts,
  staleTime: 1000 * 60 * 5, 
});

