import { BudgetItemProps } from "~/types/types";

export const BudgetItem: React.FC<BudgetItemProps> = ({ budget }) => {
  const { category, budgeted, current, percentage } = budget;

  return (
    <div className="py-3 border-b border-gray-100 last:border-0">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-800">{category}</span>
        <div className="text-xs text-gray-500">
          <span className="font-medium text-gray-800">
            {new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(current)}
          </span>
          {` / ${new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(budgeted)}`}
        </div>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded overflow-hidden">
        <div
          className={`h-full ${percentage < 50 ? 'bg-green-500' :
            percentage < 80 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};