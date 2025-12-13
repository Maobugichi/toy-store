import type { ExpandedSections, FilterState } from "./types/filter.types"

export const FILTERS:Readonly<FilterState> = {
  search: '',
  priceRange: [0],
  materials: [],
  sizes: [],
  categories: [],
  colors: [],
  inStock: false,
  featured: false
}

export const EXPANDED_SECTIONS:Readonly<ExpandedSections> = {
  price: true,
  material: true,
  size: true,
  category: true,
  color: true,
  availability: true
}

 export const categoryMap: Record<number, string> = {
  1: 'Accessories',
  2: 'Clothing',
  3: 'Footwear'
};