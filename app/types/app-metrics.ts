import React from 'react';

// Tipos para itens do menu da Sidebar
export interface SubmenuItem {
  to: string;
  label: string;
  isActive: boolean;
}

export interface MenuItem {
  to: string;
  icon: React.ElementType;
  label: string;
  submenuKey?: string;
  submenuItems?: SubmenuItem[];
}

// Tipos para os cards de estatísticas gerais
export interface MetricCardProps {
  title: string;
  value: number | string; // Pode ser número de usuários, tempo, etc.
  icon: React.ElementType;
  trend?: boolean; // Se há uma tendência de crescimento/queda
  percentage?: number; // Percentual da tendência
  color?: 'primary' | 'success' | 'danger' | 'info'; // Para indicar status ou tipo
  unit?: string; // Por exemplo, 'usuários', 'ms', '%'
}

// Tipos para dados de gráficos
export interface ChartDataPoint {
  label: string; // Ex: 'Jan', '2024-05-15'
  [key: string]: number | string; // Propriedades dinâmicas para os valores do gráfico
}

export interface ChartPanelProps {
  title: string;
  chartData: ChartDataPoint[];
  dataKeys: string[]; // Chaves dos dados a serem exibidos no gráfico (ex: ['users', 'new_users'])
  colors: string[]; // Cores para cada linha/barra do gráfico
  unit?: string; // Unidade do eixo Y (ex: 'usuários', 'ms')
  tooltipFormatter?: (value: number | string) => string; // Função para formatar o tooltip
}

// Tipos para eventos/logs recentes
export interface AppEvent {
  id: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'critical';
  timestamp: string;
  source: string;
}

// Tipos para alertas críticos
export interface CriticalAlert {
  id: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  lastOccurrence: string;
  status: 'active' | 'resolved';
}

// Tipos para progresso de funcionalidades/recursos
export interface FeatureProgress {
  id: string;
  featureName: string;
  currentValue: number;
  targetValue: number;
  percentage: number;
}