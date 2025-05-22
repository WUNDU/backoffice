import React, { useState, useMemo } from 'react';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Filter,
  ChevronDown,
  ClipboardList,
  Target,
  Users
} from 'lucide-react';
import { ChartData } from '~/types/types';
import { annualFinancialPerformance, topExpenseCategoriesReport, topIncomeSourcesReport } from '~/datas/mockData';
import { Card } from '~/components/dashboard/Card';
import { ChartCard } from '~/components/dashboard/ChartCard';
import { BarChartCard } from '~/components/dashboard/BarChartCard';
import { AdminLayout } from '~/components/dashboard/AdminLayout';

/**
 * ReportsPage Component
 * This page provides a comprehensive overview of financial reports and analytics
 * for the backoffice, allowing administrators to gain insights into aggregated
 * user financial data. It includes summary cards, various charts, and filtering options.
 */
const ReportsPage: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('all'); // e.g., 'all', 'last-3-months', 'last-year'
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  // Memoized filtered financial performance data
  const filteredAnnualFinancialPerformance: ChartData[] = useMemo(() => {
    let data = annualFinancialPerformance;

    // Implement filtering based on selectedPeriod or custom date range
    if (selectedPeriod === 'last-3-months') {
      // Logic to get last 3 months data
      // For mock data, we'll just take the last 3 entries as an example
      data = annualFinancialPerformance.slice(-3);
    } else if (selectedPeriod === 'last-year') {
      // For mock data, assume annualFinancialPerformance covers a year
      data = annualFinancialPerformance;
    } else if (startDate && endDate) {
      // Advanced date range filtering logic (requires more robust date parsing)
      const start = new Date(startDate);
      const end = new Date(endDate);
      data = annualFinancialPerformance.filter(item => {
        const itemDate = new Date(`2025-${item.month}-01`); // Assuming 2025 for mock data
        return itemDate >= start && itemDate <= end;
      });
    }
    return data;
  }, [selectedPeriod, startDate, endDate]);

  // Calculate summary metrics from filtered data
  const totalReportIncome = useMemo(() => {
    return filteredAnnualFinancialPerformance.reduce((sum, item) => sum + (item.receita || 0), 0);
  }, [filteredAnnualFinancialPerformance]);

  const totalReportExpenses = useMemo(() => {
    return filteredAnnualFinancialPerformance.reduce((sum, item) => sum + (item.despesa || 0), 0);
  }, [filteredAnnualFinancialPerformance]);

  const totalReportNetBalance = useMemo(() => {
    return filteredAnnualFinancialPerformance.reduce((sum, item) => sum + (item.net || 0), 0);
  }, [filteredAnnualFinancialPerformance]);

  const totalTransactionsCount = useMemo(() => {
    // This would ideally come from a separate data source or calculated from detailed transactions
    // For now, a simple mock value or sum of income/expense counts
    return filteredAnnualFinancialPerformance.length * 200; // Example: 200 transactions per month
  }, [filteredAnnualFinancialPerformance]);

  return (
    <AdminLayout>
      <div className="space-y-8 p-4 md:p-6 animate-fadeIn">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h2 className="text-3xl font-bold text-dark mb-4 sm:mb-0">Relatórios e Análises</h2>
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
            <button className="flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg shadow-md hover:bg-primary-dark transition-all duration-300 transform hover:scale-105">
              <ClipboardList size={20} className="mr-2" />
              Gerar Relatório Personalizado
            </button>
          </div>
        </div>

        {/* Summary Cards for Reports */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card
            title="Receita Total Agregada"
            value={totalReportIncome}
            icon={TrendingUp}
            color="success"
            trend={true}
            percentage={8.5}
          />
          <Card
            title="Despesa Total Agregada"
            value={totalReportExpenses}
            icon={TrendingDown}
            color="danger"
            trend={true}
            percentage={-4.1}
          />
          <Card
            title="Balanço Líquido Agregado"
            value={totalReportNetBalance}
            icon={DollarSign}
            color={totalReportNetBalance >= 0 ? 'primary' : 'danger'}
            trend={true}
            percentage={totalReportNetBalance >= 0 ? 6.2 : -2.5}
          />
          <Card
            title="Total de Transações"
            value={totalTransactionsCount}
            icon={Users} // Changed icon to Users to represent overall user activity in transactions
            color="secondary"
            isCurrency={false}
          />
        </div>

        {/* Filters Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 animate-fadeInUp">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Filter size={20} className="mr-2 text-primary" /> Opções de Relatório
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Period Filter */}
            <div className="relative">
              <select
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
              >
                <option value="all">Todo o Período</option>
                <option value="last-3-months">Últimos 3 Meses</option>
                <option value="last-year">Último Ano</option>
                <option value="custom">Período Personalizado</option>
              </select>
              <ChevronDown size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>

            {/* Custom Date Range (conditionally rendered) */}
            {selectedPeriod === 'custom' && (
              <>
                <div className="relative">
                  <input
                    type="date"
                    className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div className="relative">
                  <input
                    type="date"
                    className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Main Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Annual Financial Performance */}
          <ChartCard
            title="Desempenho Financeiro Anual"
            chartData={filteredAnnualFinancialPerformance}
            dataKey={['receita', 'despesa', 'net']} // Showing all three on one chart
            color="#4F46E5" // Default color, but lines will have specific colors
          />

          {/* Top Expense Categories */}
          <BarChartCard
            title="Principais Categorias de Despesa"
            chartData={topExpenseCategoriesReport}
            dataKey="value"
            barColor="#ef4444" // Red for expenses
          />

          {/* Top Income Sources */}
          <BarChartCard
            title="Principais Fontes de Receita"
            chartData={topIncomeSourcesReport}
            dataKey="value"
            barColor="#22c55e" // Green for income
          />

          {/* Placeholder for another chart, e.g., Budget vs. Actual */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-center animate-fadeInUp">
            <div className="text-center text-gray-500">
              <Target size={48} className="mx-auto mb-3 text-gray-400" />
              <p className="font-medium text-lg">Relatório de Orçamento vs. Real</p>
              <p className="text-sm">Em breve: Acompanhe o desempenho do orçamento dos utilizadores.</p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ReportsPage;
