import React, { useState, useMemo } from 'react';
import {
  DollarSign,
  List,
  Filter,
  Search,
  CalendarDays,
  ChevronDown,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { incomeExpenseCombinedData, recentTransactions } from '~/datas/mockData';
import { Transaction } from '~/types/types';
import { Card } from '~/components/dashboard/Card';
import { ChartCard } from '~/components/dashboard/ChartCard';
import { PieChartCard } from '~/components/dashboard/PieChartCard';
import { TransactionItem } from '~/components/dashboard/TransactionItem';
import { AdminLayout } from '~/components/dashboard/AdminLayout';

/**
 * TransactionsPage Component
 * This page displays an overview of financial transactions, including summary cards,
 * interactive charts for income/expense trends and category distribution,
 * a list of recent transactions, and filtering/adding functionalities.
 * It's designed to be visually appealing with animations and a responsive layout.
 */
const TransactionsPage: React.FC = () => {
  // State for search and filter options
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedType, setSelectedType] = useState<'' | 'income' | 'expense' | 'transfer'>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  // Memoized filtered transactions for performance
  const filteredTransactions: Transaction[] = useMemo(() => { // Explicitly type as Transaction[]
    return recentTransactions.filter(transaction => {
      const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType === '' || transaction.type === selectedType;
      const matchesCategory = selectedCategory === '' || transaction.category === selectedCategory;

      // Date filtering logic
      const transactionDateParts = transaction.date.split('/'); // Assuming DD/MM/YYYY
      const formattedTransactionDate = `${transactionDateParts[2]}-${transactionDateParts[1]}-${transactionDateParts[0]}`;
      const transactionDateObj = new Date(formattedTransactionDate);

      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      const matchesDate = (!start || transactionDateObj >= start) && (!end || transactionDateObj <= end);

      return matchesSearch && matchesType && matchesCategory && matchesDate;
    });
  }, [searchTerm, selectedType, selectedCategory, startDate, endDate]);

  // Calculate summary metrics from filtered transactions
  const totalIncome = useMemo(() => {
    return filteredTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
  }, [filteredTransactions]);

  const totalExpenses = useMemo(() => {
    return filteredTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + Math.abs(t.amount), 0); // Use Math.abs for expenses
  }, [filteredTransactions]);

  const netBalance = totalIncome - totalExpenses;
  const numberOfTransactions = filteredTransactions.length;

  // Extract unique categories for filter dropdown
  const uniqueCategories = useMemo(() => {
    const categories = new Set<string>();
    recentTransactions.forEach(t => categories.add(t.category));
    return Array.from(categories);
  }, []);

  // Calculate category distribution for the pie chart from filtered transactions
  const filteredCategoryData = useMemo(() => {
    const categoriesMap: { [key: string]: number } = {};
    filteredTransactions.forEach(transaction => {
      const category = transaction.category;
      const absoluteAmount = Math.abs(transaction.amount);
      categoriesMap[category] = (categoriesMap[category] || 0) + absoluteAmount;
    });

    const colors = ['#4CAF50', '#FFC107', '#2196F3', '#9C27B0', '#FF5722', '#00BCD4', '#8BC34A', '#FF9800', '#673AB7', '#E91E63'];
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
  }, [filteredTransactions]);

  return (
    <AdminLayout>
      <div className="space-y-8 p-4 md:p-6 animate-fadeIn">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h2 className="text-3xl font-bold text-dark mb-4 sm:mb-0">Visão Geral das Transações</h2>
          {/* The "Adicionar Nova Transação" button was here and has been removed */}
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card
            title="Total de Receitas"
            value={totalIncome}
            icon={TrendingUp}
            color="success"
            trend={true}
            percentage={12.5} // Example percentage
          />
          <Card
            title="Total de Despesas"
            value={totalExpenses}
            icon={TrendingDown}
            color="danger"
            trend={true}
            percentage={-8.2} // Example percentage
          />
          <Card
            title="Balanço Líquido"
            value={netBalance}
            icon={DollarSign}
            color={netBalance >= 0 ? 'primary' : 'danger'}
            trend={true}
            percentage={netBalance >= 0 ? 5.1 : -3.0} // Example percentage
          />
          <Card
            title="Nº de Transações"
            value={numberOfTransactions}
            icon={List}
            color="secondary"
            isCurrency={false}
          />
        </div>

        {/* Filters Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 animate-fadeInUp">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Filter size={20} className="mr-2 text-primary" /> Filtrar Transações
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

            {/* Type Filter */}
            <div className="relative">
              <select
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as '' | 'income' | 'expense' | 'transfer')}
              >
                <option value="">Todos os Tipos</option>
                <option value="income">Receita</option>
                <option value="expense">Despesa</option>
                <option value="transfer">Transferência</option>
              </select>
              <ChevronDown size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
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

            {/* Date Range Filter */}
            <div className="flex space-x-2">
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
          {/* Income vs Expense Chart */}
          <ChartCard
            title="Receitas vs. Despesas (Últimos 7 Meses)"
            chartData={incomeExpenseCombinedData}
            dataKey={['receita', 'despesa']}
            color="#4F46E5" // Primary color for the chart
          />

          {/* Transaction Categories Pie Chart */}
          <PieChartCard
            title="Distribuição por Categoria"
            chartData={filteredCategoryData}
          />
        </div>

        {/* Recent Transactions Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 animate-fadeInUp">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Transações Recentes</h3>
          <div className="overflow-x-auto">
            <div className="min-w-[600px]"> {/* Ensure minimum width for table-like display */}
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction: Transaction) => ( // Explicitly type transaction here
                  <TransactionItem key={transaction.id} transaction={transaction} />
                ))
              ) : (
                <p className="text-center text-gray-500 py-8">Nenhuma transação encontrada com os filtros aplicados.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};


export default TransactionsPage;
