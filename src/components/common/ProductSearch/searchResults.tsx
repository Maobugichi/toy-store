import { CommandEmpty, CommandGroup } from "@/components/ui/command";
import { Loader2 } from "lucide-react";
import { SearchResultItem } from "./searchResultItem";
import type { Product } from "@/types";

interface SearchResultsProps {
  query: string;
  results: Product[];
  loading: boolean;
  onSelect: () => void;
}

export const SearchResults = ({ query, results, loading, onSelect }: SearchResultsProps) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center p-6 text-gray-500">
        <Loader2 className="animate-spin w-4 h-4 mr-2" />
        Searching...
      </div>
    );
  }

  if (query && results.length === 0) {
    return <CommandEmpty>No products found.</CommandEmpty>;
  }

  if (results.length === 0) {
    return null;
  }

  return (
    <CommandGroup heading="Products">
      {results.map((item) => (
        <SearchResultItem
          key={item.id}
          product={item}
          onSelect={onSelect}
        />
      ))}
    </CommandGroup>
  );
};