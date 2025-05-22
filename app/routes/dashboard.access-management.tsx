// AccessManagementPage.tsx
import { Users, ShieldCheck, UserPlus, Edit, Trash2, Search, PlusCircle } from 'lucide-react';
import { useState } from 'react';
import { AdminLayout } from '~/components/dashboard/AdminLayout'; // Ajuste o caminho conforme necessário
import { mockRoles, mockUsers } from '~/datas/mockData';


export default function AccessManagementPage() {
  const [activeTab, setActiveTab] = useState('users'); // 'users' ou 'roles'
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState(mockUsers); // Estado para permitir edição/remoção de usuários
  const [roles, setRoles] = useState(mockRoles); // Estado para permitir edição/remoção de papéis

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mockRoles.find(role => role.id === user.roleId)?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Funções de exemplo para CRUD (apenas simulação)
  const handleDeleteUser = (id: string) => {
    if (window.confirm('Tem certeza que deseja remover este usuário?')) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  const handleDeleteRole = (id: string) => {
    if (window.confirm('Tem certeza que deseja remover este papel? Isso pode afetar usuários associados.')) {
      setRoles(roles.filter(role => role.id !== id));
    }
  };

  return (
    <AdminLayout>
      <div className="animate-fadeInUp">
        <h1 className="text-2xl font-bold text-dark mb-6">Gerenciamento de Acesso</h1>
        <p className="text-gray-600 mb-8">Controle baseado em papéis (RBAC) para gerenciar permissões de usuários e papéis.</p>

        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`px-4 py-2 text-sm font-medium ${activeTab === 'users' ? 'border-b-2 border-primary text-primary' : 'text-gray-600 hover:text-gray-800'}`}
            onClick={() => setActiveTab('users')}
          >
            <Users size={16} className="inline-block mr-2" /> Usuários
          </button>
          <button
            className={`ml-4 px-4 py-2 text-sm font-medium ${activeTab === 'roles' ? 'border-b-2 border-primary text-primary' : 'text-gray-600 hover:text-gray-800'}`}
            onClick={() => setActiveTab('roles')}
          >
            <ShieldCheck size={16} className="inline-block mr-2" /> Papéis
          </button>
        </div>

        {/* Barra de pesquisa e botões de ação */}
        <div className="flex justify-between items-center mb-6">
          <div className="relative flex-1 max-w-sm">
            <input
              type="text"
              placeholder={`Pesquisar ${activeTab === 'users' ? 'usuários' : 'papéis'}...`}
              className="pl-8 pr-3 py-2 border border-gray-300 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search size={16} className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <button className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors duration-200">
            {activeTab === 'users' ? <UserPlus size={16} className="mr-2" /> : <PlusCircle size={16} className="mr-2" />}
            <span>{activeTab === 'users' ? 'Adicionar Usuário' : 'Adicionar Papel'}</span>
          </button>
        </div>

        {/* Conteúdo da aba de Usuários */}
        {activeTab === 'users' && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-dark mb-4">Lista de Usuários</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Papel</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map(user => (
                      <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {mockRoles.find(role => role.id === user.roleId)?.name || 'Desconhecido'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                            ${user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                          `}>
                            {user.status === 'active' ? 'Ativo' : 'Inativo'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-primary hover:text-secondary mr-3"><Edit size={16} /></button>
                          <button onClick={() => handleDeleteUser(user.id)} className="text-tertiary hover:text-red-700"><Trash2 size={16} /></button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-4 text-center text-gray-500">Nenhum usuário encontrado.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Conteúdo da aba de Papéis */}
        {activeTab === 'roles' && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-dark mb-4">Lista de Papéis</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome do Papel</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Permissões (Exemplo)</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredRoles.length > 0 ? (
                    filteredRoles.map(role => (
                      <tr key={role.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{role.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{role.description}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          <span className="inline-block bg-gray-100 rounded-full px-2 py-1 text-xs font-medium text-gray-700">
                            {role.permissions.join(', ')}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-primary hover:text-secondary mr-3"><Edit size={16} /></button>
                          <button onClick={() => handleDeleteRole(role.id)} className="text-tertiary hover:text-red-700"><Trash2 size={16} /></button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-6 py-4 text-center text-gray-500">Nenhum papel encontrado.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
