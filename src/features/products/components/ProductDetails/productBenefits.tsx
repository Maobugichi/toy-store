import { Truck, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export const ProductBenefits = () => {
  return (
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
  );
};