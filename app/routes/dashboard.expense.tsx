import React, { useState, useMemo } from 'react';
import {
  TrendingDown,
  Filter,
  Search,
  CalendarDays,
  ChevronDown,
  List,
  Tag,
  Wallet
} from 'lucide-react';
import { Transaction } from '~/types/types';
import { detailedExpenses, expenseData } from '~/datas/mockData';
import { Card } from '~/components/dashboard/Card';
import { ChartCard } from '~/components/dashboard/ChartCard';
import { PieChartCard } from '~/components/dashboard/PieChartCard';
import { ExpenseItem } from '~/components/dashboard/ExpenseItem';
import { AdminLayout } from '~/components/dashboard/AdminLayout';

/**
 * ExpensesPage Component
 * This page provides a detailed overview of expense transactions,
 * including summary cards, expense trend charts, expense category distribution,
 * and a detailed list of individual expenses with filtering capabilities.
 * Designed for an administrative backoffice view.
 */
const ExpensesPage: React.FC = () => {
  // State for search and filter options
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSource, setSelectedSource] = useState<string>(''); // Source of expense (e.g., "Cartão de Crédito", "Dinheiro")
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<'' | 'Pendente' | 'Concluído' | 'Cancelado'>('');


  // Memoized filtered expenses for performance
  const filteredExpenses: Transaction[] = useMemo(() => {
    return detailedExpenses.filter(expense => {
      const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === '' || expense.category === selectedCategory;
      const matchesSource = selectedSource === '' || expense.source === selectedSource;
      const matchesPaymentMethod = selectedPaymentMethod === '' || expense.paymentMethod === selectedPaymentMethod;
      const matchesStatus = selectedStatus === '' || expense.status === selectedStatus;


      // Date filtering logic
      const expenseDateParts = expense.date.split('/'); // Assuming DD/MM/YYYY
      const formattedExpenseDate = `${expenseDateParts[2]}-${expenseDateParts[1]}-${expenseDateParts[0]}`;
      const expenseDateObj = new Date(formattedExpenseDate);

      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      const matchesDate = (!start || expenseDateObj >= start) && (!end || expenseDateObj <= end);

      return matchesSearch && matchesCategory && matchesSource && matchesPaymentMethod && matchesStatus && matchesDate;
    });
  }, [searchTerm, selectedCategory, selectedSource, selectedPaymentMethod, selectedStatus, startDate, endDate]);

  // Calculate summary metrics from filtered expenses
  const totalExpenses = useMemo(() => {
    return filteredExpenses.reduce((sum, e) => sum + Math.abs(e.amount), 0); // Use Math.abs for total expenses
  }, [filteredExpenses]);

  const averageExpense = useMemo(() => {
    return filteredExpenses.length > 0 ? totalExpenses / filteredExpenses.length : 0;
  }, [totalExpenses, filteredExpenses.length]);

  const numberOfExpenses = filteredExpenses.length;

  const uniqueCategories = useMemo(() => {
    const categories = new Set<string>();
    detailedExpenses.forEach(e => categories.add(e.category));
    return Array.from(categories);
  }, []);

  const uniqueSources = useMemo(() => {
    const sources = new Set<string>();
    detailedExpenses.forEach(e => {
      if (e.source) sources.add(e.source);
    });
    return Array.from(sources);
  }, []);

  const uniquePaymentMethods = useMemo(() => {
    const methods = new Set<string>();
    detailedExpenses.forEach(e => {
      if (e.paymentMethod) methods.add(e.paymentMethod);
    });
    return Array.from(methods);
  }, []);

  // Calculate expense category distribution for the pie chart from filtered expenses
  const filteredExpenseCategoryData = useMemo(() => {
    const categoriesMap: { [key: string]: number } = {};
    filteredExpenses.forEach(expense => {
      const category = expense.category;
      const absoluteAmount = Math.abs(expense.amount);
      categoriesMap[category] = (categoriesMap[category] || 0) + absoluteAmount;
    });

    const colors = ['#ef4444', '#FFC107', '#2196F3', '#9C27B0', '#FF5722', '#00BCD4', '#8BC34A', '#FF9800', '#673AB7', '#E91E63'];
    let colorIndex = 0;

    return Object.keys(categoriesMap).map(category => {
      const color = colors[colorIndex % colors.length];
      colorIndex++;
      return {
        name: category,
        value: categoriesMap[category],
        color: color,
      };
    });
  }, [filteredExpenses]);


  return (
    <AdminLayout>
      <div className="space-y-8 p-4 md:p-6 animate-fadeIn">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h2 className="text-3xl font-bold text-dark mb-4 sm:mb-0">Gestão de Despesas</h2>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card
            title="Total de Despesas"
            value={totalExpenses}
            icon={TrendingDown}
            color="danger"
            trend={true}
            percentage={-10.0} // Example percentage
          />
          <Card
            title="Despesa Média"
            value={averageExpense}
            icon={Wallet}
            color="primary"
            trend={true}
            percentage={-3.0} // Example percentage
          />
          <Card
            title="Nº de Despesas"
            value={numberOfExpenses}
            icon={List}
            color="secondary"
            isCurrency={false}
          />
          <Card
            title="Categorias de Despesas Únicas"
            value={uniqueCategories.length}
            icon={Tag}
            color="danger"
            isCurrency={false}
          />
        </div>

        {/* Filters Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 animate-fadeInUp">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Filter size={20} className="mr-2 text-primary" /> Filtrar Despesas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Pesquisar por descrição..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <select
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Todas as Categorias</option>
                {uniqueCategories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <ChevronDown size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>

            {/* Source Filter */}
            <div className="relative">
              <select
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                value={selectedSource}
                onChange={(e) => setSelectedSource(e.target.value)}
              >
                <option value="">Todas as Fontes</option>
                {uniqueSources.map(source => (
                  <option key={source} value={source}>{source}</option>
                ))}
              </select>
              <ChevronDown size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>

            {/* Payment Method Filter */}
            <div className="relative">
              <select
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                value={selectedPaymentMethod}
                onChange={(e) => setSelectedPaymentMethod(e.target.value)}
              >
                <option value="">Todos os Métodos de Pagamento</option>
                {uniquePaymentMethods.map(method => (
                  <option key={method} value={method}>{method}</option>
                ))}
              </select>
              <ChevronDown size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <select
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as '' | 'Pendente' | 'Concluído' | 'Cancelado')}
              >
                <option value="">Todos os Status</option>
                <option value="Concluído">Concluído</option>
                <option value="Pendente">Pendente</option>
                <option value="Cancelado">Cancelado</option>
              </select>
              <ChevronDown size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>

            {/* Date Range Filter */}
            <div className="flex space-x-2 lg:col-span-2">
              <div className="relative flex-1">
                <input
                  type="date"
                  className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <CalendarDays size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
              <div className="relative flex-1">
                <input
                  type="date"
                  className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
                <CalendarDays size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Expense Trend Chart */}
          <ChartCard
            title="Tendência de Despesas (Últimos 7 Meses)"
            chartData={expenseData}
            dataKey="despesa"
            color="#ef4444" // Red for expenses
          />

          {/* Expense Category Distribution Pie Chart */}
          <PieChartCard
            title="Distribuição por Categoria de Despesa"
            chartData={filteredExpenseCategoryData}
          />
        </div>

        {/* Detailed Expenses Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 animate-fadeInUp">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Despesas Detalhadas</h3>
          <div className="overflow-x-auto">
            <div className="min-w-[700px]"> {/* Ensure minimum width for table-like display */}
              {filteredExpenses.length > 0 ? (
                filteredExpenses.map((expense: Transaction) => (
                  <ExpenseItem key={expense.id} transaction={expense} />
                ))
              ) : (
                <p className="text-center text-gray-500 py-8">Nenhuma despesa encontrada com os filtros aplicados.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ExpensesPage;
