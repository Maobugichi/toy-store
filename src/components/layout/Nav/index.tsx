import { Logo } from './logo';
import { Navigation } from './navigation';
import { NavActions } from './navActions';

const ModernNav = () => {
  return (
    <nav className="w-full bg-white border-b relative z-50 border-gray-200 pb-3 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex space-x-4 items-center">
            <Logo />
            <Navigation />
          </div>

          <NavActions />
        </div>
      </div>
    </nav>
  );
};

export default ModernNav;