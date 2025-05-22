import React from 'react';
import { TrendingDown, CreditCard, Banknote, Clock } from 'lucide-react';
import { TransactionItemProps } from '~/types/types';

/**
 * ExpenseItem Component
 * Displays a single detailed expense item in a list.
 *
 * @param {TransactionItemProps} props - The props for the component.
 * @param {Transaction} props.transaction - The expense object to display.
 */
export const ExpenseItem: React.FC<TransactionItemProps> = ({ transaction }) => {
  const { description, category, amount, date, source, paymentMethod, status } = transaction;

  // Determine icon based on payment method or a general expense icon
  const getPaymentMethodIcon = (method?: string) => {
    switch (method) {
      case 'Transferência Bancária':
        return <Banknote size={16} className="text-red-600" />;
      case 'Cartão de Débito':
      case 'Cartão de Crédito':
        return <CreditCard size={16} className="text-red-600" />;
      case 'Dinheiro':
        return <Banknote size={16} className="text-red-600" />;
      case 'Débito Direto':
        return <Clock size={16} className="text-red-600" />;
      default:
        return <TrendingDown size={16} className="text-red-600" />;
    }
  };

  // Determine status styling
  const getStatusClasses = (currentStatus?: string) => {
    switch (currentStatus) {
      case 'Concluído':
        return 'bg-red-100 text-red-700'; // Red for expenses
      case 'Pendente':
        return 'bg-yellow-100 text-yellow-700';
      case 'Cancelado':
        return 'bg-gray-100 text-gray-700'; // Gray for cancelled expenses
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="flex items-center py-4 border-b border-gray-100 last:border-0 transition-all duration-200 hover:bg-red-50/20 rounded-md px-2 -mx-2">
      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-red-100`}>
        {getPaymentMethodIcon(paymentMethod)}
      </div>

      <div className="ml-4 flex-1 grid grid-cols-1 md:grid-cols-2 gap-1">
        <div>
          <p className="font-medium text-sm text-gray-800">{description}</p>
          <p className="text-xs text-gray-500">
            {category} {source && ` • ${source}`}
          </p>
        </div>
        <div className="md:text-right">
          <p className="font-semibold text-red-600 text-base">
            {new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(Math.abs(amount))} {/* Display absolute amount */}
          </p>
          <p className="text-xs text-gray-500">
            {date} {paymentMethod && ` • ${paymentMethod}`}
          </p>
        </div>
      </div>

      <div className="ml-4 flex-shrink-0">
        {status && (
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusClasses(status)}`}>
            {status}
          </span>
        )}
      </div>
    </div>
  );
};
