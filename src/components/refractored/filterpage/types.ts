interface FilterState {
  search: string;
  priceRange: number[];
  materials: string[];
  sizes: string[];
  categories: string[];
  colors: string[];
  inStock: boolean;
  featured: boolean;
}

interface FilterOptions {
  materials: string[];
  sizes: string[];
  categories: string[];
  colors: string[];
}

interface ExpandedSections {
  price: boolean;
  material: boolean;
  size: boolean;
  category: boolean;
  color: boolean;
  availability: boolean;
}



interface ProductFilterDialogProps {
  maxPrice?: number;
  filterOptions:FilterOptions;
}

export type { FilterState ,FilterOptions , ExpandedSections , ProductFilterDialogProps}