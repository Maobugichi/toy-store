import { Link } from 'react-router-dom';
import { User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/authContext';
import CartSheet from '@/features/cart/cart-list';
import { SearchCommand } from '@/components/common/ProductSearch';
import { UserMenu } from './userMenu';
import { WishlistDrawer } from '@/features/wishlist/components/wishlistDrawer';

export const NavActions = () => {
  const { user } = useAuth();

  return (
    <div className="flex items-center mt-3 space-x-2 shrink-0">
      <div className="flex items-center md:flex-1 mx-3">
        <SearchCommand />
      </div>
      
      <WishlistDrawer />
      <CartSheet />

      {user ? (
          <UserMenu />
      ) : (
        <Link to="/signup">    
          <Button variant="ghost" size="icon" className="w-10 border rounded-full h-10">
            <User className="w-7 h-7" />
          </Button>
        </Link> 
      )}
    </div>
  );
};