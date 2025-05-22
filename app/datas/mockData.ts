import { Bill, Budget, ChartData, Transaction, TransactionCategoryData} from "~/types/types";

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
