import { useState, useEffect } from "react";
import axios from "axios";

export function useProductSearch(query: string) {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      setLoading(true);
      try {
        const url = import.meta.env.VITE_API_URL;
        const res = await axios.get(`${url}/api/products/`, {
          withCredentials: true,
        });
        const products = res.data;

       
        const filtered = products.filter((p: any) => {
          const searchQuery = query.toLowerCase();
          return (
            p.name?.toLowerCase().includes(searchQuery) ||
            p.base_name?.toLowerCase().includes(searchQuery) ||
            p.color?.toLowerCase().includes(searchQuery) ||
            p.description?.toLowerCase().includes(searchQuery) || 
            p.short_description?.toLowerCase().includes(searchQuery) || 
            p.sku?.toLowerCase().includes(searchQuery)
          );
        });
        
        console.log("Filtered results:", filtered);
        setResults(filtered);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  return { results, loading };
}