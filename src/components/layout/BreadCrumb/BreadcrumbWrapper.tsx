import BreadcrumbNav from './index';

interface BreadcrumbWrapperProps {
  productName?: string;
  className?: string;
}

export const BreadcrumbWrapper = ({ 
  productName, 
  className 
}: BreadcrumbWrapperProps) => {
  return (
    <div className={className}>
      <BreadcrumbNav productName={productName} />
    </div>
  );
};