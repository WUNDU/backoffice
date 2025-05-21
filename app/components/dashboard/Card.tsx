import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { CardProps } from '~/types/types';

export const Card: React.FC<CardProps> = ({
  title,
  value,
  icon,
  trend,
  percentage,
  color,
  isCurrency = true
}) => {
  const Icon = icon;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2 rounded-lg ${color === 'primary' ? 'bg-primary/10 text-primary' :
          color === 'secondary' ? 'bg-secondary/10 text-secondary' :
            color === 'success' ? 'bg-green-100 text-green-600' :
              'bg-red-100 text-red-600'
          }`}>
          <Icon size={20} />
        </div>
        {trend && percentage !== undefined && (
          <div className={`flex items-center text-xs font-medium ${percentage > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {percentage > 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
            <span>{Math.abs(percentage)}%</span>
          </div>
        )}
      </div>
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <p className="text-2xl font-bold mt-1 text-gray-800">
        {isCurrency
          ? new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(value)
          : value.toLocaleString()}
      </p>
    </div>
  );
};