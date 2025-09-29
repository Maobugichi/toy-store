// components/BreadcrumbNav.jsx
import { Link, useLocation, useParams } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from './ui/breadcrumb'; // Adjust path based on your Shadcn setup

// Define the props interface
interface BreadcrumbNavProps {
  productName: string;
}

function BreadcrumbNav({ productName }: BreadcrumbNavProps) {
  const location = useLocation();
  const { productId } = useParams();

  
  const pathnames = location.pathname.split('/').filter((x) => x);

  
  const breadcrumbNames: { [key: string]: string } = {
    clothing: 'Clothing',
    hoodies: 'Hoodies',
  };

  return (
    <div className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Breadcrumb>
          <BreadcrumbList className="text-sm text-gray-500">
            {/* Home link */}
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/" className="hover:text-gray-900">
                  Home
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            {/* Dynamic path segments */}
            {pathnames.map((value, index) => {
              const isLast = index === pathnames.length - 1;
              const to = `/${pathnames.slice(0, index + 1).join('/')}`;
              const name = breadcrumbNames[value] || value;

              return (
                <div key={to} className="flex items-center">
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    {isLast ? (
                      <span className="text-gray-900 font-medium">
                        {productId && productName ? productName : name}
                      </span>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link to={to} className="hover:text-gray-900">
                          {name}
                        </Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </div>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
}

export default BreadcrumbNav;