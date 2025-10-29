import { useState, useEffect } from "react";
import { CommandDialog, CommandInput, CommandList, CommandItem, CommandEmpty, CommandGroup } from "@/components/ui/command";
import { useProductSearch } from "@/hooks/useProductSearch";
import { Loader2, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const SearchCommand = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { results, loading } = useProductSearch(query);
  const navigate = useNavigate();

  console.log("Search results:", results);
  
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "/" && !open) {
        e.preventDefault();
        setOpen(true);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open]);

  const handleSelect = (productId: number) => {
    setOpen(false);
    setQuery("");
    navigate(`/product/${productId}`);
  };

  return (
    <div className="w-[90%] md:w-full">
      <Button
        variant="outline"
        className="flex rounded-full w-full md:w-[90%] items-center gap-2"
        onClick={() => setOpen(true)}
      >
        <Search className="h-4 w-4" />
        
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
            placeholder="Search products..."
            value={query}
            onValueChange={setQuery}
        />
        <CommandList>
            {loading ? (
            <div className="flex items-center justify-center p-6 text-gray-500">
                <Loader2 className="animate-spin w-4 h-4 mr-2" />
                Searching...
            </div>
            ) : (
            <>
                {query && results.length === 0 ? (
                <CommandEmpty>No products found.</CommandEmpty>
                ) : results.length > 0 ? (
                <CommandGroup heading="Products">
                    {results.map((item) => (
                    <CommandItem
                        key={item.id}
                        value={`${item.id}`}  
                        keywords={[item.name, item.base_name, item.color].filter(Boolean)}
                        onSelect={() => handleSelect(item.id)}
                        className="cursor-pointer"
                    >
                        <div className="flex items-center gap-3 w-full">
                        <img
                            src={item.images?.primary}
                            alt={item.base_name || item.name}
                            className="w-10 h-10 object-cover rounded"
                        />
                        <div className="flex flex-col flex-1">
                            <span className="font-medium text-sm">
                            {item.base_name || item.name}
                            {item.color && ` - ${item.color.charAt(0).toUpperCase() + item.color.slice(1)}`}
                            </span>
                            <span className="text-xs text-muted-foreground">
                            ₦{parseFloat(item.price).toLocaleString('en-NG')}
                            </span>
                        </div>
                        </div>
                    </CommandItem>
                    ))}
                </CommandGroup>
                ) : null}
            </>
            )}
        </CommandList>
      </CommandDialog>
    </div>
  );
};

export default SearchCommand;