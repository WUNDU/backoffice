// ProtectedRoute.tsx
import React, { useEffect } from 'react';
import { useLocation } from '@remix-run/react'; // Importa useLocation para obter o caminho atual
import { useAuth } from '~/hook/authMock';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth(); // Obtém o estado de autenticação
  const location = useLocation(); // Obtém a localização atual

  useEffect(() => {
    // Verifica o status de autenticação. Se não estiver autenticado, redireciona para a página de login.
    // O `location.pathname` é adicionado como dependência para re-verificar a autenticação
    // caso o utilizador mude de rota manualmente após o logout.
    if (!isAuthenticated) {
      console.log('ProtectedRoute: Não autenticado, redirecionando para o login.');
      window.location.href = '/'; // Redireciona para a página de login
    }
  }, [isAuthenticated, location.pathname]); // Dependências: isAuthenticated e o caminho da URL

  // Se não estiver autenticado, não renderiza nada (ou um spinner) enquanto o redirecionamento ocorre.
  if (!isAuthenticated) {
    return null;
  }

  // Se estiver autenticado, renderiza os componentes filhos.
  return <>{children}</>;
};
