import { Bill, Budget, ChartData, Transaction, TransactionCategoryData } from "~/types/types";

export const balanceData: ChartData[] = [
  { month: 'Jan', saldo: 400000 },
  { month: 'Fev', saldo: 350000 },
  { month: 'Mar', saldo: 420000 },
  { month: 'Abr', saldo: 510000 },
  { month: 'Mai', saldo: 480000 },
  { month: 'Jun', saldo: 550000 },
  { month: 'Jul', saldo: 620000 }
];

export const expenseData: ChartData[] = [
  { month: 'Jan', despesa: 260000 },
  { month: 'Fev', despesa: 290000 },
  { month: 'Mar', despesa: 230000 },
  { month: 'Abr', despesa: 250000 },
  { month: 'Mai', despesa: 280000 },
  { month: 'Jun', despesa: 310000 },
  { month: 'Jul', despesa: 295000 }
];

export const incomeData: ChartData[] = [
  { month: 'Jan', receita: 320000 },
  { month: 'Fev', receita: 340000 },
  { month: 'Mar', receita: 310000 },
  { month: 'Abr', receita: 350000 },
  { month: 'Mai', receita: 380000 },
  { month: 'Jun', receita: 420000 },
  { month: 'Jul', receita: 410000 }
];

export const recentTransactions: Transaction[] = [
  { id: 1, description: 'Pagamento fornecedor ABC', category: 'Suprimentos', amount: -235670, date: '18/05/2025', type: 'expense' },
  { id: 2, description: 'Receita de vendas', category: 'Vendas', amount: 3500000, date: '12/05/2025', type: 'income' },
  { id: 3, description: 'Serviços TI', category: 'Tecnologia', amount: -39900, date: '10/05/2025', type: 'expense' },
  { id: 4, description: 'Transferência para reserva', category: 'Transferência', amount: -500000, date: '10/05/2025', type: 'transfer' },
  { id: 5, description: 'Pagamento cliente XYZ', category: 'Vendas', amount: 950000, date: '08/05/2025', type: 'income' },
  { id: 6, description: 'Salário Mensal', category: 'Salário', amount: 1500000, date: '05/05/2025', type: 'income' },
  { id: 7, description: 'Supermercado', category: 'Alimentação', amount: -85000, date: '03/05/2025', type: 'expense' },
  { id: 8, description: 'Conta de Luz', category: 'Contas', amount: -25000, date: '01/05/2025', type: 'expense' },
  { id: 9, description: 'Transporte Público', category: 'Transporte', amount: -12000, date: '29/04/2025', type: 'expense' },
  { id: 10, description: 'Freelance Projeto X', category: 'Serviços', amount: 700000, date: '25/04/2025', type: 'income' },
];

export const upcomingBills: Bill[] = [
  { id: 1, description: 'Aluguel escritório', amount: 1200000, dueDate: '25/05/2025', isPaid: false, isRecurring: true },
  { id: 2, description: 'Internet corporativa', amount: 99900, dueDate: '27/05/2025', isPaid: false, isRecurring: true },
  { id: 3, description: 'Energia elétrica', amount: 187450, dueDate: '30/05/2025', isPaid: false, isRecurring: true },
];

export const budgetProgress: Budget[] = [
  { id: 1, category: 'Marketing', budgeted: 800000, current: 450000, percentage: 56 },
  { id: 2, category: 'Infraestrutura', budgeted: 400000, current: 352000, percentage: 88 },
  { id: 3, category: 'Desenvolvimento', budgeted: 300000, current: 150000, percentage: 50 },
];

// Combine income and expense data for a single chart
export const incomeExpenseCombinedData = balanceData.map((balance, index) => ({
  month: balance.month,
  receita: incomeData[index]?.receita || 0,
  despesa: expenseData[index]?.despesa || 0,
}));

// Calculate transaction categories data from recentTransactions
const calculateTransactionCategories = (transactions: Transaction[]): TransactionCategoryData[] => {
  const categoriesMap: { [key: string]: number } = {};

  transactions.forEach(transaction => {
    const category = transaction.category;
    const absoluteAmount = Math.abs(transaction.amount); // Use absolute amount for category distribution

    if (categoriesMap[category]) {
      categoriesMap[category] += absoluteAmount;
    } else {
      categoriesMap[category] = absoluteAmount;
    }
  });

  // Assign colors to categories (you might want a more sophisticated color palette)
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
};

export const transactionCategoriesData: TransactionCategoryData[] = calculateTransactionCategories(recentTransactions);


// New mock data for detailed receipts
export const detailedReceipts: Transaction[] = [
  {
    id: 101,
    description: 'Salário Mensal - Maio',
    category: 'Salário',
    amount: 1500000,
    date: '05/05/2025',
    type: 'income',
    source: 'Emprego Principal',
    paymentMethod: 'Transferência Bancária',
    status: 'Concluído'
  },
  {
    id: 102,
    description: 'Pagamento Projeto Web - Cliente A',
    category: 'Serviços',
    amount: 750000,
    date: '28/04/2025',
    type: 'income',
    source: 'Freelance',
    paymentMethod: 'Transferência Bancária',
    status: 'Concluído'
  },
  {
    id: 103,
    description: 'Reembolso Despesas Viagem',
    category: 'Reembolso',
    amount: 120000,
    date: '20/04/2025',
    type: 'income',
    source: 'Empresa',
    paymentMethod: 'Dinheiro',
    status: 'Concluído'
  },
  {
    id: 104,
    description: 'Venda de Item Usado - OLX',
    category: 'Vendas',
    amount: 35000,
    date: '15/04/2025',
    type: 'income',
    source: 'Venda Pessoal',
    paymentMethod: 'MBWay',
    status: 'Concluído'
  },
  {
    id: 105,
    description: 'Dividendos de Ações',
    category: 'Investimento',
    amount: 250000,
    date: '10/04/2025',
    type: 'income',
    source: 'Carteira de Ações',
    paymentMethod: 'Transferência Bancária',
    status: 'Concluído'
  },
  {
    id: 106,
    description: 'Aluguel Imóvel',
    category: 'Aluguel',
    amount: 400000,
    date: '01/04/2025',
    type: 'income',
    source: 'Propriedade',
    paymentMethod: 'Transferência Bancária',
    status: 'Concluído'
  },
  {
    id: 107,
    description: 'Bónus Anual',
    category: 'Salário',
    amount: 500000,
    date: '20/03/2025',
    type: 'income',
    source: 'Emprego Principal',
    paymentMethod: 'Transferência Bancária',
    status: 'Concluído'
  },
  {
    id: 108,
    description: 'Pagamento Projeto Gráfico - Cliente B',
    category: 'Serviços',
    amount: 300000,
    date: '15/03/2025',
    type: 'income',
    source: 'Freelance',
    paymentMethod: 'Transferência Bancária',
    status: 'Pendente'
  },
];

// Calculate income source distribution for the pie chart
export const incomeSourceData: TransactionCategoryData[] = calculateTransactionCategories(
  detailedReceipts.filter(t => t.type === 'income')
);

// New mock data for detailed expenses
export const detailedExpenses: Transaction[] = [
  {
    id: 201,
    description: 'Aluguel Apartamento - Junho',
    category: 'Moradia',
    amount: -350000,
    date: '01/06/2025',
    type: 'expense',
    source: 'Conta Bancária',
    paymentMethod: 'Transferência Bancária',
    status: 'Pendente'
  },
  {
    id: 202,
    description: 'Supermercado - Pingo Doce',
    category: 'Alimentação',
    amount: -85500,
    date: '20/05/2025',
    type: 'expense',
    source: 'Cartão de Débito',
    paymentMethod: 'Cartão de Débito',
    status: 'Concluído'
  },
  {
    id: 203,
    description: 'Conta de Eletricidade - Maio',
    category: 'Contas de Casa',
    amount: -25000,
    date: '15/05/2025',
    type: 'expense',
    source: 'Débito Direto',
    paymentMethod: 'Débito Direto',
    status: 'Concluído'
  },
  {
    id: 204,
    description: 'Internet e TV - MEO',
    category: 'Contas de Casa',
    amount: -18000,
    date: '10/05/2025',
    type: 'expense',
    source: 'Débito Direto',
    paymentMethod: 'Débito Direto',
    status: 'Concluído'
  },
  {
    id: 205,
    description: 'Gasolina - Posto BP',
    category: 'Transporte',
    amount: -12000,
    date: '08/05/2025',
    type: 'expense',
    source: 'Cartão de Crédito',
    paymentMethod: 'Cartão de Crédito',
    status: 'Concluído'
  },
  {
    id: 206,
    description: 'Consulta Médica - Dr. Silva',
    category: 'Saúde',
    amount: -40000,
    date: '05/05/2025',
    type: 'expense',
    source: 'Dinheiro',
    paymentMethod: 'Dinheiro',
    status: 'Concluído'
  },
  {
    id: 207,
    description: 'Jantar Fora - Restaurante X',
    category: 'Lazer',
    amount: -28000,
    date: '03/05/2025',
    type: 'expense',
    source: 'Cartão de Débito',
    paymentMethod: 'Cartão de Débito',
    status: 'Concluído'
  },
  {
    id: 208,
    description: 'Mensalidade Ginásio',
    category: 'Lazer',
    amount: -15000,
    date: '01/05/2025',
    type: 'expense',
    source: 'Débito Direto',
    paymentMethod: 'Débito Direto',
    status: 'Concluído'
  },
  {
    id: 209,
    description: 'Reparação Automóvel',
    category: 'Transporte',
    amount: -75000,
    date: '25/04/2025',
    type: 'expense',
    source: 'Cartão de Crédito',
    paymentMethod: 'Cartão de Crédito',
    status: 'Concluído'
  },
  {
    id: 210,
    description: 'Assinatura Streaming - Netflix',
    category: 'Entretenimento',
    amount: -8000,
    date: '22/04/2025',
    type: 'expense',
    source: 'Cartão de Crédito',
    paymentMethod: 'Cartão de Crédito',
    status: 'Concluído'
  },
];

// Calculate expense category distribution for the pie chart
export const expenseCategoryData: TransactionCategoryData[] = calculateTransactionCategories(
  detailedExpenses.filter(t => t.type === 'expense')
);

// New mock data for annual financial performance (admin view)
export const annualFinancialPerformance: ChartData[] = [
  { month: 'Jan', receita: 3200000, despesa: 2600000, net: 600000 },
  { month: 'Fev', receita: 3400000, despesa: 2900000, net: 500000 },
  { month: 'Mar', receita: 3100000, despesa: 2300000, net: 800000 },
  { month: 'Abr', receita: 3500000, despesa: 2500000, net: 1000000 },
  { month: 'Mai', receita: 3800000, despesa: 2800000, net: 1000000 },
  { month: 'Jun', receita: 4200000, despesa: 3100000, net: 1100000 },
  { month: 'Jul', receita: 4100000, despesa: 2950000, net: 1150000 },
  { month: 'Ago', receita: 4300000, despesa: 3200000, net: 1100000 },
  { month: 'Set', receita: 4000000, despesa: 3000000, net: 1000000 },
  { month: 'Out', receita: 4500000, despesa: 3300000, net: 1200000 },
  { month: 'Nov', receita: 4700000, despesa: 3500000, net: 1200000 },
  { month: 'Dez', receita: 5000000, despesa: 3800000, net: 1200000 },
];

// Aggregated data for top categories/sources across all users (for admin reports)
export const topExpenseCategoriesReport: TransactionCategoryData[] = [
  { name: 'Moradia', value: 3500000, color: '#ef4444' },
  { name: 'Alimentação', value: 2500000, color: '#f97316' },
  { name: 'Contas de Casa', value: 1800000, color: '#eab308' },
  { name: 'Transporte', value: 1500000, color: '#8b5cf6' },
  { name: 'Lazer', value: 1000000, color: '#ec4899' },
  { name: 'Saúde', value: 800000, color: '#06b6d4' },
  { name: 'Educação', value: 600000, color: '#3b82f6' },
];

export const topIncomeSourcesReport: TransactionCategoryData[] = [
  { name: 'Salário', value: 15000000, color: '#22c55e' },
  { name: 'Freelance', value: 7000000, color: '#3b82f6' },
  { name: 'Investimento', value: 4000000, color: '#a855f7' },
  { name: 'Vendas', value: 2500000, color: '#f97316' },
  { name: 'Aluguel', value: 2000000, color: '#10b981' },
];

// New mock data for application settings
export interface ApplicationSettings {
  appName: string;
  defaultCurrency: string;
  defaultLanguage: 'pt-AO' | 'en-US';
  enableUserRegistration: boolean;
  requireAdminApprovalForNewUsers: boolean;
  enableGlobalNotifications: boolean;
  maintenanceMode: boolean;
  maintenanceMessage: string;
  dataRetentionDays: number;
  enableBankIntegration: boolean;
  enableBudgetingFeature: boolean;
  enableDebtManagementFeature: boolean;
}

export const appSettings: ApplicationSettings = {
  appName: 'Finanças Pessoais App',
  defaultCurrency: 'AOA',
  defaultLanguage: 'pt-AO',
  enableUserRegistration: true,
  requireAdminApprovalForNewUsers: false,
  enableGlobalNotifications: true,
  maintenanceMode: false,
  maintenanceMessage: 'O aplicativo está em manutenção. Voltaremos em breve!',
  dataRetentionDays: 365 * 5, // 5 years
  enableBankIntegration: true,
  enableBudgetingFeature: true,
  enableDebtManagementFeature: false,
};
