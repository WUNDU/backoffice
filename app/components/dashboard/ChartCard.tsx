// ChartCard.tsx
import { ChevronDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartCardProps } from '~/types/types';


export const ChartCard: React.FC<ChartCardProps> = ({ title, chartData, dataKey, color, isCurrencyChart = false }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-medium text-gray-800">{title}</h3>
        <div className="flex items-center text-xs bg-gray-100 px-2 py-1 rounded">
          <span>Últimos 7 meses</span>
          <ChevronDown size={14} className="ml-1" />
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 40, bottom: 5 }} // Increased left margin for Y-axis labels
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: '14px' }} // Set font size for X-axis ticks for consistency
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              // Adjusted tickFormatter for better readability with large numbers
              tickFormatter={(value: number) => {
                if (isCurrencyChart) {
                  // Formatação para moeda (Kz)
                  if (value >= 1000000) {
                    return `${(value / 1000000).toFixed(1)}M Kz`; // Para milhões
                  } else if (value >= 1000) {
                    return `${(value / 1000).toFixed(0)}K Kz`; // Para milhares
                  }
                  return `${value} Kz`; // Para valores menores
                } else {
                  // Formatação sem moeda (apenas números)
                  if (value >= 1000000) {
                    return `${(value / 1000000).toFixed(1)}M`; // Para milhões
                  } else if (value >= 1000) {
                    return `${(value / 1000).toFixed(0)}K`; // Para milhares
                  }
                  return `${value}`; // Para valores menores
                }
              }}
              style={{ fontSize: '14px' }} // Increased font size for Y-axis ticks
            />
            <Tooltip
              formatter={(value: number) => {
                if (isCurrencyChart) {
                  return [`${new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(value)}`, title];
                }
                return [`${value.toLocaleString()}`, title]; // Apenas o número formatado
              }}
              labelFormatter={(label: string) => `${label}/2025`}
            />
            {Array.isArray(dataKey) ? (
              <>
                <Line
                  type="monotone"
                  dataKey={dataKey[0]}
                  stroke="#22c55e"
                  strokeWidth={2}
                  dot={{ stroke: "#22c55e", strokeWidth: 2, r: 4, fill: 'white' }}
                  activeDot={{ r: 6, stroke: "#22c55e", strokeWidth: 2, fill: 'white' }}
                  name="Receitas"
                />
                <Line
                  type="monotone"
                  dataKey={dataKey[1]}
                  stroke="#ef4444"
                  strokeWidth={2}
                  dot={{ stroke: "#ef4444", strokeWidth: 2, r: 4, fill: 'white' }}
                  activeDot={{ r: 6, stroke: "#ef4444", strokeWidth: 2, fill: 'white' }}
                  name="Despesas"
                />
              </>
            ) : (
              <Line
                type="monotone"
                dataKey={dataKey}
                stroke={color}
                strokeWidth={2}
                dot={{ stroke: color, strokeWidth: 2, r: 4, fill: 'white' }}
                activeDot={{ r: 6, stroke: color, strokeWidth: 2, fill: 'white' }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
