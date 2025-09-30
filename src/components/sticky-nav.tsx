import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import { 
  User, 
  Heart,
} from 'lucide-react';
import { useAuth } from '@/context/authContext';
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import CartSheet from './cart/cart-list';
import SearchCommand from './search';





interface ModernNavProps {
  cartCount?: number;
  wishlistCount?: number;
}

const ModernNav: React.FC<ModernNavProps> = ({ 
  wishlistCount = 0 
}) => {
  
  const { user } = useAuth();

  return (
    <nav className="w-full bg-white border-b relative  z-50 border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
       
        <div className="flex items-center justify-between h-16">
         <div className='flex space-x-4 items-center'>

          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                theTOYshop
              </span>
            </Link>
          </div>

       
          <div className="hidden md:flex items-center space-x-8">
          
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
        
          <div className="flex items-center flex-1  mx-8">
            <SearchCommand/>
          </div>

         
          <div className="flex items-center">
           
            <Button variant="ghost" size="icon" className="relative">
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center text-xs"
                >
                  {wishlistCount}
                </Badge>
              )}
            </Button>

           
            <CartSheet/>

          
              <div className=''>
                {user ? (
                <Avatar>
                  <AvatarFallback>
                    {user.email?.slice(0, 2).toUpperCase() || "US"}
                  </AvatarFallback>
                </Avatar>
                  ) : (
                <Link to={`/signup`}>    
                  <Button variant="ghost" size="icon">
                    <User className="w-5 h-5" />
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