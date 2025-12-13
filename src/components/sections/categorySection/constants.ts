import hood from "@/assets/hood-tee.jpg";
import testsrc from "@/assets/toy-hero2.jpg";
import place from "@/assets/banner.jpg";
import type { CategoryItem } from '@/features/products/types/category.types';

export const CATEGORY_ITEMS: CategoryItem[] = [
  {
    displayName: "Hats",
    searchTerm: "hat",
    src: testsrc,
  },
  {
    displayName: "Tees",
    searchTerm: "tee",
    src: hood,
  },
  {
    displayName: "Hoodies",
    searchTerm: "hoodie",
    src: place,
  },
];

export const AUTO_PLAY_INTERVAL = 6000;
export const DRAG_THRESHOLD = 100;