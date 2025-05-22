import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

// Layout Types
export interface DashboardLayoutProps {
  children: ReactNode;
}

export interface MenuItem {
  to: string;
  icon: LucideIcon;
  label: string;
  submenuKey?: string;
  submenuItems?: {
    to: string;
    label: string;
    isActive: boolean;
  }[];
}

export interface SidebarLinkProps {
  to: string;
  icon: LucideIcon;
  label: string;
  isActive: boolean;
  isSubmenuOpen?: boolean;
  toggleSubmenu?: () => void;
  submenuItems?: {
    to: string;
    label: string;
    isActive: boolean;
  }[];
}

// Component Props Types
export interface CardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  trend?: boolean;
  percentage?: number;
  color: 'primary' | 'secondary' | 'success' | 'danger';
  isCurrency?: boolean;
}

export interface ChartCardProps {
  title: string;
  chartData: unknown[];
  dataKey: string | string[];
  color: string;
}

export interface ChartData {
  month: string;
  saldo?: number;
  receita?: number;
  despesa?: number;
  users?: number;
  net?: number; // Added for net balance in reports
}

// New type for Pie Chart data
export interface PieChartCardProps {
  title: string;
  chartData: TransactionCategoryData[];
}

export interface TransactionCategoryData {
  name: string;
  value: number;
  color: string; // Color for the segment in the pie chart
}

// New type for Bar Chart data
export interface BarChartCardProps {
  title: string;
  chartData: { name: string; value: number; color?: string }[];
  dataKey: string;
  barColor: string;
}

export interface BillItemProps {
  bill: Bill;
}

export interface Bill {
  id: number;
  description: string;
  amount: number;
  dueDate: string;
  isPaid: boolean;
  isRecurring: boolean;
}

export interface BudgetItemProps {
  budget: Budget;
}

export interface Budget {
  id: number;
  category: string;
  budgeted: number;
  current: number;
  percentage: number;
}

export interface TransactionItemProps {
  transaction: Transaction;
}

export interface Transaction {
  id: number;
  description: string;
  category: string;
  amount: number;
  date: string;
  type: 'income' | 'expense' | 'transfer';
  // Added optional fields for more detailed receipts
  source?: string; // e.g., "Salário", "Freelance", "Investimento"
  paymentMethod?: string; // e.g., "Transferência Bancária", "Dinheiro", "Cartão"
  status?: 'Pendente' | 'Concluído' | 'Cancelado';
}

// New interface for ReceiptItemProps
export interface ReceiptItemProps {
  receipt: Transaction; // Reusing Transaction type for receipts, but focusing on income
}