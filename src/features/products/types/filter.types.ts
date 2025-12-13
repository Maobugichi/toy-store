export interface FilterState {
  search: string;
  priceRange: number[];
  materials: string[];
  sizes: string[];
  categories: string[];
  colors: string[];
  inStock: boolean;
  featured: boolean;
}

export interface FilterOptions {
  materials: string[];
  sizes: string[];
  categories: string[];
  colors: string[];
}

export interface ExpandedSections {
  price: boolean;
  material: boolean;
  size: boolean;
  category: boolean;
  color: boolean;
  availability: boolean;
}

export interface ProductFilterDialogProps {
  onFiltersChange?: (filters: FilterState) => void;
  maxPrice?: number;
  filterOptions: FilterOptions;
}


export interface FilterContextProps {
    filters:FilterState;
    tempFilters:FilterState;
    setFilters:React.Dispatch<React.SetStateAction<FilterState>>;
    setTempFilters:React.Dispatch<React.SetStateAction<FilterState>>;
    isDialogOpen:boolean;
    expandedSections:ExpandedSections;
    setExpandedSections:React.Dispatch<React.SetStateAction<ExpandedSections>>;
    handleDialogOpen:(open:boolean) => void;
    apply:() => void;
    resetTemp:() => void;
    clearAll:() => void;
    updateTempFilter:<K extends keyof FilterState>( key: K, 
    value: FilterState[K]) => void; 
    toggleTempArray:(key: keyof FilterState, item: string) => void;
    activeFiltersCount:number;
    toggleSection:(section: keyof ExpandedSections) => void
    filterOptions:any
    filterProducts:any
}

export type FilterType = 'all' | 'newArrivals' | 'category';