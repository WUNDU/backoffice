import { useState } from 'react';
import { Link, useLocation } from '@remix-run/react';
import {
  Home,
  Wallet,
  BarChart3,
  PieChart,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  User,
  ChevronDown,
  DollarSign
} from 'lucide-react';
import { SidebarLink } from './SidebarLink';
import { DashboardLayoutProps, MenuItem } from '~/types/types';

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

  const menuItems: MenuItem[] = [
    {
      to: '/admin',
      icon: Home,
      label: 'Painel Principal'
    },
    {
      to: '#',
      icon: Wallet,
      label: 'Gestão Financeira',
      submenuKey: 'finance',
      submenuItems: [
        { to: '/admin/financas/receitas', label: 'Receitas', isActive: location.pathname === '/admin/financas/receitas' },
        { to: '/admin/financas/despesas', label: 'Despesas', isActive: location.pathname === '/admin/financas/despesas' },
        { to: '/admin/financas/transferencias', label: 'Transferências', isActive: location.pathname === '/admin/financas/transferencias' }
      ]
    },
    {
      to: '/admin/relatorios',
      icon: BarChart3,
      label: 'Relatórios'
    },
    {
      to: '/admin/orcamentos',
      icon: PieChart,
      label: 'Orçamentos'
    },
    {
      to: '/admin/configuracoes',
      icon: Settings,
      label: 'Configurações'
    }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar overlay for mobile */}
      <div className={`
        fixed inset-0 z-40 md:hidden bg-black bg-opacity-50 transition-opacity duration-300
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
              <div className="rounded-lg bg-primary p-1">
                <DollarSign size={24} className="text-white" />
              </div>
              <span className="ml-2 font-bold font-poppins text-xl">
                Admin<span className="text-accent">Panel</span>
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
                    ? item.submenuItems.some(subItem => subItem.isActive)
                    : location.pathname === item.to
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
              <span className="ml-3 font-medium">Encerrar Sessão</span>
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
              <h1 className="hidden md:block ml-4 text-xl font-semibold text-gray-800">
                {location.pathname === '/admin' && 'Visão Geral'}
                {location.pathname === '/admin/relatorios' && 'Relatórios'}
                {location.pathname.includes('/admin/financas') && 'Gestão Financeira'}
                {location.pathname === '/admin/orcamentos' && 'Orçamentos'}
                {location.pathname === '/admin/configuracoes' && 'Configurações'}
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
                  <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                    <User size={16} className="text-white" />
                  </div>
                  <span className="hidden md:inline-block text-sm font-medium text-gray-700">Administrador</span>
                  <ChevronDown size={16} className={`hidden md:block transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown menu */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 py-2 bg-white rounded-md shadow-lg z-50 border border-gray-200">
                    <Link to="/admin/perfil" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Meu Perfil
                    </Link>
                    <Link to="/admin/configuracoes" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Configurações
                    </Link>
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
        <main className="flex-1 overflow-auto p-4 md:p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}