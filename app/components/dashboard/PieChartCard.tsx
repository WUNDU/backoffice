import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { PieChartCardProps, TransactionCategoryData } from '~/types/types';

// Define a type for the custom tooltip props
interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    payload: TransactionCategoryData; // Recharts puts the original data in payload.payload
  }>;
  label?: string;
}

/**
 * PieChartCard Component
 * Displays a pie chart for transaction category distribution.
 *
 * @param {PieChartCardProps} props - The props for the component.
 * @param {string} props.title - The title of the chart card.
 * @param {TransactionCategoryData[]} props.chartData - The data for the pie chart, including name, value, and color.
 */
export const PieChartCard: React.FC<PieChartCardProps> = ({ title, chartData }) => {
  // Custom tooltip formatter for currency display
  const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
    if (active && payload && payload.length) {
      // Access the original data from payload[0].payload
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 rounded-lg shadow-md border border-gray-200 text-sm">
          <p className="font-semibold text-gray-800">{data.name}</p>
          <p className="text-gray-600">
            Valor: {new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(data.value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md animate-fadeInUp">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-medium text-gray-800">{title}</h3>
      </div>
      <div className="h-64 flex items-center justify-center">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                layout="vertical"
                align="right"
                verticalAlign="middle"
                iconType="circle"
                wrapperStyle={{ fontSize: '12px', lineHeight: '18px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-500 text-center">Nenhum dado de categoria disponível.</p>
        )}
      </div>
    </div>
  );
};
