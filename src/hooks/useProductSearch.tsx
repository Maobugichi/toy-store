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

        console.log(query)
        // Simple case-insensitive filter
        const filtered = products.filter((p: any) =>
          p.base_name.toLowerCase().includes(query.toLowerCase())
        );
       
        setResults(filtered);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 400); // debounce 400ms

    return () => clearTimeout(delayDebounce);
  }, [query]);

  return { results, loading };
}
