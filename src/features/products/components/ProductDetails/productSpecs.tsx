interface ProductSpecsProps {
  size: string;
  material: string;
  sku: string;
}

export const ProductSpecs = ({ size, material, sku }: ProductSpecsProps) => {
  return (
    <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-lg">
      <div>
        <span className="text-sm font-medium text-muted-foreground">Size</span>
        <p className="font-semibold">{size}</p>
      </div>
      <div>
        <span className="text-sm font-medium text-muted-foreground">Material</span>
        <p className="font-semibold">{material}</p>
      </div>
      <div>
        <span className="text-sm font-medium text-muted-foreground">SKU</span>
        <p className="font-semibold">{sku}</p>
      </div>
      <div>
        <span className="text-sm font-medium text-muted-foreground">Fit</span>
        <p className="font-semibold">Adjustable Snapback</p>
      </div>
    </div>
  );
};