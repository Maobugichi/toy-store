import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const SearchSection = ({ value, onChange }:any) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="search">Search Products</Label>
      <div className="relative">
        <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
        <Input
          id="search"
          placeholder="Search products..."
          value={value}
          onChange={event => onChange(event.target.value)}
          className="pl-10"
        />
      </div>
    </div>
  );
};
