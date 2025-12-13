import { createContext, useState } from "react";
import type { ExpandedSections, FilterContextProps,  FilterState } from "../types/filter.types";
import { useContext } from "react";
import { categoryMap, EXPANDED_SECTIONS, FILTERS } from "../constants";
import { getNewArrivals, getUnique } from "../utils/filterUtils";
import type { Product } from "../types/product.types";

 const FilterContext = createContext<FilterContextProps | null>(null)

 export const FilterContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [filters, setFilters] = useState<FilterState>({ ...FILTERS });
  const [tempFilters, setTempFilters] = useState<FilterState>({ ...FILTERS });
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [expandedSections, setExpandedSections] = useState<ExpandedSections>({...EXPANDED_SECTIONS});


  const handleDialogOpen = (open: boolean): void => {
    if (open) setTempFilters(filters);
    setIsDialogOpen(open);
  };

  const apply = () => {
    setFilters(tempFilters);
    //callback(tempFilters);
    setIsDialogOpen(false);
  };


  const resetTemp = () => setTempFilters({...filters});

  const clearAll = () => {
    const cleared: FilterState = { ...FILTERS }
    setFilters(cleared);
    setTempFilters(cleared);
  };

  const updateTempFilter = <K extends keyof FilterState>(
    key: K, 
    value: FilterState[K],
  ): void => {
    setTempFilters((previousState: FilterState) => ({ 
      ...previousState, 
      [key]: value 
    }));
};

  const toggleTempArray = (key: keyof FilterState, item: string) => {
    setTempFilters((prev:FilterState) => {
      const arr = prev[key] as string[];
      return {
        ...prev,
        [key]: arr.includes(item)
          ? arr.filter(v => v !== item)
          : [...arr, item]
      };
    });
  };

   const toggleSection = (section: keyof ExpandedSections): void => {
    setExpandedSections((previousState: ExpandedSections) => ({
      ...previousState,
      [section]: !previousState[section]
    }));
  };

    


const filterOptions = (data:Product[]) => {
  if (!data?.length) {
    return { materials: [], sizes: [], categories: [], colors: [] };
  }

  return {
    materials: getUnique(data, "material"),
    sizes: getUnique(data, "size"),
    colors: getUnique(data, "color"),
    categories: [...new Set(
      data.map((p:any) => categoryMap[p.category_id] || 'Accessories')
    )],
  };
};


  const activeFiltersCount: number = [
    filters.search,
    ...filters.materials,
    ...filters.sizes,
    ...filters.categories,
    ...filters.colors,
    filters.inStock,
    filters.featured,
    filters.priceRange[0] > 0
  ].filter(Boolean).length;

  const filterProducts = (data:Product[],filterType:string) => {
  if (!data?.length) return [];

  let result = filterType === 'newArrivals' ? getNewArrivals(data) : data;

  return result.filter((product: Product) => {
    const price = parseFloat(product.price);
    const searchTerm = filters.search?.toLowerCase();
    
    const categoryMap: Record<number, string> = {
      1: 'Accessories',
      2: 'Clothing',
      3: 'Footwear'
    };
    const productCategory = product.category_id ? (categoryMap[product.category_id] || 'Accessories') : 'Accessories';

    return (
      (!searchTerm || product.name.toLowerCase().includes(searchTerm) || product.base_name.toLowerCase().includes(searchTerm)) &&
      (filters.priceRange[0] === 0 || price <= filters.priceRange[0]) &&
      (!filters.materials.length || filters.materials.includes(product.material)) &&
      (!filters.sizes.length || filters.sizes.includes(product.size)) &&
      (!filters.categories.length || filters.categories.includes(productCategory)) &&
      (!filters.colors.length || (product.color && filters.colors.includes(product.color))) &&
      (!filters.inStock || product.stock_quantity > 0) &&
      (!filters.featured || product.featured)
    );
  });
}

  return (
    <FilterContext.Provider value={{ 
    filters,
    setFilters,
    tempFilters,
    expandedSections,
    setExpandedSections,
    isDialogOpen,
    handleDialogOpen,
    apply,
    resetTemp,
    clearAll,
    updateTempFilter,
    setTempFilters,
    toggleTempArray,
    activeFiltersCount,
    toggleSection,
    filterOptions,
    filterProducts
    }}>
      {children}
    </FilterContext.Provider>
  )
 }

 export function useProductFilterDialog() {
   const context = useContext(FilterContext)
    if (!context) {
      throw new Error("useProductFilterDialog must be used inside FilterContextProvider");
    }
  return context
}
