import { CommandItem } from "@/components/ui/command";
import { useNavigate } from "react-router-dom";
import type { Product } from "@/features/products/types/product.types";
import { formatPrice , formatProductName } from "./utils";

interface SearchResultItemProps {
  product: Product;
  onSelect: () => void;
}

export const SearchResultItem = ({ product, onSelect }: SearchResultItemProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    onSelect();
    navigate(`/product/${product.id}`);
  };


  const displayName = formatProductName(product);

   const keywords = [product.name, product.base_name, product.color, product.description , product.short_description]
    .filter((keyword): keyword is string => Boolean(keyword));

  return (
    <CommandItem
      value={`${product.id}`}
      keywords={keywords}
      onSelect={handleClick}
      className="cursor-pointer"
    >
      <div className="flex items-center gap-3 w-full">
        <img
          src={product.images?.primary}
          alt={product.base_name || product.name}
          className="w-10 h-10 object-cover rounded"
        />
        <div className="flex flex-col flex-1">
          <span className="font-medium text-sm">{displayName}</span>
          <span className="text-xs text-muted-foreground">
            {formatPrice(product.price)}
          </span>
        </div>
      </div>
    </CommandItem>
  );
};