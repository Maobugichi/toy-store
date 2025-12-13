import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { RotateCcw, Ruler, Shield } from 'lucide-react';
import { ReviewSection } from '@/pages/reviews/components';
import type { Product } from '../../types/product.types';

interface ProductTabsProps {
  product: Product;
  productId: number;
  reviewCount: number;
}

export const ProductTabs = ({ product, productId, reviewCount }: ProductTabsProps) => {
  return (
    <Tabs defaultValue="description" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="description">Description</TabsTrigger>
        <TabsTrigger value="specifications">Specifications</TabsTrigger>
        <TabsTrigger value="reviews">
          Reviews ({reviewCount})
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
              
              <div className="grid md:grid-cols-2 gap-6">
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
  );
};