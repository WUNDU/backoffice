export interface AuthError {
  error?: string;
  success?: boolean; // Adicionado para permitir a propriedade 'success'
}

export interface LoginFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface Session {
  id: string;
  userId: string;
  expiresAt: Date;
  createdAt: Date;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "manager" | "user";
}

export interface UserWithPermissions extends User {
  permissions: string[];
}

export type ActionData = { error: string } | { success: boolean };