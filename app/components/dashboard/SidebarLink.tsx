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
            className={`
              flex items-center w-full px-4 py-3 rounded-lg
              transition-all duration-200 ease-in-out
              ${isActive ? 'bg-secondary/10 text-secondary shadow-sm' : 'text-gray-600 hover:bg-gray-100 hover:translate-x-1'}
              focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-opacity-50
            `}
          >
            <Icon size={20} className={`${isActive ? 'text-secondary' : 'text-gray-500'}`} />
            <span className="ml-3 font-medium">{label}</span>
            <ChevronDown size={16} className={`ml-auto transition-transform duration-200 ${isSubmenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Submenu with smooth transition */}
          <div
            className={`
              ml-8 mt-1 space-y-1 overflow-hidden
              transition-all duration-300 ease-in-out
              ${isSubmenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}
            `}
          >
            {submenuItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`
                  block px-4 py-2 rounded-lg
                  transition-all duration-200 ease-in-out
                  ${item.isActive ? 'bg-secondary/5 text-secondary shadow-sm' : 'text-gray-600 hover:bg-gray-100 hover:translate-x-1'}
                  focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-opacity-50
                `}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <Link
          to={to}
          className={`
            flex items-center px-4 py-3 rounded-lg
            transition-all duration-200 ease-in-out
            ${isActive ? 'bg-secondary/10 text-secondary shadow-sm' : 'text-gray-600 hover:bg-gray-100 hover:translate-x-1'}
            focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-opacity-50
          `}
        >
          <Icon size={20} className={`${isActive ? 'text-secondary' : 'text-gray-500'}`} />
          <span className="ml-3 font-medium">{label}</span>
        </Link>
      )}
    </div>
  );
};