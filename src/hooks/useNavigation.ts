import { useNavigate } from 'react-router-dom';

interface Category {
  name: string;
  id: number;
}

export const useNavigation = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category: Category) => {
    navigate('/filter', { 
      state: { 
        categoryId: category.id, 
        categoryName: category.name 
      } 
    });
  };

  const handleNewArrivals = () => {
    navigate('/filter', { 
      state: { filterType: 'newArrivals' } 
    });
  };

  const navigateToProduct = (productId: string) => {
    navigate(`/products/${productId}`);
  };

  const navigateToCart = () => {
    navigate('/cart');
  };

  const navigateToCheckout = () => {
    navigate('/checkout');
  };

   const navigateToFilter = () => {
    navigate('/filter');
  };


  return {
    handleCategoryClick,
    handleNewArrivals,
    navigateToProduct,
    navigateToCart,
    navigateToCheckout,
    navigateToFilter
  };
};