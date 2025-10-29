import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import { 
  ChevronDown,
  User, 
} from 'lucide-react';
import { useAuth } from '@/context/authContext';

import CartSheet from './cart/cart-list';
import SearchCommand from './search';
import { UserMenu } from './avatar-drop';
import { WatchlistDrawer } from './watchlist/drawer';





interface ModernNavProps {
  cartCount?: number;
  wishlistCount?: number;
}

const ModernNav: React.FC<ModernNavProps> = ({ 
 
}) => {
  
  const { user } = useAuth();
  const navigate = useNavigate();
 
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);

 

  const categories = [
    { name: 'Accessories', id: 1 },
    { name: 'Clothing', id: 2 },
    { name: 'Footwear', id: 3 }
  ];

  const handleCategoryClick = (category: { name: string; id: number }) => {
    navigate('/filter', { 
      state: { categoryId: category.id, categoryName: category.name } 
    });
   
    setShopDropdownOpen(false);
  };

  const handleNewArrivals = () => {
    navigate('/filter', { state: { filterType: 'newArrivals' } });
  
  };

  return (
    <nav className="w-full bg-white border-b relative  z-50 border-gray-200 pb-3 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
       
        <div className="flex items-center justify-between h-16">
         <div className='flex space-x-4 items-center'>

          <div className="flex md:w-auto w-32 items-center">
            <Link to="/" className="flex items-center w-20 space-x-2">
              <img src='https://res.cloudinary.com/dao2a3ib4/image/upload/v1759248907/toy-logoo_qt8unk.png' alt='toyshop logo' className='object-cover w-full'/>
            </Link>
          </div>

       
          <div className="hidden mt-3 lg:flex items-center space-x-1">
                <Link to="/filter">
                  <Button variant="ghost" className="font-medium">
                    Shop All
                  </Button>
                </Link>

              
                <div 
                  className="relative"
                  onMouseEnter={() => setShopDropdownOpen(true)}
                  onMouseLeave={() => setShopDropdownOpen(false)}
                >
                  <Button 
                    variant="ghost" 
                    className="font-medium"
                  >
                    Categories
                    <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${shopDropdownOpen ? 'rotate-180' : ''}`} />
                  </Button>

                  {shopDropdownOpen && (
                    <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                      {categories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => handleCategoryClick(category)}
                          className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors"
                        >
                          {category.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <button onClick={handleNewArrivals}>
                  <Button variant="ghost" className="relative font-medium">
                    New Arrivals
                    <Badge 
                      variant="secondary" 
                      className="ml-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-xs"
                    >
                      New
                    </Badge>
                  </Button>
                </button>
            </div>
          </div>
        
         
         
          <div className="flex items-center mt-3 space-x-2  shrink-0">
            <div className="flex items-center md:flex-1  mx-3">
              <SearchCommand/>
            </div>
            <WatchlistDrawer/>
            <CartSheet />

            <div>
              {user ? (
                <UserMenu />
              ) : (
                <Link to={`/signup`}>    
                 <Button variant="ghost" size="icon" className="w-10 border rounded-full h-10">
                  <User className="w-7 h-7" />
                </Button>
                </Link> 
              )}
            </div>
          </div>

        </div>
      </div>

    </nav>
  );
};

export default ModernNav;