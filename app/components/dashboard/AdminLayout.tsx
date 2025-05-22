import { useState } from 'react';
import { Link, useLocation } from '@remix-run/react';
import {
  Home,
  Wallet,
  BarChart3,
  LogOut,
  Menu,
  X,
  Bell,
  User,
  ChevronDown,
  DollarSign,
  ShieldAlert,
  Users as UsersIcon // Renomeado para evitar conflito com o componente Users
} from 'lucide-react';
import { DashboardLayoutProps, MenuItem } from '~/types/types';
import { SidebarLink } from './SidebarLink';

export function AdminLayout({ children }: DashboardLayoutProps) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [userMenuOpen, setUserMenuOpen] = useState<boolean>(false);
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});

  const toggleSubmenu = (key: string) => {
    setOpenSubmenus(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Simplified menu items based on MVP and PDF structure
  const menuItems: MenuItem[] = [
    {
      to: '/dashboard',
      icon: Home,
      label: 'Painel Principal'
    },
    {
      to: '#', // Parent link for financial management with submenus
      icon: Wallet,
      label: 'Gestão Financeira',
      submenuKey: 'finance',
      submenuItems: [
        { to: '/dashboard/transaction', label: 'Transações', isActive: location.pathname === '/dashboard/transaction' },
        { to: '/dashboard/receipt', label: 'Receitas', isActive: location.pathname === '/dashboard/receipt' },
        { to: '/dashboard/expense', label: 'Despesas', isActive: location.pathname === '/dashboard/expense' },
      ]
    },
    {
      to: '/dashboard/reports',
      icon: BarChart3,
      label: 'Relatórios e Análises'
    },
    {
      to: '/dashboard/security',
      icon: ShieldAlert,
      label: 'Painel de Segurança'
    },
    {
      to: '/dashboard/access-management', // Nova rota para Gerenciamento de Acesso
      icon: UsersIcon, // Ícone para Gerenciamento de Acesso
      label: 'Gerenciamento de Acesso'
    },
    // The 'Configurações' (Settings) menu item has been removed as requested.
  ];

  return (
    <div className="flex h-screen bg-light font-inter"> {/* Changed bg-gray-50 to bg-light */}
      {/* Sidebar overlay for mobile */}
      <div className={`
        fixed inset-0 z-40 md:hidden bg-dark bg-opacity-50 transition-opacity duration-300
        ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `}
        onClick={() => setSidebarOpen(false)}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setSidebarOpen(false);
          }
        }}
      ></div>

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-gray-200
        transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:z-auto
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="flex items-center justify-between px-6 h-16 border-b border-gray-200">
            <div className="flex items-center">
              <div className="rounded-lg bg-primary p-1"> {/* Using primary color */}
                <DollarSign size={24} className="text-white" />
              </div>
              <span className="ml-2 font-bold text-xl text-dark"> {/* Using dark color */}
                Admin<span className="text-accent">Panel</span> {/* Using accent color */}
              </span>
            </div>
            <button
              className="md:hidden text-gray-500 hover:text-gray-700"
              onClick={() => setSidebarOpen(false)}
            >
              <X size={24} />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {menuItems.map((item) => (
              <SidebarLink
                key={item.to + item.label}
                to={item.to}
                icon={item.icon}
                label={item.label}
                isActive={
                  item.submenuItems
                    ? item.submenuItems.some(subItem => location.pathname.startsWith(subItem.to))
                    : location.pathname === item.to || (item.to === '/dashboard' && location.pathname === '/') // Handle root dashboard route
                }
                isSubmenuOpen={item.submenuKey ? openSubmenus[item.submenuKey] : false}
                toggleSubmenu={() => item.submenuKey && toggleSubmenu(item.submenuKey)}
                submenuItems={item.submenuItems}
              />
            ))}
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-gray-200">
            <Link
              to="/logout"
              className="flex items-center px-4 py-3 text-red-600 rounded-lg hover:bg-red-50 transition-colors duration-200"
            >
              <LogOut size={20} />
              <span className="ml-3 font-medium text-base">Encerrar Sessão</span> {/* Adjusted font size */}
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Nav */}
        <header className="bg-white border-b border-gray-200 h-16">
          <div className="flex items-center justify-between px-4 md:px-6 h-full">
            <div className="flex items-center">
              <button
                className="text-gray-500 md:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu size={24} />
              </button>
              <h1 className="hidden md:block ml-4 text-xl font-semibold text-dark"> {/* Using dark color */}
                {/* Dynamic title based on current path */}
                {location.pathname === '/dashboard' && 'Painel Principal - Visão Geral'}
                {location.pathname.startsWith('/dashboard/transaction') && 'Gestão Financeira - Transações'}
                {location.pathname.startsWith('/dashboard/receipt') && 'Gestão Financeira - Receitas'}
                {location.pathname.startsWith('/dashboard/expense') && 'Gestão Financeira - Despesas'}
                {location.pathname === '/dashboard/reports' && 'Relatórios e Análises'}
                {location.pathname === '/dashboard/security' && 'Painel de Segurança'}
                {location.pathname === '/dashboard/access-management' && 'Gerenciamento de Acesso'} {/* Novo título */}
              </h1>
            </div>

            <div className="flex items-center space-x-3">
              {/* Notifications */}
              <div className="relative">
                <button className="p-2 text-gray-500 rounded-full hover:bg-gray-100">
                  <Bell size={20} />
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
              </div>

              {/* User menu */}
              <div className="relative">
                <button
                  className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                >
                  <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center"> {/* Using secondary color */}
                    <User size={16} className="text-white" />
                  </div>
                  <span className="hidden md:inline-block text-sm font-medium text-dark">Administrador</span> {/* Using dark color */}
                  <ChevronDown size={16} className={`hidden md:block transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown menu */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 py-2 bg-white rounded-md shadow-lg z-50 border border-gray-200">
                    <Link to="/admin/perfil" className="block px-4 py-2 text-sm text-dark hover:bg-gray-100"> {/* Using dark color */}
                      Meu Perfil
                    </Link>
                    {/* Removed link to /admin/configuracoes from user menu */}
                    <div className="border-t border-gray-200 my-1"></div>
                    <Link to="/logout" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                      Encerrar Sessão
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-4 md:p-6 bg-light"> {/* Changed bg-gray-50 to bg-light */}
          {children}
        </main>
      </div>
    </div>
  );
}
