// TicketManagementPage.tsx
import { CheckCircle, MessageSquare, PlusCircle, Search, XCircle } from 'lucide-react';
import { useState, } from 'react';
import { AdminLayout } from '~/components/dashboard/AdminLayout'; // Ajuste o caminho conforme necessário

// Dados simulados para tickets
const mockTickets = [
  { id: 'TKT001', subject: 'Problema ao aceder relatórios financeiros', requester: 'joao.s@example.com', status: 'open', priority: 'high', createdAt: '2025-05-20 14:30', lastUpdate: '2025-05-22 09:00' },
  { id: 'TKT002', subject: 'Erro na importação de dados de transação', requester: 'maria.s@example.com', status: 'open', priority: 'high', createdAt: '2025-05-21 10:00', lastUpdate: '2025-05-21 16:00' },
  { id: 'TKT003', subject: 'Dúvida sobre permissões de usuário', requester: 'pedro.c@example.com', status: 'closed', priority: 'medium', createdAt: '2025-05-18 11:45', lastUpdate: '2025-05-19 10:00' },
  { id: 'TKT004', subject: 'Solicitação de nova funcionalidade de relatório', requester: 'ana.p@example.com', status: 'open', priority: 'low', createdAt: '2025-05-22 08:10', lastUpdate: '2025-05-22 08:10' },
  { id: 'TKT005', subject: 'Problema de acesso ao dashboard móvel', requester: 'carlos.l@example.com', status: 'pending', priority: 'medium', createdAt: '2025-05-19 17:00', lastUpdate: '2025-05-20 14:00' },
  { id: 'TKT006', subject: 'Erro na geração de recibos', requester: 'joana.m@example.com', status: 'open', priority: 'high', createdAt: '2025-05-22 11:20', lastUpdate: '2025-05-22 11:20' },
  { id: 'TKT007', subject: 'Relatório de bug: filtro de data não funciona', requester: 'rui.g@example.com', status: 'closed', priority: 'high', createdAt: '2025-05-15 09:00', lastUpdate: '2025-05-17 15:30' },
];

export default function TicketManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'open', 'closed', 'pending'
  const [tickets, setTickets] = useState(mockTickets); // Estado para permitir atualização de status

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.requester.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || ticket.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleUpdateTicketStatus = (id: string, newStatus: 'open' | 'closed' | 'pending') => {
    setTickets(prevTickets =>
      prevTickets.map(ticket =>
        ticket.id === id ? { ...ticket, status: newStatus, lastUpdate: new Date().toLocaleString() } : ticket
      )
    );
    alert(`Ticket ${id} atualizado para status: ${newStatus}`); // Usando alert apenas para simulação de ação
  };

  const getStatusClasses = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800';
      case 'closed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityClasses = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <AdminLayout>
      <div className="animate-fadeInUp">
        <h1 className="text-2xl font-bold text-dark mb-6">Gerenciamento de Tickets</h1>
        <p className="text-gray-600 mb-8">Gerencie e acompanhe todos os tickets de suporte do sistema.</p>

        {/* Barra de pesquisa e filtros */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0 md:space-x-4">
          <div className="relative flex-1 w-full md:max-w-sm">
            <input
              type="text"
              placeholder="Pesquisar tickets por assunto ou solicitante..."
              className="pl-8 pr-3 py-2 border border-gray-300 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search size={16} className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <div className="flex space-x-2">
            <select
              className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary cursor-pointer"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">Todos os Status</option>
              <option value="open">Abertos</option>
              <option value="pending">Pendentes</option>
              <option value="closed">Fechados</option>
            </select>
            <button className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors duration-200">
              <PlusCircle size={16} className="mr-2" />
              <span>Novo Ticket</span>
            </button>
          </div>
        </div>

        {/* Lista de Tickets */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-dark mb-4">Tickets Atuais</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assunto</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Solicitante</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prioridade</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Última Atualização</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTickets.length > 0 ? (
                  filteredTickets.map(ticket => (
                    <tr key={ticket.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ticket.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{ticket.subject}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{ticket.requester}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(ticket.status)}`}>
                          {ticket.status === 'open' ? 'Aberto' : ticket.status === 'closed' ? 'Fechado' : 'Pendente'}
                        </span>
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${getPriorityClasses(ticket.priority)}`}>
                        {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.lastUpdate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-secondary hover:text-primary mr-3" onClick={() => alert(`Simulando resposta ao Ticket ${ticket.id}`)}>
                          <MessageSquare size={16} />
                        </button>
                        {ticket.status !== 'closed' ? (
                          <button className="text-green-600 hover:text-green-800" onClick={() => handleUpdateTicketStatus(ticket.id, 'closed')}>
                            <CheckCircle size={16} />
                          </button>
                        ) : (
                          <button className="text-tertiary hover:text-red-700" onClick={() => handleUpdateTicketStatus(ticket.id, 'open')}>
                            <XCircle size={16} />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 text-center text-gray-500">Nenhum ticket encontrado com os filtros aplicados.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
