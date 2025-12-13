import { Link, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ClipLoader } from 'react-spinners';
import { useProducts } from '@/hooks/useProducts';
import { useProductQuantity } from '@/features/products/hooks/useProductQuantity';
import { useProductReviews } from '@/features/products/hooks/useProductReviews';
import { useCart } from '@/hooks/useCart';
import { getPrimaryImage } from '@/features/products/utils/productHelper';
import { ProductImages } from '@/features/products/components/ProductDetails/productImages';
import { ProductHeader } from '@/features/products/components/ProductDetails/productHeader';
import { ProductRating } from '@/features/products/components/ProductDetails/productRating';
import { ProductPricing } from '@/features/products/components/ProductDetails/productPricing';
import { ProductSpecs } from '@/features/products/components/ProductDetails/productSpecs';
import { QuantitySelector } from '@/features/products/components/ProductDetails/quantitySelector';
import { ProductActions } from '@/features/products/components/ProductDetails/productActions';
import { ProductBenefits } from '@/features/products/components/ProductDetails/productBenefits';
import { ProductTabs } from '@/features/products/components/ProductDetails/productTabs';
import { BreadcrumbWrapper } from '@/components/layout/BreadCrumb/BreadcrumbWrapper';
import Header from '@/components/layout/header';
import Newsletter from '@/features/newsletter/components/newsletter';
import Footer from '@/components/layout/footer';
import ScrollToTop from '@/hooks/useScrollToTop';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const productId = id ? parseInt(id) : null;
  
  const { data: products, isLoading, error: prodErr } = useProducts();
  const { data: reviewData } = useProductReviews(productId);
  const { addItem, addingId } = useCart();

  const product = products?.find((p: any) => p.id === productId);
  
  const {
    quantity,
    incrementQuantity,
    decrementQuantity,
    canIncrement,
    canDecrement,
  } = useProductQuantity(product?.stock_quantity || 1);

  
  if (isLoading) {
    return (
      <div className="h-[80vh] grid place-items-center">
        <ClipLoader size={40} />
      </div>
    );
  }


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

  if (prodErr) {
    return (
      <div className="h-[80vh] grid place-items-center">
        <p className="text-destructive">Failed to load products</p>
      </div>
    );
  }

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

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      quantity,
      base_name: product.base_name,
      price: product.price,
      images: product.images,
    });
  };

  const reviewStats = reviewData?.stats;
  const primaryImage = getPrimaryImage(product);
  
  console.log(product.images)


  return (
    <div className="min-h-screen font-family-sans bg-gradient-to-br from-slate-50 to-white">
      <ScrollToTop />
      <Header />
      
      <div className="w-[95%] mx-auto px-4 space-y-8 py-8">
        <BreadcrumbWrapper productName={product.base_name} />

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <ProductImages 
            primaryImage={primaryImage}
            productName={product.name}
            gallery={product.images?.gallery?.images}
          />

          <div className="space-y-6">
            <ProductHeader 
              baseName={product.base_name}
              shortDescription={product.short_description}
              stockQuantity={product.stock_quantity}
            />

            <ProductRating 
              avgRating={reviewStats?.avg_rating}
              reviewCount={reviewStats?.review_count}
            />

            <ProductPricing 
              price={product.price}
              compareAtPrice={product.compare_at_price}
            />

            <ProductSpecs 
              size={product.size}
              material={product.material}
              sku={product.sku}
            />

            <div className="space-y-4">
              <QuantitySelector 
                quantity={quantity}
                onIncrement={incrementQuantity}
                onDecrement={decrementQuantity}
                canIncrement={canIncrement}
                canDecrement={canDecrement}
              />

              <ProductActions 
                productId={product.id}
                quantity={quantity}
                baseName={product.base_name}
                price={product.price}
                images={product.images}
                onAddToCart={handleAddToCart}
                isAddingToCart={product.id === addingId}
              />
            </div>

            <ProductBenefits />
          </div>
        </div>

        <ProductTabs 
          product={product}
          productId={productId}
          reviewCount={reviewStats?.review_count || 0}
        />
      </div>

      <Newsletter />
      <Footer />
    </div>
  );
}
