import { useState } from "react";
import { CommandDialog, CommandInput, CommandList } from "@/components/ui/command";
import { useProductSearch } from "@/hooks/useProductSearch";
import { useSearchKeyboard } from "@/hooks/useSearchKeyboard";
import { SearchButton } from "./searchButton";
import { SearchResults } from "./searchResults";

export const SearchCommand = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { results, loading } = useProductSearch(query);

  useSearchKeyboard({ open, onOpen: () => setOpen(true) });

  const handleSelect = () => {
    setOpen(false);
    setQuery("");
  };

  return (
    <div className="w-[90%] md:w-full">
      <SearchButton onClick={() => setOpen(true)} />

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search products..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          <SearchResults
            query={query}
            results={results}
            loading={loading}
            onSelect={handleSelect}
          />
        </CommandList>
      </CommandDialog>
    </div>
  );
};