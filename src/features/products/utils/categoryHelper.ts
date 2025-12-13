import type { Product } from '../types/category.types';

export const filterProductsByCategory = (
  products: Product[],
  searchTerm: string
): Product[] => {
 
  const normalizedTerm = searchTerm.toLowerCase().replace(/s$/, '');
   
  const product = products.filter((item) => {
    const name = item.name?.toLowerCase() || '';
    const baseName = item.base_name?.toLowerCase() || '';
    const description = item.description?.toLowerCase() || '';
    
    return (
      name.includes(normalizedTerm) ||
      name.includes(searchTerm.toLowerCase()) ||
      baseName.includes(normalizedTerm) ||
      baseName.includes(searchTerm.toLowerCase()) ||
      description.includes(normalizedTerm) ||
      description.includes(searchTerm.toLowerCase())
    );
  });

  console.log(product);
  return product
};