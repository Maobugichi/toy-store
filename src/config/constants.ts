export const PRODUCT_CATEGORIES = [
  { name: 'Accessories', id: 1 },
  { name: 'Clothing', id: 2 },
  { name: 'Footwear', id: 3 },
] as const;

export const CLOUDINARY_BASE_URL = 'https://res.cloudinary.com/dao2a3ib4';

export const APP_CONFIG = {
  siteName: 'ToyShop',
  logoUrl: `${CLOUDINARY_BASE_URL}/image/upload/v1759248907/toy-logoo_qt8unk.png`,
} as const;