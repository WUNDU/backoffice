// AuthMocks.tsx
import React, { useContext } from "react";
// Importa tipos
// Importa contextos
import { AuthError, User } from "~/types/types.js";
import { ActionDataContext, AuthContext, NavigationContext } from "./remixMocksProvider";

// Chave para o localStorage
const AUTH_TOKEN_KEY = 'auth_token';
const AUTH_EXPIRY_KEY = 'auth_expiry';

/**
 * Define um token de autenticação e sua validade no localStorage.
 * @param userId O ID do usuário autenticado.
 * @param expiryMinutes O número de minutos que o token será válido.
 */
export const setAuthCookie = (userId: string, expiryMinutes: number = 60) => {
  const now = new Date();
  const expiryTime = now.getTime() + expiryMinutes * 60 * 1000; // Converte minutos para milissegundos
  localStorage.setItem(AUTH_TOKEN_KEY, userId);
  localStorage.setItem(AUTH_EXPIRY_KEY, expiryTime.toString());
  console.log(`Cookie de autenticação definido para ${userId}, válido até ${new Date(expiryTime).toLocaleString()}`);
};

/**
 * Limpa o token de autenticação do localStorage.
 */
export const clearAuthCookie = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_EXPIRY_KEY);
  console.log("Cookie de autenticação limpo.");
};

/**
 * Verifica se um token de autenticação válido existe no localStorage.
 * @returns true se o token for válido, false caso contrário.
 */
export const checkAuthCookie = (): boolean => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  const expiry = localStorage.getItem(AUTH_EXPIRY_KEY);

  if (!token || !expiry) {
    return false;
  }

  const expiryTime = parseInt(expiry, 10);
  const now = new Date().getTime();

  if (now > expiryTime) {
    clearAuthCookie(); // O token expirou, limpa-o
    return false;
  }
  return true;
};


/**
 * MOCK: Simula o hook `useActionData` do Remix.
 * Retorna os dados da ação e uma função para atualizá-los.
 */
export const useActionData = <T = AuthError>() => {
  return useContext(ActionDataContext) as { data: T | undefined; setActionData: (newData: T | undefined) => void };
};

/**
 * MOCK: Simula o hook `useNavigation` do Remix.
 * Retorna o estado de navegação e funções para atualizá-lo.
 */
export const useNavigation = () => {
  return useContext(NavigationContext);
};

/**
 * MOCK: Simula o hook `useAuth` para obter o status de autenticação.
 */
export const useAuth = () => {
  return useContext(AuthContext);
};

/**
 * MOCK: Simula a função de autenticação de usuário.
 * @param email - O email do usuário.
 * @param password - A senha do usuário.
 * @returns Um objeto User em caso de sucesso, ou null em caso de falha.
 */
export async function authenticateUser(email: string, password: string): Promise<User | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (email === "test@example.com" && password === "password123") {
        resolve({ id: "123", email: "test@example.com", name: "Test User", role: "user" });
      } else {
        resolve(null);
      }
    }, 1500); // Simula um atraso de rede
  });
}

/**
 * MOCK: Simula a função de redirecionamento do Remix.
 * @param path - O caminho para o qual redirecionar.
 * @returns Um objeto Response simulado para redirecionamento.
 */
export const redirect = (path: string) => {
  // Em um ambiente Remix, isso seria um objeto Response
  return new Response(null, { status: 302, headers: { Location: path } });
};

/**
 * MOCK: Simula a função `action` do Remix.
 * Processa os dados do formulário e tenta autenticar o usuário.
 * Agora retorna um Response em caso de sucesso, ou AuthError em caso de falha.
 */
export async function mockAction(formData: FormData): Promise<AuthError | Response> {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    return { error: "Por favor, preencha todos os campos" };
  }

  try {
    const user = await authenticateUser(email, password);
    if (!user) {
      return { error: "Credenciais inválidas" };
    }
    // Define o cookie de autenticação antes de redirecionar
    setAuthCookie(user.id, 60); // Define validade de 60 minutos
    return redirect("/dashboard");
  } catch (error) {
    return { error: "Erro ao fazer login. Tente novamente." };
  }
}

/**
 * MOCK: Função para simular o logout.
 */
export const logoutUser = () => {
  clearAuthCookie();
  window.location.href = '/'; // Redireciona para a página de login após o logout
};


/**
 * MOCK: Simula o componente `Form` do Remix.
 * Lida com a submissão do formulário e interage com os mocks de navegação e dados da ação.
 */
export const Form: React.FC<{ children: React.ReactNode; method: string; className?: string }> = ({
  children,
  method,
  className,
}) => {
  const { setState: setNavigationState, setFormData: setNavigationFormData } = useNavigation();
  const { setActionData } = useActionData();
  const { setIsAuthenticated } = useAuth(); // Obter setIsAuthenticated do contexto

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Limpar erros anteriores
    setActionData(undefined);

    const formData = new FormData(event.currentTarget);

    setNavigationState("submitting");
    setNavigationFormData(formData);

    try {
      const result = await mockAction(formData);

      if (result instanceof Response) {
        // Se for um Response, significa sucesso e já definimos o cookie
        const location = result.headers.get("Location") || "/dashboard";
        console.log("Login bem-sucedido! Redirecionando para:", location);
        setIsAuthenticated(true); // Atualiza o estado de autenticação no contexto
        window.location.href = location; // Tenta o redirecionamento
      } else {
        // Se for um erro, define os dados da ação para exibir a mensagem de erro
        setActionData(result);
        console.log("Erro de login:", result);
        setIsAuthenticated(false); // Garante que o estado de autenticação é falso
      }
    } catch (error) {
      setActionData({ error: "Erro inesperado na submissão do formulário." });
      setIsAuthenticated(false);
    } finally {
      setNavigationState("idle");
    }
  };

  return (
    <form method={method} className={className} onSubmit={handleSubmit}>
      {children}
    </form>
  );
};
