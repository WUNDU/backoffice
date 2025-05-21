import { TrendingUp, TrendingDown, CreditCard } from 'lucide-react';
import { TransactionItemProps } from '~/types/types';

export const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
  const { description, category, amount, date, type } = transaction;

  return (
    <div className="flex items-center py-3 border-b border-gray-100 last:border-0 transition-all duration-200 hover:bg-gray-50">
      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${type === 'income' ? 'bg-green-100' :
        type === 'expense' ? 'bg-red-100' : 'bg-blue-100'
        }`}>
        {type === 'income' ? (
          <TrendingUp size={16} className="text-green-600" />
        ) : type === 'expense' ? (
          <TrendingDown size={16} className="text-red-600" />
        ) : (
          <CreditCard size={16} className="text-blue-600" />
        )}
      </div>

      <div className="ml-4 flex-1">
        <p className="font-medium text-sm text-gray-800">{description}</p>
        <p className="text-xs text-gray-500">{category} • {date}</p>
      </div>

      <div className={`text-right ${amount > 0 ? 'text-green-600' : 'text-red-600'
        }`}>
        <p className="font-medium">
          {new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(amount)}
        </p>
      </div>
    </div>
  );
};