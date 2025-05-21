import { ChevronDown, Download } from 'lucide-react';
import { useState } from 'react';
import { AdminLayout } from '~/components/dashboard/AdminLayout';
import { ChartCard } from '~/components/dashboard/ChartCard';
import { balanceData, expenseData, incomeData } from '~/datas/mockData';


export function ReportsPage() {
  const [reportPeriod, setReportPeriod] = useState('month');

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Relatórios Financeiros</h1>
          <p className="text-gray-600 mt-1">Análise de desempenho e indicadores financeiros</p>
        </div>

        <div className="mt-4 md:mt-0 flex space-x-3">
          <div className="relative">
            <select
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary cursor-pointer"
              value={reportPeriod}
              onChange={(e) => setReportPeriod(e.target.value)}
            >
              <option value="month">Maio 2025</option>
              <option value="quarter">2º Trimestre 2025</option>
              <option value="year">Ano 2025</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
          </div>

          <button className="flex items-center justify-center px-4 py-2 bg-secondary text-white rounded-lg hover:bg-primary transition-colors duration-200">
            <Download size={16} className="mr-2" />
            <span>Exportar PDF</span>
          </button>
        </div>
      </div>

      {/* Gráficos de Relatórios */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartCard
          title="Balanço Mensal"
          chartData={balanceData}
          dataKey="saldo"
          color="#3b82f6"
        />
        <ChartCard
          title="Receitas vs Despesas"
          chartData={
            Array.from(
              new Set([...incomeData, ...expenseData].map(item => item.month))
            ).map(month => {
              const income = incomeData.find(item => item.month === month);
              const expense = expenseData.find(item => item.month === month);
              return {
                month,
                receita: income?.receita || 0,
                despesa: expense?.despesa || 0
              };
            })
          }
          dataKey={['receita', 'despesa']}
          color="#3b82f6"
        />
      </div>

      {/* Resumo Financeiro */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
        <div className="p-6 border-b border-gray-100">
          <h3 className="font-medium text-gray-800">Resumo Financeiro</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Total de Receitas</p>
              <p className="text-2xl font-bold text-gray-800">
                {new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(4100000)}
              </p>
              <p className="text-xs text-green-600 mt-2 flex items-center">
                <span>+5% em relação ao mês anterior</span>
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Total de Despesas</p>
              <p className="text-2xl font-bold text-gray-800">
                {new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(2950000)}
              </p>
              <p className="text-xs text-red-600 mt-2 flex items-center">
                <span>-3% em relação ao mês anterior</span>
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Lucro</p>
              <p className="text-2xl font-bold text-gray-800">
                {new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(1150000)}
              </p>
              <p className="text-xs text-green-600 mt-2 flex items-center">
                <span>+18% em relação ao mês anterior</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}