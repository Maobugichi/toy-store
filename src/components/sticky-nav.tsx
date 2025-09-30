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
       
        <div className="flex items-center md:justify-between h-16">
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
        
          <div className="flex mt-3 items-center md:flex-1  mx-3">
            <SearchCommand/>
          </div>

         
          <div className="flex items-center mt-3 space-x-2 pr-3 shrink-0">
           <Button variant="ghost" className=" relative p-0  w-10 h-10">
            <Heart  className="w-7 h-7" />
            {wishlistCount > 0 && (
              <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center text-xs">
                {wishlistCount}
              </Badge>
            )}
          </Button>


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