import { Badge } from '@/components/ui/badge';

interface ProductHeaderProps {
  baseName: string;
  shortDescription?: string;
  stockQuantity: number;
}

export const ProductHeader = ({ baseName, shortDescription, stockQuantity }: ProductHeaderProps) => {
  return (
    <div>
      <div className="flex items-center gap-3 mb-2">
        <Badge variant="secondary" className="text-xs font-medium">
          Vintage Collection
        </Badge>
        <Badge variant="outline" className="text-xs">
          {stockQuantity} in stock
        </Badge>
      </div>
      <h1 className="text-4xl font-bold text-foreground mb-2">
        {baseName}
      </h1>
      {shortDescription && (
        <p className="text-lg text-muted-foreground">
          {shortDescription}
        </p>
      )}
    </div>
  );
};