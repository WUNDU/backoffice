import React, { useState, useEffect } from 'react';
import {
  Users,
  UserPlus,
  Bell,
  ShieldAlert,
  ChevronDown,
  Filter,
  ChevronRight,
  Info,
  Activity,
  MapPin
} from 'lucide-react';
import { Link } from '@remix-run/react';
import { AdminLayout } from '~/components/dashboard/AdminLayout';
import { Card } from '~/components/dashboard/Card';
import { ChartCard } from '~/components/dashboard/ChartCard';
import { TransactionItem } from '~/components/dashboard/TransactionItem';
import { geoDistributionData, kpiData, userGrowthData } from '~/types/kpi';
import { expenseData, incomeData, recentTransactions } from '~/datas/mockData';


// New component to handle individual geographical distribution bars with animation
interface GeoDistributionBarProps {
  region: {
    region: string;
    users: number;
  };
  totalUsers: number;
  index: number;
}

const GeoDistributionBar: React.FC<GeoDistributionBarProps> = ({ region, totalUsers, index }) => {
  const [animatedWidth, setAnimatedWidth] = useState(0);
  // Ensure totalUsers is not zero to prevent division by zero, which results in NaN or Infinity
  const targetWidth = totalUsers > 0 ? (region.users / totalUsers) * 100 : 0;

  useEffect(() => {
    // Reset animatedWidth to 0 before starting new animation
    setAnimatedWidth(0);

    let animationFrameId: number;
    let startTime: number | null = null;
    const duration = 1000; // 1 second animation

    const animateBar = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = (currentTime - startTime) / duration;
      const currentWidth = Math.min(progress, 1) * targetWidth;
      setAnimatedWidth(currentWidth);

  
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animateBar);
      }
    };

    // Start animation after a small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      animationFrameId = requestAnimationFrame(animateBar);
    }, 100 * index); // Stagger animation for each bar

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(animationFrameId);
      setAnimatedWidth(0); // Reset on unmount
    };
  }, [targetWidth, index, region.region, region.users, totalUsers]);

  return (
    <div className="flex items-center">
      <div className="w-32 text-sm text-gray-700">{region.region}</div>
      <div className="flex-1">
        <div className="relative h-4 w-full bg-gray-200 rounded-full overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-primary transition-all duration-1000 ease-out"
            style={{ width: `${animatedWidth}%` }}
          ></div>
        </div>
      </div>
      <div className="w-24 text-right text-sm font-medium text-gray-700">
        {region.users.toLocaleString()}
        <span className="text-xs text-gray-500 ml-1">
          ({totalUsers > 0 ? ((region.users / totalUsers) * 100).toFixed(1) : '0.0'}%)
        </span>
      </div>
    </div>
  );
};


export default function AdminDashboard() {
  const [period, setPeriod] = useState('month');


  return (
    <AdminLayout>
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 animate-fadeInUp">
        <div>
          <h1 className="text-2xl font-bold text-dark">Painel Administrativo</h1>
          <p className="text-gray-600 mt-1">Visão geral do sistema e métricas principais</p>
        </div>

        <div className="mt-4 md:mt-0 flex space-x-3">
          <div className="relative">
            <select
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary cursor-pointer transition-all duration-300"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
            >
              <option value="today">Hoje</option>
              <option value="week">Esta Semana</option>
              <option value="month">Este Mês</option>
              <option value="quarter">Este Trimestre</option>
              <option value="year">Este Ano</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
          </div>

          <button className="flex items-center justify-center px-4 py-2 bg-secondary text-white rounded-lg hover:bg-primary transition-colors duration-200">
            <Bell size={16} className="mr-2" />
            <span>Visualizar Alertas</span>
          </button>
        </div>
      </div>

      {/* Alertas de Segurança (se houver) */}
      {kpiData.securityAlerts > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center animate-fadeInDown">
          <ShieldAlert size={20} className="text-red-500 mr-3" />
          <div>
            <h3 className="font-medium text-red-700">Alertas de Segurança Ativos</h3>
            <p className="text-red-600 text-sm">
              Você tem {kpiData.securityAlerts} {kpiData.securityAlerts === 1 ? 'alerta' : 'alertas'} de segurança que {kpiData.securityAlerts === 1 ? 'requer' : 'requerem'} atenção.
              <Link to="/admin/seguranca/alertas" className="ml-2 underline text-secondary hover:text-primary transition-colors duration-200">Verificar</Link>
            </p>
          </div>
        </div>
      )}

      {/* KPIs - Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <Card
          title="Total de Usuários"
          value={kpiData.totalUsers}
          icon={Users}
          trend={true}
          percentage={9}
          color="primary"
          isCurrency={false}
        />
        <Card
          title="Novos Usuários (Mês)"
          value={kpiData.newUsers.month}
          icon={UserPlus}
          trend={true}
          percentage={12}
          color="success"
          isCurrency={false}
        />
        <Card
          title="Transações (Mês)"
          value={kpiData.transactions.month}
          icon={Activity}
          trend={true}
          percentage={7}
          color="secondary"
          isCurrency={false}
        />
        <Card
          title="Tickets de Suporte"
          value={kpiData.supportTickets}
          icon={Bell}
          trend={true}
          percentage={-15}
          color="danger"
          isCurrency={false}
        />
      </div>

      {/* Estatísticas de Usuários Ativos */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8 p-6 transition-all duration-300 hover:shadow-md">
        <h3 className="font-medium text-dark mb-4">Estatísticas de Usuários Ativos</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-4 rounded-lg transition-all duration-300 hover:scale-[1.02] animate-fadeInUp">
            <div className="flex justify-between items-center">
              <h4 className="text-sm text-blue-700">Diário (DAU)</h4>
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                {((kpiData.activeUsers.daily / kpiData.totalUsers) * 100).toFixed(1)}%
              </span>
            </div>
            <p className="text-2xl font-bold text-blue-800 mt-2">{kpiData.activeUsers.daily.toLocaleString()}</p>
          </div>

          <div className="bg-green-50 p-4 rounded-lg transition-all duration-300 hover:scale-[1.02] animate-fadeInUp delay-100">
            <div className="flex justify-between items-center">
              <h4 className="text-sm text-green-700">Semanal (WAU)</h4>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                {((kpiData.activeUsers.weekly / kpiData.totalUsers) * 100).toFixed(1)}%
              </span>
            </div>
            <p className="text-2xl font-bold text-green-800 mt-2">{kpiData.activeUsers.weekly.toLocaleString()}</p>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg transition-all duration-300 hover:scale-[1.02] animate-fadeInUp delay-200">
            <div className="flex justify-between items-center">
              <h4 className="text-sm text-purple-700">Mensal (MAU)</h4>
              <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                {((kpiData.activeUsers.monthly / kpiData.totalUsers) * 100).toFixed(1)}%
              </span>
            </div>
            <p className="text-2xl font-bold text-purple-800 mt-2">{kpiData.activeUsers.monthly.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartCard
          title="Crescimento de Usuários"
          chartData={userGrowthData}
          dataKey="users"
          color="#003cc3" // Using secondary color
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
          color="#00216b" // Using primary color
        />
      </div>

      {/* Distribuição Geográfica */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8 transition-all duration-300 hover:shadow-md">
        <div className="p-6 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-dark">Distribuição Geográfica de Usuários</h3>
            <div className="flex items-center">
              <MapPin size={14} className="text-gray-400 mr-2" />
              <span className="text-xs text-gray-500">Por região</span>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {geoDistributionData.map((region, index) => (
              <GeoDistributionBar
                key={index}
                region={region}
                totalUsers={kpiData.totalUsers}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Transações Recentes e Alertas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Transações Recentes */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 lg:col-span-2 transition-all duration-300 hover:shadow-md">
          <div className="p-6 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-dark">Transações Recentes</h3>
              <div className="flex space-x-2">
                <button className="p-1 text-gray-500 hover:text-gray-700 transition-colors duration-200">
                  <Filter size={16} />
                </button>
                <Link to="/admin/transacoes" className="flex items-center text-secondary text-sm hover:text-primary transition-colors duration-200">
                  Ver todas
                  <ChevronRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
          </div>
          <div className="p-6">
            {recentTransactions.map(transaction => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))}
          </div>
        </div>

        {/* Alertas e Atividades */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
          <div className="p-6 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-dark">Alertas de Segurança</h3>
              <Link to="/admin/seguranca/alertas" className="flex items-center text-secondary text-sm hover:text-primary transition-colors duration-200">
                Ver todos
                <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex p-3 bg-red-50 rounded-lg transition-all duration-300 hover:scale-[1.02]">
                <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <ShieldAlert size={16} className="text-red-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-red-800">Múltiplas tentativas de login</p>
                  <p className="text-xs text-red-600">5 tentativas falhas para conta ID #3892</p>
                  <p className="text-xs text-gray-500 mt-1">Há 24 minutos</p>
                </div>
              </div>

              <div className="flex p-3 bg-yellow-50 rounded-lg transition-all duration-300 hover:scale-[1.02]">
                <div className="flex-shrink-0 w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Activity size={16} className="text-yellow-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-yellow-800">Transação suspeita</p>
                  <p className="text-xs text-yellow-600">Transferência grande de valor atípico</p>
                  <p className="text-xs text-gray-500 mt-1">Há 2 horas</p>
                </div>
              </div>

              <div className="flex p-3 bg-blue-50 rounded-lg transition-all duration-300 hover:scale-[1.02]">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Info size={16} className="text-blue-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-blue-800">Novo usuário administrador</p>
                  <p className="text-xs text-blue-600">Usuário com privilégios elevados criado</p>
                  <p className="text-xs text-gray-500 mt-1">Há 5 horas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
