import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import { 
  User, 
  Heart,
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
  wishlistCount = 0 
}) => {
  
  const { user } = useAuth();

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

       
          <div className="hidden mt-3 md:flex items-center space-x-8">
          
            <Link to="/new-arrivals">
              <Button variant="ghost" className="relative">
                New Arrivals
                <Badge 
                  variant="secondary" 
                  className="ml-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700"
                >
                  Hot
                </Badge>
              </Button>
            </Link>

         
          
          </div>
          </div>
        
          <div className="md:flex mt-3 hidden items-center md:flex-1  mx-3">
            <SearchCommand/>
          </div>
         
          <div className="flex items-center mt-3 space-x-2  shrink-0">
            <div className="flex md:hidden items-center md:flex-1  mx-3">
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