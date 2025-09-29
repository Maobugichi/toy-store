import type { SetStateAction } from "react";
import type { FilterOptions, FilterState } from "./types";
import type React from "react";

const updateTempFilter = <K extends keyof FilterState>(
    key: K, 
    value: FilterState[K],
    setTempFilters:React.Dispatch<SetStateAction<FilterState>>
  ): void => {
    setTempFilters((previousState: FilterState) => ({ 
      ...previousState, 
      [key]: value 
    }));
  };

   const toggleTempArrayFilter = <K extends keyof FilterOptions> (
    key: K, 
    value: string, setTempFilters:React.Dispatch<SetStateAction<FilterState>>
  ): void => {
    setTempFilters((previousState: FilterState) => ({
      ...previousState,
      [key]: previousState[key].includes(value) 
        ? previousState[key].filter((item: string) => item !== value)
        : [...previousState[key], value]
    }));
  };

  const applyFilters = (setFilters:React.Dispatch<SetStateAction<FilterState>>,tempFilters:FilterState,onFiltersChange:any,setIsDialogOpen:React.Dispatch<SetStateAction<boolean>>): void => {
    console.log('Applying filters:', tempFilters);
    setFilters(tempFilters);
    if (onFiltersChange) {
      onFiltersChange(tempFilters);
    }
    setIsDialogOpen(false);
  };

  const clearFilters = (setFilters:React.Dispatch<SetStateAction<FilterState>>,setTempFilters:React.Dispatch<SetStateAction<FilterState>>,onFiltersChange:any): void => {
    const clearedFilters: FilterState = {
      search: '',
      priceRange: [0],
      materials: [],
      sizes: [],
      categories: [],
      colors: [],
      inStock: false,
      featured: false
    };
    setFilters(clearedFilters);
    setTempFilters(clearedFilters);
    if (onFiltersChange) {
      onFiltersChange(clearedFilters);
    }
  };

  const resetTempFilters = (setTempFilters:React.Dispatch<SetStateAction<FilterState>>,filters:FilterState): void => {
    setTempFilters(filters);
  };


  export { updateTempFilter , toggleTempArrayFilter , applyFilters , clearFilters , resetTempFilters }