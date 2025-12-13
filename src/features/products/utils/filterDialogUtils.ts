import type { SetStateAction, Dispatch } from 'react';
import type { FilterState, FilterOptions } from '../types/filter.types';

export const updateTempFilter = <K extends keyof FilterState>(
  key: K,
  value: FilterState[K],
  setTempFilters: Dispatch<SetStateAction<FilterState>>
): void => {
  setTempFilters((prev) => ({
    ...prev,
    [key]: value
  }));
};

export const toggleTempArrayFilter = <K extends keyof FilterOptions>(
  key: K,
  value: string,
  setTempFilters: Dispatch<SetStateAction<FilterState>>
): void => {
  setTempFilters((prev) => ({
    ...prev,
    [key]: prev[key].includes(value)
      ? prev[key].filter((item: string) => item !== value)
      : [...prev[key], value]
  }));
};

export const applyFilters = (
  setFilters: Dispatch<SetStateAction<FilterState>>,
  tempFilters: FilterState,
  onFiltersChange?: (filters: FilterState) => void,
  setIsDialogOpen?: Dispatch<SetStateAction<boolean>>
): void => {
  setFilters(tempFilters);
  if (onFiltersChange) {
    onFiltersChange(tempFilters);
  }
  if (setIsDialogOpen) {
    setIsDialogOpen(false);
  }
};

export const clearFilters = (
  setFilters: Dispatch<SetStateAction<FilterState>>,
  setTempFilters: Dispatch<SetStateAction<FilterState>>,
  onFiltersChange?: (filters: FilterState) => void
): void => {
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

export const resetTempFilters = (
  setTempFilters: Dispatch<SetStateAction<FilterState>>,
  filters: FilterState
): void => {
  setTempFilters(filters);
};