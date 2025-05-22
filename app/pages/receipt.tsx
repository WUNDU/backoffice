import React, { useState, useMemo } from 'react';
import {
  TrendingUp,
  Filter,
  Search,
  ChevronDown,
  List,
  Wallet,
  Tag
} from 'lucide-react';
import { Transaction } from '~/types/types';
import { detailedReceipts, incomeData } from '~/datas/mockData';
import { Card } from '~/components/dashboard/Card';
import { ChartCard } from '~/components/dashboard/ChartCard';
import { PieChartCard } from '~/components/dashboard/PieChartCard';
import { ReceiptItem } from '~/components/dashboard/ReceiptItem';
import { AdminLayout } from '~/components/dashboard/AdminLayout';


/**
 * ReceiptsPage Component
 * This page provides a detailed overview of income transactions,
 * including summary cards, income trend charts, income source distribution,
 * and a detailed list of individual receipts with filtering capabilities.
 * Designed for an administrative backoffice view.
 */
const ReceiptsPage: React.FC = () => {
  // State for search and filter options
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSource, setSelectedSource] = useState<string>('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<'' | 'Pendente' | 'Concluído' | 'Cancelado'>('');


  // Memoized filtered receipts for performance
  const filteredReceipts: Transaction[] = useMemo(() => {
    return detailedReceipts.filter(receipt => {
      const matchesSearch = receipt.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === '' || receipt.category === selectedCategory;
      const matchesSource = selectedSource === '' || receipt.source === selectedSource;
      const matchesPaymentMethod = selectedPaymentMethod === '' || receipt.paymentMethod === selectedPaymentMethod;
      const matchesStatus = selectedStatus === '' || receipt.status === selectedStatus;


      // Date filtering logic
      const receiptDateParts = receipt.date.split('/'); // Assuming DD/MM/YYYY
      const formattedReceiptDate = `${receiptDateParts[2]}-${receiptDateParts[1]}-${receiptDateParts[0]}`;
      const receiptDateObj = new Date(formattedReceiptDate);

      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      const matchesDate = (!start || receiptDateObj >= start) && (!end || receiptDateObj <= end);

      return matchesSearch && matchesCategory && matchesSource && matchesPaymentMethod && matchesStatus && matchesDate;
    });
  }, [searchTerm, selectedCategory, selectedSource, selectedPaymentMethod, selectedStatus, startDate, endDate]);

  // Calculate summary metrics from filtered receipts
  const totalIncome = useMemo(() => {
    return filteredReceipts.reduce((sum, r) => sum + r.amount, 0);
  }, [filteredReceipts]);

  const averageIncome = useMemo(() => {
    return filteredReceipts.length > 0 ? totalIncome / filteredReceipts.length : 0;
  }, [totalIncome, filteredReceipts.length]);

  const numberOfReceipts = filteredReceipts.length;

  const uniqueCategories = useMemo(() => {
    const categories = new Set<string>();
    detailedReceipts.forEach(r => categories.add(r.category));
    return Array.from(categories);
  }, []);

  const uniqueSources = useMemo(() => {
    const sources = new Set<string>();
    detailedReceipts.forEach(r => {
      if (r.source) sources.add(r.source);
    });
    return Array.from(sources);
  }, []);

  const uniquePaymentMethods = useMemo(() => {
    const methods = new Set<string>();
    detailedReceipts.forEach(r => {
      if (r.paymentMethod) methods.add(r.paymentMethod);
    });
    return Array.from(methods);
  }, []);

  // Calculate income source distribution for the pie chart from filtered receipts
  const filteredIncomeSourceData = useMemo(() => {
    const sourcesMap: { [key: string]: number } = {};
    filteredReceipts.forEach(receipt => {
      const source = receipt.source || 'Outros'; // Default to 'Outros' if source is undefined
      sourcesMap[source] = (sourcesMap[source] || 0) + receipt.amount;
    });

    const colors = ['#4CAF50', '#FFC107', '#2196F3', '#9C27B0', '#FF5722', '#00BCD4', '#8BC34A', '#FF9800', '#673AB7', '#E91E63'];
    let colorIndex = 0;

    return Object.keys(sourcesMap).map(source => {
      const color = colors[colorIndex % colors.length];
      colorIndex++;
      return {
        name: source,
        value: sourcesMap[source],
        color: color,
      };
    });
  }, [filteredReceipts]);


  return (
    <AdminLayout>
      <div className="space-y-8 p-4 md:p-6 animate-fadeIn">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h2 className="text-3xl font-bold text-dark mb-4 sm:mb-0">Gestão de Receitas</h2>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card
            title="Total de Receitas"
            value={totalIncome}
            icon={TrendingUp}
            color="success"
            trend={true}
            percentage={15.0} // Example percentage
          />
          <Card
            title="Receita Média"
            value={averageIncome}
            icon={Wallet}
            color="primary"
            trend={true}
            percentage={5.0} // Example percentage
          />
          <Card
            title="Nº de Receitas"
            value={numberOfReceipts}
            icon={List}
            color="secondary"
            isCurrency={false}
          />
          <Card
            title="Fontes de Receita Únicas"
            value={uniqueSources.length}
            icon={Tag}
            color="success"
            isCurrency={false}
          />
        </div>

        {/* Filters Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 animate-fadeInUp">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Filter size={20} className="mr-2 text-primary" /> Filtrar Receitas
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
              </div>
              <div className="relative flex-1">
                <input
                  type="date"
                  className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Income Trend Chart */}
          <ChartCard
            title="Tendência de Receitas (Últimos 7 Meses)"
            chartData={incomeData}
            dataKey="receita"
            color="#22c55e" // Green for income
          />

          {/* Income Source Distribution Pie Chart */}
          <PieChartCard
            title="Distribuição por Fonte de Receita"
            chartData={filteredIncomeSourceData}
          />
        </div>

        {/* Detailed Receipts Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 animate-fadeInUp">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Receitas Detalhadas</h3>
          <div className="overflow-x-auto">
            <div className="min-w-[700px]"> {/* Ensure minimum width for table-like display */}
              {filteredReceipts.length > 0 ? (
                filteredReceipts.map((receipt: Transaction) => (
                  <ReceiptItem key={receipt.id} receipt={receipt} />
                ))
              ) : (
                <p className="text-center text-gray-500 py-8">Nenhuma receita encontrada com os filtros aplicados.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ReceiptsPage;
