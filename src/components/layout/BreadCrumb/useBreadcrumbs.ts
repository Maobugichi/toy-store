import { useLocation } from 'react-router-dom';
import { BREADCRUMB_NAMES } from './constants.ts';

interface UseBreadcrumbsProps {
  productName?: string;
  customCrumbs?: Array<{ label: string; path?: string }>;
}

interface BreadcrumbItem {
  label: string;
  path?: string;
  isLast: boolean;
}

export const useBreadcrumbs = ({ 
  productName, 
  customCrumbs 
}: UseBreadcrumbsProps = {}): BreadcrumbItem[] => {
  const location = useLocation();

 
  if (customCrumbs) {
    return customCrumbs.map((crumb, index) => ({
      ...crumb,
      isLast: index === customCrumbs.length - 1,
    }));
  }

 
  const pathnames = location.pathname.split('/').filter((x) => x);

  return pathnames.map((value, index) => {
    const isLast = index === pathnames.length - 1;
    const path = `/${pathnames.slice(0, index + 1).join('/')}`;
    
    // Use product name for last crumb if provided
    const label = isLast && productName 
      ? productName 
      : getBreadcrumbLabel(value);

    return {
      label,
      path: isLast ? undefined : path,
      isLast,
    };
  });
};

const getBreadcrumbLabel = (value: string): string => {
 
  if (BREADCRUMB_NAMES[value]) {
    return BREADCRUMB_NAMES[value];
  }

  
  return value
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};