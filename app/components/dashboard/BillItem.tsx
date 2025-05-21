import { Calendar } from 'lucide-react';
import { BillItemProps } from '~/types/types';

export const BillItem: React.FC<BillItemProps> = ({ bill }) => {
  const { description, amount, dueDate, isRecurring } = bill;

  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0 transition-all duration-200 hover:bg-gray-50">
      <div className="flex items-center">
        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
          <Calendar size={16} className="text-orange-600" />
        </div>
        <div className="ml-4">
          <p className="font-medium text-sm text-gray-800">{description}</p>
          <p className="text-xs text-gray-500">
            Vencimento: {dueDate}
            {isRecurring && <span className="ml-2 bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded">Recorrente</span>}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-medium text-red-600">
          {new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(amount)}
        </p>
        <button className="text-xs px-3 py-1 mt-1 bg-secondary/10 text-secondary rounded hover:bg-secondary/20 transition-colors">
          Registrar Pagamento
        </button>
      </div>
    </div>
  );
};