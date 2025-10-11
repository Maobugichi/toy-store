import React, {  useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Trash2, Plus, Minus, ShoppingBag, ShoppingCart, Heart, Loader2, Package } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { ClipLoader } from 'react-spinners';
import { ScrollArea } from '../ui/scroll-area';
import { Link } from 'react-router-dom';

interface ProductImage {
  gallery: Array<{
    public_id: string;
  }>;
  primary: string;
}

interface CartItem {
  id: number;
  cart_id: number;
  product_id: number;
  quantity: number;
  created_at: string;
  base_name: string;
  price: string;
  stock_quantity?: number | undefined;
  variant?: string;
  images: ProductImage;
}

interface LoadingState {
  [key: number]: boolean;
}

interface StockStatus {
  text: string;
  color: string;
}

const CartSheet: React.FC = () => {
  const { items, updatingId,  updateItem, removeItem , totalQuantity} = useCart()
   
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const [savedForLater, setSavedForLater] = useState<CartItem[]>([]);
  const [loadingItems, setLoadingItems] = useState<LoadingState>({});
  const [itemToRemove, setItemToRemove] = useState<number | null>(null);
  
  


  const saveForLater = async (id: number): Promise<void> => {
    const item = cartItems.find(i => i.id === id);
    if (!item) return;
    
    setLoadingItems(prev => ({ ...prev, [id]: true }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    
    setCartItems(items => items.filter(i => i.id !== id));
    setSavedForLater(prev => [...prev, item]);
    setLoadingItems(prev => ({ ...prev, [id]: false }));
  };

  const moveToCart = async (id: number): Promise<void> => {
    const item = savedForLater.find(i => i.id === id);
    if (!item) return;
    
    setLoadingItems(prev => ({ ...prev, [id]: true }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    
    setSavedForLater(items => items.filter(i => i.id !== id));
    setCartItems(prev => [...prev, item]);
    setLoadingItems(prev => ({ ...prev, [id]: false }));
  };

  const formatPrice = (price: string): string => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(parseFloat(price));
  };

  const calculateSubtotal = (price: string, quantity: number): number => {
    return parseFloat(price) * quantity;
  };

  const calculateTotal = (): number => {
    return items.reduce((sum, item) => sum + calculateSubtotal(item.price, item.quantity), 0);
  };

 

  const getStockStatus = (quantity: number, stock: number): StockStatus => {
    if (quantity >= stock) return { text: 'Last items', color: 'bg-red-500' };
    if (stock - quantity <= 3) return { text: 'Low stock', color: 'bg-orange-500' };
    return { text: 'In stock', color: 'bg-green-500' };
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="w-5 h-5" />
                {totalQuantity > 0 && (
                <Badge 
                    variant="destructive" 
                    className="absolute rounded-full top-1 right-1 w-3 h-3 p-1 flex items-center justify-center text-[8px]"
                >
                    {totalQuantity}
                </Badge>
                )}
          </Button>
         
        </SheetTrigger>
        <ScrollArea>
            <SheetContent className="w-full sm:max-w-lg flex flex-col p-0">
            <SheetHeader className="px-6 py-8 border-b">
                <SheetTitle className="  flex items-center justify-between">
                <span>Shopping Cart</span>
                {items.length > 0 && (
                    <Badge  variant="secondary">{totalQuantity} {totalQuantity === 1 ? 'item' : 'items'}</Badge>
                )}
                </SheetTitle>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto px-6 py-4">
                {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12">
                    <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Your cart is empty</h3>
                    <p className="text-sm text-gray-500 mb-6 text-center">Add items to get started</p>
                    <Button onClick={() => setIsOpen(false)}>Continue Shopping</Button>
                </div>
                ) : (
                <div className="space-y-4">
                    {items.map((item) => {
                    const stockStatus = getStockStatus(item.quantity, item.stock_quantity ?? 0);
                    const isLoading = loadingItems[item.id];
                    
                    return (
                        <Card key={item.id} className="p-4 relative">
                        {isLoading && (
                            <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-10 rounded-lg">
                            <Loader2 className="w-6 h-6 animate-spin text-gray-600" />
                            </div>
                        )}
                        
                        <div className="flex gap-3">
                           
                            <div className="flex-shrink-0 relative">
                            <img
                                src={item.images?.primary}
                                alt={item.base_name}
                                className="w-32 h-32 object-fit rounded-md bg-gray-100"
                            />
                            <Badge className={`absolute -top-1 -right-1 h-4 px-1 text-[10px] ${stockStatus.color}`}>
                                {stockStatus.text}
                            </Badge>
                            </div>

                        
                            <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start mb-1">
                                <div className="flex-1 min-w-0 pr-2">
                                <h3 className="text-sm font-semibold text-gray-900 truncate">
                                    {item.base_name}
                                </h3>
                                {item.variant && (
                                    <p className="text-xs text-gray-500 mt-0.5">{item.variant}</p>
                                )}
                                </div>
                                <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setItemToRemove(item.id)}
                                className="text-gray-400 hover:text-red-500 h-8 w-8 flex-shrink-0"
                                disabled={isLoading}
                                >
                                <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>

                            <p className="text-sm font-medium text-gray-900 mb-2">
                                {formatPrice(item.price)}
                            </p>

                            <div className="flex items-center justify-between space-x-3">
                              
                                <div className="flex items-center gap-1">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => updateItem(item.id, Math.max(item.quantity - 1, 1))}
                                    disabled={item.quantity <= 1 || isLoading}
                                    className="h-7 w-7"
                                >
                                    <Minus className="w-3 h-3" />
                                </Button>
                                <span className="w-8 text-center text-sm font-medium">
                                     {updatingId === item.id ? <ClipLoader size={10}/> : item.quantity}
                                </span>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() =>  updateItem(item.id, item.quantity + 1)}
                                    disabled={item.quantity >= (item.stock_quantity ?? 0)  || isLoading}
                                    className="h-7 w-7"
                                >
                                    <Plus className="w-3 h-3" />
                                </Button>
                                </div>

                                
                                <p className="text-sm font-bold text-gray-900">
                                {formatPrice(calculateSubtotal(item.price, item.quantity).toString())}
                                </p>
                            </div>

                            
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => saveForLater(item.id)}
                                disabled={isLoading}
                                className="mt-2 h-7 text-xs px-2 text-gray-600"
                            >
                                <Heart className="w-3 h-3 mr-1" />
                                Save for later
                            </Button>
                            </div>
                        </div>
                        </Card>
                    );
                    })}

                  
                    {savedForLater.length > 0 && (
                    <div className="mt-8 pt-6 border-t">
                        <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center">
                        <Heart className="w-4 h-4 mr-2" />
                        Saved for Later ({savedForLater.length})
                        </h3>
                        <div className="space-y-3">
                        {savedForLater.map((item) => {
                            const isLoading = loadingItems[item.id];
                            
                            return (
                            <Card key={item.id} className="p-3 relative">
                                {isLoading && (
                                <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-10 rounded-lg">
                                    <Loader2 className="w-5 h-5 animate-spin text-gray-600" />
                                </div>
                                )}
                                
                                <div className="flex gap-3 items-center">
                                <img
                                    src={item.images.primary}
                                    alt={item.base_name}
                                    className="w-16 h-16 object-cover rounded-md bg-gray-100"
                                />
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-medium text-gray-900 truncate">
                                    {item.base_name}
                                    </h4>
                                    <p className="text-sm text-gray-600 mt-0.5">
                                    {formatPrice(item.price)}
                                    </p>
                                </div>
                                <Button
                                    size="sm"
                                    onClick={() => moveToCart(item.id)}
                                    disabled={isLoading}
                                    className="h-8 text-xs"
                                >
                                    Move to cart
                                </Button>
                                </div>
                            </Card>
                            );
                        })}
                        </div>
                    </div>
                    )}
                </div>
                )}
            </div>

        
            {items.length > 0 && (
                <div className="border-t px-6 py-4 space-y-4 bg-gray-50">
                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">{formatPrice(calculateTotal().toString())}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-sm text-gray-500">Calculated at checkout</span>
                    </div>
                    <div className="border-t pt-2">
                    <div className="flex justify-between text-base font-bold">
                        <span>Total</span>
                        <span>{formatPrice(calculateTotal().toString())}</span>
                    </div>
                    </div>
                </div>

                <div className="grid space-y-2">
                  <Link to={'/checkout'}>
                   <Button className="w-full" size="lg">
                    <Package className="w-4 h-4 mr-2" />
                    Proceed to Checkout
                    </Button>
                  </Link>
                    
                    <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => setIsOpen(false)}
                    >
                    Continue Shopping
                    </Button>
                </div>
                </div>
            )}
            </SheetContent>
          </ScrollArea>
      </Sheet>

     
      <AlertDialog open={!!itemToRemove} onOpenChange={() => setItemToRemove(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove item from cart?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove this item from your shopping cart? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => {
              itemToRemove && removeItem(itemToRemove)
              setItemToRemove(null) 
            }
            }>
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default CartSheet;