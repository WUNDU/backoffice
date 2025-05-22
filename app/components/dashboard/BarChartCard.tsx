import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BarChartCardProps } from '~/types/types';

// Define a type for the custom tooltip props
interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    name: string;
    payload: { name: string; value: number; color?: string }; // The original data object for the hovered bar
  }>;
  label?: string; // The label for the tooltip (e.g., category name)
}

/**
 * BarChartCard Component
 * Displays a bar chart for data distribution.
 *
 * @param {BarChartCardProps} props - The props for the component.
 * @param {string} props.title - The title of the chart card.
 * @param {{ name: string; value: number; color?: string }[]} props.chartData - The data for the bar chart.
 * @param {string} props.dataKey - The key for the value in the chartData.
 * @param {string} props.barColor - The color of the bars.
 */
export const BarChartCard: React.FC<BarChartCardProps> = ({ title, chartData, dataKey, barColor }) => {
  // Custom tooltip formatter for currency display
  const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload; // Access the original data object
      return (
        <div className="bg-white p-3 rounded-lg shadow-md border border-gray-200 text-sm">
          <p className="font-semibold text-gray-800">{label}</p>
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
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            layout="vertical" // Changed to vertical layout for categories
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} /> {/* Adjusted for vertical layout */}
            <XAxis
              type="number"
              axisLine={false}
              tickLine={false}
              tickFormatter={(value: number) => {
                if (value >= 1000000) {
                  return `${(value / 1000000).toFixed(1)}M Kz`;
                } else if (value >= 1000) {
                  return `${(value / 1000).toFixed(0)}K Kz`;
                }
                return `${value} Kz`;
              }}
              style={{ fontSize: '14px' }}
            />
            <YAxis
              type="category" // Category type for vertical bars
              dataKey="name"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: '14px' }}
              width={100} // Give more space for category names
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey={dataKey} fill={barColor} radius={[5, 5, 0, 0]} /> {/* Rounded top corners */}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
