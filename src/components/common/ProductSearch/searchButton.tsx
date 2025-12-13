import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SearchButtonProps {
  onClick: () => void;
}

export const SearchButton = ({ onClick }: SearchButtonProps) => {
  return (
    <Button
      variant="outline"
      className="flex rounded-full w-full md:w-[90%] items-center gap-2"
      onClick={onClick}
      aria-label="Open search"
    >
      <Search className="h-4 w-4" />
    </Button>
  );
};