import  { useState } from 'react';
import { Heart, Share2, ShoppingCart, Star, Truck, Shield, RotateCcw, Ruler } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useParams } from 'react-router-dom';
import { useProducts } from '@/hooks/useProducts';
import { ClipLoader } from 'react-spinners';
import BreadcrumbNav from '../crumb';
import NewsLetter from '../newsletter';
import Footer from '@/footer';
import type { Product , UIData } from './types';
import { useAuth } from '@/context/authContext';
import { addToCart } from '../cart/cart';
import TopSlide from '../top-slide';
import ModernNav from '../sticky-nav';
import ScrollToTop from '@/scroll-to-top';


export default function ProductDetailsPage() {
  const [quantity, setQuantity] = useState<number>(1);
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);
  const [ loading , setLoading ] = useState<boolean>(false)
  const { data: products, isLoading, error } = useProducts();

  if (isLoading) return <div className="h-[80vh] grid place-items-center"><ClipLoader color="#3b82f6" size={40} /></div>;
  if (error) return <p>Failed to load products</p>;
  const { id } = useParams();
  const { cartId } = useAuth();
  const product: Product = products.find((p:any) => p.id == id)
 

  const handleAddToCart = async () => {

    if (!cartId) {
      alert('You need to log in first')
      return
    }
    setLoading(true)
    await addToCart(cartId, product.id, quantity);
    setLoading(false)
    alert("Added to cart!");
  }

  const uiData: UIData = {
    rating: 4.8,
    reviewCount: 127
  };

  const handleQuantityChange = (change: number): void => {
    setQuantity(Math.max(1, Math.min(product.stock_quantity, quantity + change)));
  };

  const formatPrice = (price: string): string => {
    const numPrice = parseFloat(price) / 100; // Convert cents to dollars
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(numPrice);
  };

 
  const getPrimaryImage = (): string => {
    return product.primary_image || product.images.primary;
  };

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <ScrollToTop/>
      <TopSlide/>
      <ModernNav/>
      <div className="w-[95%] mx-auto px-4 space-y-8 py-8">
      
       <BreadcrumbNav productName={product.base_name}/>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
        
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 shadow-lg">
              <img 
                src={getPrimaryImage()} 
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="grid grid-cols-4 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square rounded-lg overflow-hidden bg-slate-100 cursor-pointer border-2 border-transparent hover:border-primary transition-colors">
                  <img 
                    src={getPrimaryImage()} 
                    alt={`${product.name} view ${i}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Badge variant="secondary" className="text-xs font-medium">
                  Vintage Collection
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {product.stock_quantity} in stock
                </Badge>
              </div>
              <h1 className="text-4xl font-bold text-foreground mb-2">{product.base_name}</h1>
              <p className="text-lg text-muted-foreground">{product.short_description}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-5 h-5 ${i < Math.floor(uiData.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'}`}
                  />
                ))}
              </div>
              <span className="font-semibold">{uiData.rating}</span>
              <span className="text-muted-foreground">({uiData.reviewCount} reviews)</span>
            </div>

           
            <div className="space-y-1">
              <div className="text-3xl font-bold text-foreground">
                {formatPrice(product.price)}
              </div>
              <p className="text-sm text-muted-foreground">Free shipping on orders over $100</p>
            </div>

           
            <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-lg">
              <div>
                <span className="text-sm font-medium text-muted-foreground">Size</span>
                <p className="font-semibold">{product.size}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground">Material</span>
                <p className="font-semibold">{product.material}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground">SKU</span>
                <p className="font-semibold">{product.sku}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground">Fit</span>
                <p className="font-semibold">Adjustable Snapback</p>
              </div>
            </div>

            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center border rounded-lg">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="h-10 w-10 p-0"
                  >
                    -
                  </Button>
                  <span className="w-16 text-center font-semibold">{quantity}</span>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.stock_quantity}
                    className="h-10 w-10 p-0"
                  >
                    +
                  </Button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button onClick={handleAddToCart} size="lg" className={`${loading ? "bg-black/80" : "bg-black"} flex-1 h-14 text-lg font-semibold`}>
                 {loading ? <ClipLoader size={20} color="white"/> :<><ShoppingCart className="w-5 h-5 mr-2" /> <span>Add to Cart</span></> 
                   }
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="h-14 w-14 p-0"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                </Button>
                <Button variant="outline" size="lg" className="h-14 w-14 p-0">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>

           
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <Truck className="w-8 h-8 mx-auto mb-2 text-green-600" />
                  <p className="font-semibold">Free Shipping</p>
                  <p className="text-sm text-muted-foreground">On orders over $100</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Shield className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <p className="font-semibold">2 Year Warranty</p>
                  <p className="text-sm text-muted-foreground">Quality guaranteed</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({uiData.reviewCount})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="mt-6">
            <Card>
              <CardContent className="p-8">
                <div className="prose max-w-none">
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    {product.description}
                  </p>
                  <Separator className="my-6" />
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Key Features</h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• Structured front panel for shape retention</li>
                        <li>• Breathable mesh backing for comfort</li>
                        <li>• Curved brim for sun protection</li>
                        <li>• Adjustable snapback closure</li>
                        <li>• Vintage 1930s-inspired design</li>
                        <li>• Durable construction for everyday wear</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Perfect For</h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• Road trips and travel</li>
                        <li>• Outdoor activities</li>
                        <li>• Casual everyday wear</li>
                        <li>• Festival and events</li>
                        <li>• Adding retro style to outfits</li>
                        <li>• Gift for vintage enthusiasts</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="specifications" className="mt-6">
            <Card>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Product Details</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="font-medium">Material:</span>
                        <span>{product.material}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Size:</span>
                        <span>{product.size}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Closure:</span>
                        <span>Adjustable Snapback</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Style:</span>
                        <span>Trucker Hat</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Era:</span>
                        <span>1930s Inspired</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Care Instructions</h3>
                    <div className="space-y-3 text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <RotateCcw className="w-4 h-4" />
                        <span>Hand wash in cold water</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Ruler className="w-4 h-4" />
                        <span>Air dry only</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        <span>Do not bleach</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <RotateCcw className="w-4 h-4" />
                        <span>Reshape while damp</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-6">
            <Card>
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">Customer Reviews</h3>
                    <Button variant="outline">Write a Review</Button>
                  </div>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold">{uiData.rating}</div>
                      <div className="flex justify-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <div className="text-muted-foreground">{uiData.reviewCount} reviews</div>
                    </div>
                    <div className="col-span-2 space-y-4">
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          <span className="font-semibold">Sarah M.</span>
                        </div>
                        <p className="text-muted-foreground">
                          "Love this hat! Perfect fit and the vintage style is exactly what I was looking for. Great quality too."
                        </p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex">
                            {[...Array(4)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                            <Star className="w-4 h-4 text-slate-300" />
                          </div>
                          <span className="font-semibold">Mike R.</span>
                        </div>
                        <p className="text-muted-foreground">
                          "Good hat, comfortable to wear. The mesh back keeps it cool in summer. Would recommend!"
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <NewsLetter/>
      <Footer/>
    </div>
  );
}