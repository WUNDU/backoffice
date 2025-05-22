import { useState } from 'react';
import { Filter, Search, Download, Plus, ChevronDown } from 'lucide-react';
import { AdminLayout } from '~/components/dashboard/AdminLayout';
import { recentTransactions } from '~/datas/mockData';

export function FinanceIncomePage() {
  const [filter, setFilter] = useState('Todos');

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Gestão de Receitas</h1>
          <p className="text-gray-600 mt-1">Controle e análise de entradas financeiras</p>
        </div>

        <div className="mt-4 md:mt-0 flex space-x-3">
          <button className="flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200">
            <Download size={16} className="mr-2" />
            <span>Exportar</span>
          </button>

          <button className="flex items-center justify-center px-4 py-2 bg-secondary text-white rounded-lg hover:bg-primary transition-colors duration-200">
            <Plus size={16} className="mr-2" />
            <span>Nova Receita</span>
          </button>
        </div>
      </div>

      {/* Filtros e Busca */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
          <div className="relative flex-1 mb-4 md:mb-0">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar receitas..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary"
            />
          </div>

          <div className="flex space-x-3">
            <div className="relative">
              <select
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary cursor-pointer"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="Todos">Todas categorias</option>
                <option value="Vendas">Vendas</option>
                <option value="Serviços">Serviços</option>
                <option value="Investimentos">Investimentos</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
            </div>

            <button className="flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200">
              <Filter size={16} className="mr-2" />
              <span>Filtros</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabela de Receitas */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Descrição
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categoria
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valor
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentTransactions
                .filter(t => t.type === 'income')
                .map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{transaction.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{transaction.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{transaction.date}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-green-600">
                        {new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(transaction.amount)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-secondary hover:text-primary mr-3">Editar</button>
                      <button className="text-red-600 hover:text-red-900">Excluir</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Paginação */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Exibindo <span className="font-medium">1</span> a <span className="font-medium">2</span> de <span className="font-medium">2</span> resultados
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <a
                  href="a"
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Anterior</span>
                  {/* Replace with icon */}
                  &lt;
                </a>
                <a
                  href="a"
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-secondary text-sm font-medium text-white hover:bg-primary"
                >
                  1
                </a>
                <a
                  href="a"
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Próximo</span>
                  {/* Replace with icon */}
                  &gt;
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}