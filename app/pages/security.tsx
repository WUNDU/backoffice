// SecurityPage.tsx

import { Activity, AlertCircle, Calendar, CheckCircle, Info, Search, ShieldAlert } from "lucide-react";
import { useState } from "react";
import { AdminLayout } from "~/components/dashboard/AdminLayout";
import { ChartCard } from "~/components/dashboard/ChartCard";
import { accessLogsData, securityAlertsData, securityMetricsData } from "~/datas/mockData";


export default function SecurityPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all', 'critical', 'warning', 'info'

  const filteredAlerts = securityAlertsData.filter(alert => {
    const matchesSearch = alert.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.timestamp.includes(searchTerm);
    const matchesType = filterType === 'all' || alert.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <AdminLayout>
      <div className="animate-fadeInUp">
        <h1 className="text-2xl font-bold text-dark mb-6">Painel de Segurança</h1>
        <p className="text-gray-600 mb-8">Gerencie alertas, visualize logs de acesso e monitore métricas de segurança.</p>

        {/* Alertas de Segurança */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-dark">Alertas de Segurança</h2>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Pesquisar alertas..."
                  className="pl-8 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search size={16} className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <select
                className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary cursor-pointer"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">Todos</option>
                <option value="critical">Crítico</option>
                <option value="warning">Aviso</option>
                <option value="info">Informação</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            {filteredAlerts.length > 0 ? (
              filteredAlerts.map(alert => (
                <div key={alert.id} className={`flex items-center p-4 rounded-lg border
                  ${alert.type === 'critical' ? 'bg-red-50 border-red-200' : ''}
                  ${alert.type === 'warning' ? 'bg-yellow-50 border-yellow-200' : ''}
                  ${alert.type === 'info' ? 'bg-blue-50 border-blue-200' : ''}
                  ${alert.status === 'resolved' ? 'opacity-70' : ''}
                `}>
                  <div className="flex-shrink-0 mr-3">
                    {alert.type === 'critical' && <AlertCircle size={20} className="text-red-600" />}
                    {alert.type === 'warning' && <Info size={20} className="text-yellow-600" />}
                    {alert.type === 'info' && <CheckCircle size={20} className="text-blue-600" />}
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium text-sm ${alert.type === 'critical' ? 'text-red-800' : alert.type === 'warning' ? 'text-yellow-800' : 'text-blue-800'}`}>
                      {alert.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{alert.timestamp}</p>
                  </div>
                  {alert.status === 'pending' ? (
                    <button className="ml-auto px-3 py-1 bg-secondary text-white text-xs rounded-md hover:bg-primary transition-colors">
                      Resolver
                    </button>
                  ) : (
                    <span className="ml-auto text-xs text-gray-500">Resolvido</span>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-8">Nenhum alerta encontrado.</p>
            )}
          </div>
        </div>

        {/* Logs de Acesso */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
          <h2 className="text-xl font-semibold text-dark mb-4">Logs de Acesso Recentes</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuário</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ação</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {accessLogsData.map(log => (
                  <tr key={log.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{log.user}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{log.action}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{log.ip}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Métricas de Segurança (usando ChartCard para visualização) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-dark mb-4">Métricas de Segurança</h2>
            <ChartCard
              title="Visão Geral de Métricas"
              chartData={securityMetricsData}
              dataKey="value"
              color="#003cc3" // Secondary color
              isCurrencyChart={false} // Não é um gráfico de moeda
            />
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-dark mb-4">Atividade Recente de Segurança</h2>
            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-700">
                <Activity size={16} className="text-secondary mr-2" />
                <span>Última tentativa de login falha: 22/05/2025 10:30</span>
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <ShieldAlert size={16} className="text-tertiary mr-2" />
                <span>Vulnerabilidades de alta prioridade: 2</span>
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <Calendar size={16} className="text-primary mr-2" />
                <span>Última auditoria de segurança: 01/05/2025</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
