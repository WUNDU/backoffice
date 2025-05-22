// Dados simulados para a visão geral (KPIs)
export const kpiData = {
  totalUsers: 5248,
  newUsers: {
    today: 18,
    week: 124,
    month: 432
  },
  transactions: {
    today: 156,
    week: 1245,
    month: 5673
  },
  activeUsers: {
    daily: 1879,
    weekly: 3456,
    monthly: 4750
  },
  supportTickets: 37,
  securityAlerts: 5
};

// Dados para gráfico de crescimento de usuários
export const userGrowthData = [
  { month: 'Jan', users: 3400 },
  { month: 'Fev', users: 3650 },
  { month: 'Mar', users: 3900 },
  { month: 'Abr', users: 4300 },
  { month: 'Mai', users: 4750 },
  { month: 'Jun', users: 5100 },
  { month: 'Jul', users: 5248 }
];

// Dados simulados para distribuição geográfica
export const geoDistributionData = [
  { region: 'Luanda', users: 2560 },
  { region: 'Benguela', users: 780 },
  { region: 'Huambo', users: 540 },
  { region: 'Lubango', users: 410 },
  { region: 'Outras', users: 958 }
];