
import { Link } from '@remix-run/react';
import { ChevronDown } from 'lucide-react';
import { SidebarLinkProps } from '~/types/types';

export const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon, label, isActive, isSubmenuOpen, toggleSubmenu, submenuItems }) => {
  const Icon = icon;

  return (
    <div className="relative">
      {submenuItems ? (
        <div className="w-full">
          <button
            onClick={toggleSubmenu}
            className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors duration-200 ${isActive ? 'bg-secondary/20 text-secondary' : 'text-gray-600 hover:bg-gray-100'
              }`}
          >
            <Icon size={20} className={`${isActive ? 'text-secondary' : 'text-gray-500'}`} />
            <span className="ml-3 font-medium">{label}</span>
            <ChevronDown size={16} className={`ml-auto transition-transform duration-200 ${isSubmenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {isSubmenuOpen && (
            <div className="ml-8 mt-1 space-y-1">
              {submenuItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`block px-4 py-2 rounded-lg transition-colors duration-200 ${item.isActive ? 'bg-secondary/10 text-secondary' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      ) : (
        <Link
          to={to}
          className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${isActive ? 'bg-secondary/20 text-secondary' : 'text-gray-600 hover:bg-gray-100'
            }`}
        >
          <Icon size={20} className={`${isActive ? 'text-secondary' : 'text-gray-500'}`} />
          <span className="ml-3 font-medium">{label}</span>
        </Link>
      )}
    </div>
  );
};