import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger, 
  SheetHeader, 
  SheetTitle 
} from '@/components/ui/sheet';
import { 
  Search, 

  User, 
  Menu, 
  Heart,
  Sparkles
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/authContext';
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import CartSheet from './cart/cart-list';

interface NavItem {
  label: string;
  href: string;
}

interface NavDropdownItem {
  label: string;
  items: NavItem[];
}

interface ModernNavProps {
  cartCount?: number;
  wishlistCount?: number;
}

const ModernNav: React.FC<ModernNavProps> = ({ 
  wishlistCount = 0 
}) => {
  const navItems: NavDropdownItem[] = [
    {
      label: 'Men',
      items: [
        { label: "Shirts", href: "/men/shirts" },
        { label: "Shoes", href: "/men/shoes" },
        { label: "Accessories", href: "/men/accessories" },
        { label: "Jackets", href: "/men/jackets" },
        { label: "Pants", href: "/men/pants" },
      ]
    },
    {
      label: 'Women',
      items: [
        { label: "Dresses", href: "/women/dresses" },
        { label: "Heels", href: "/women/heels" },
        { label: "Bags", href: "/women/bags" },
        { label: "Jewelry", href: "/women/jewelry" },
        { label: "Tops", href: "/women/tops" },
      ]
    },
    {
      label: 'Kids',
      items: [
        { label: "Boys", href: "/kids/boys" },
        { label: "Girls", href: "/kids/girls" },
        { label: "Toys", href: "/kids/toys" },
        { label: "School", href: "/kids/school" },
      ]
    }
  ];
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
        
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-10 pr-4 w-full bg-gray-50 border-0 focus:bg-white focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

         
          <div className="flex items-center ">
           
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
            
            <div className="block md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80">
                  <SheetHeader>
                    <SheetTitle className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                      <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        theTOYshop
                      </span>
                    </SheetTitle>
                  </SheetHeader>
                  
                  <div className="mt-8 space-y-6">
                    {/* Mobile Search */}
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        type="search"
                        placeholder="Search products..."
                        className="pl-10"
                      />
                    </div>

                    {/* New Arrivals */}
                    <Link to="/new-arrivals">
                      <Button variant="ghost" className="w-full justify-start text-left">
                        New Arrivals
                        <Badge variant="secondary" className="ml-auto">Hot</Badge>
                      </Button>
                    </Link>

                   
                    {navItems.map((navItem: NavDropdownItem) => (
                      <div key={navItem.label} className="space-y-2">
                        <h3 className="font-semibold text-gray-900 px-3 py-2 border-b">
                          {navItem.label}
                        </h3>
                        <div className="space-y-1 pl-4">
                          {navItem.items.map((item: NavItem) => (
                            <Link key={item.label} to={item.href}>
                              <Button 
                                variant="ghost" 
                                className="w-full justify-start text-sm text-gray-600"
                              >
                                {item.label}
                              </Button>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>

    
      
    </nav>
  );
};

export default ModernNav;