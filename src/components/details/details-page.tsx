import { useState } from 'react';
import { Share2, ShoppingCart, Star, Truck, Shield, RotateCcw, Ruler, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link, useParams } from 'react-router-dom';
import { useProducts } from '@/hooks/useProducts';
import { ClipLoader } from 'react-spinners';
import BreadcrumbNav from '../crumb';
import NewsLetter from '../newsletter/newsletter';
import Footer from '@/footer';
import type { Product } from './types';
import TopSlide from '../top-slide';
import ModernNav from '../sticky-nav';
import ScrollToTop from '@/scroll-to-top';
import { useCart } from '@/hooks/useCart';
import ReviewSection from '../review';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/axios-config';
import { AddToWatchlistButtonDesk } from '../watchlist/desktopBtn';
import { AddToWatchlistButton } from '../watchlist/watchlist-btn';

export default function ProductDetailsPage() {
  const [quantity, setQuantity] = useState<number>(1);
  const { data: products, isLoading, error: prodErr } = useProducts();
  const { id } = useParams();
  const { addItem, addingId } = useCart();

  const productId = id ? parseInt(id) : null;

  if (!productId || isNaN(productId)) {
    return (
      <div className="h-[80vh] grid place-items-center">
        <div className="text-center">
          <p className="text-xl font-semibold text-destructive">Invalid product ID</p>
          <Link to="/shop">
            <Button className="mt-4">Back to Shop</Button>
          </Link>
        </div>
      </div>
    );
  }

  const { data: reviewData } = useQuery({
    queryKey: ["reviews", productId],
    queryFn: async () => {
      const res = await api.get(`/api/reviews/product/${productId}`);
      return res.data;
    },
    enabled: !!productId,
  });

  const reviewStats = reviewData?.stats;

  if (isLoading) {
    return (
      <div className="h-[80vh] grid place-items-center">
        <ClipLoader size={40} />
      </div>
    );
  }

  if (prodErr) {
    return (
      <div className="h-[80vh] grid place-items-center">
        <p className="text-destructive">Failed to load products</p>
      </div>
    );
  }

  const product: Product = products.find((p: any) => p.id == productId);

  if (!product) {
    return (
      <div className="h-[80vh] grid place-items-center">
        <div className="text-center">
          <p className="text-xl font-semibold">Product not found</p>
          <Link to="/shop">
            <Button className="mt-4">Back to Shop</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleQuantityChange = (change: number): void => {
    setQuantity(Math.max(1, Math.min(product.stock_quantity, quantity + change)));
  };

  const getPrimaryImage = (): string => {
    return product.primary_image || product.images?.primary || '/placeholder.png';
  };



  const currentPrice = Number(product.price);
  const compareAtPrice = product.compare_at_price ? Number(product.compare_at_price) : null;
  const hasDiscount = compareAtPrice !== null && compareAtPrice > currentPrice;
  const discountPercentage = hasDiscount && compareAtPrice
    ? Math.round(((compareAtPrice - currentPrice) / compareAtPrice) * 100)
    : 0;

  
  return (
    <div className="min-h-screen font-family-sans bg-gradient-to-br from-slate-50 to-white">
      <ScrollToTop />
      <TopSlide />
      <ModernNav />
      
      <div className="w-[95%] mx-auto px-4 space-y-8 py-8">
        <BreadcrumbNav productName={product.base_name} />

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-2xl overflow-hidden shadow-lg">
              <img 
                src={getPrimaryImage()} 
                alt={product.name}
                className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="grid grid-cols-4 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div 
                  key={i} 
                  className="aspect-square rounded-lg overflow-hidden bg-slate-100 cursor-pointer border-2 border-transparent hover:border-primary transition-colors"
                >
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
              <h1 className="text-4xl font-bold text-foreground mb-2">
                {product.base_name}
              </h1>
              <p className="text-lg text-muted-foreground">
                {product.short_description}
              </p>
            </div>

          
            <div className="flex items-center gap-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-5 h-5 ${
                      i < Math.floor(reviewStats?.avg_rating || 0) 
                        ? 'fill-yellow-400 text-yellow-400' 
                        : 'text-slate-300'
                    }`}
                  />
                ))}
              </div>
              <span className="font-semibold">
                {reviewStats?.avg_rating 
                  ? Number(reviewStats.avg_rating).toFixed(1) 
                  : 'No ratings yet'}
              </span>
              <span className="text-muted-foreground">
                ({reviewStats?.review_count || 0} {reviewStats?.review_count === 1 ? 'review' : 'reviews'})
              </span>
            </div>

          
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <div className="text-3xl font-bold text-foreground">
                  {Number(product.price).toLocaleString("en-NG", {
                    style: "currency",
                    currency: "NGN",
                  })}
                </div>
                
                {hasDiscount && (
                  <div className='flex flex-col'>
                    <div className="text-xl text-muted-foreground line-through">
                      {Number(product.compare_at_price).toLocaleString("en-NG", {
                        style: "currency",
                        currency: "NGN",
                      })}
                    </div>
                    <Badge className="bg-red-500 text-white hover:bg-red-600">
                      Save {discountPercentage}%
                    </Badge>
                  </div>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                Free shipping on orders over ₦100,000
              </p>
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
                <Button 
                  onClick={() => addItem({
                    productId: product.id,
                    quantity: quantity,
                    base_name: product.base_name,
                    price: product.price,
                    images: product.images
                  })} 
                  size="lg" 
                  className={`${
                    product.id == addingId ? "bg-black/80" : "bg-black"
                  } flex-1 h-14 text-lg font-semibold`}
                  disabled={product.id == addingId}
                >
                  {product.id == addingId ? (
                    <ClipLoader size={20} color="white" />
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      <span>Add to Cart</span>
                    </>
                  )}
                </Button>
                <Button variant="outline" size="lg" className="h-14 w-14 md:grid hidden p-0 rounded-xl">
                  <AddToWatchlistButtonDesk productId={product.id} variant="outline"/>
                 
                </Button>
                 <AddToWatchlistButton productId={product.id}  width='h-14 w-14 py-5'/>
                <Button variant="outline" size="lg" className="h-14 w-14 p-0 rounded-xl">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>

              <Link to="/checkout">
                <Button className="w-full bg-black text-white py-5 h-14" size="lg">
                  <Package className="w-10 h-10 mr-2" />
                  Proceed to Checkout
                </Button>
              </Link>
            </div>

          
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <Truck className="w-8 h-8 mx-auto mb-2 text-green-600" />
                  <p className="font-semibold">Free Shipping</p>
                  <p className="text-sm text-muted-foreground">On orders over ₦100,000</p>
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
            <TabsTrigger value="reviews">
              Reviews ({reviewStats?.review_count || 0})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="mt-6">
            <Card>
              <CardContent className="p-8">
                <div className="prose max-w-none">
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    {product.description}
                  </p>
                  
                  <Separator className="my-6" />
                  
                  {/* Dynamic Features and Perfect For */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Key Features */}
                    {product.features && product.features.length > 0 && (
                      <div>
                        <h3 className="text-xl font-semibold mb-3">Key Features</h3>
                        <ul className="space-y-2 text-muted-foreground">
                          {product.features.map((feature, index) => (
                            <li key={index}>• {feature}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {/* Perfect For */}
                    {product.perfect_for && product.perfect_for.length > 0 && (
                      <div>
                        <h3 className="text-xl font-semibold mb-3">Perfect For</h3>
                        <ul className="space-y-2 text-muted-foreground">
                          {product.perfect_for.map((use, index) => (
                            <li key={index}>• {use}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="specifications" className="mt-6">
            <Card>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Product Details - Dynamic */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Product Details</h3>
                    {product.product_details && product.product_details.length > 0 ? (
                      <ul className="space-y-3 text-muted-foreground">
                        {product.product_details.map((detail, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-foreground">•</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
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
                          <span className="font-medium">SKU:</span>
                          <span>{product.sku}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Care Instructions */}
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
            <ReviewSection productId={productId} />
          </TabsContent>
        </Tabs>
      </div>

      <NewsLetter />
      <Footer />
    </div>
  );
}