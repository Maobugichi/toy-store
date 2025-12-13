import { Link } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useBreadcrumbs } from './useBreadcrumbs';

interface BreadcrumbNavProps {
  productName?: string;
  customCrumbs?: Array<{ label: string; path?: string }>;
}

const BreadcrumbNav = ({ productName, customCrumbs }: BreadcrumbNavProps) => {
  const breadcrumbs = useBreadcrumbs({ productName, customCrumbs });

  return (
    <div className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Breadcrumb>
          <BreadcrumbList className="text-sm text-gray-500">
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/" className="hover:text-gray-900">
                  Home
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            {breadcrumbs.map((crumb, index) => (
              <div key={crumb.path || index} className="flex items-center">
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {crumb.isLast ? (
                    <span className="text-gray-900 font-medium">
                      {crumb.label}
                    </span>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link to={crumb.path!} className="hover:text-gray-900">
                        {crumb.label}
                      </Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </div>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
};

export default BreadcrumbNav;