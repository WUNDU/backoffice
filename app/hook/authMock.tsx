// AuthMocks.tsx

import { useContext } from "react";
import { AuthError, User } from "~/types/auth";
import { ActionDataContext, NavigationContext } from "./remixMocksProvider";

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
 * Agora retorna { success: true } em caso de sucesso, ou { error: "..." } em caso de falha.
 */
export async function mockAction(formData: FormData): Promise<AuthError | { success: boolean }> {
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
    // Em vez de redirecionar, retorna um objeto de sucesso para o componente React
    return { success: true };
  } catch (error) {
    return { error: "Erro ao fazer login. Tente novamente." };
  }
}

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Limpar erros ou mensagens de sucesso anteriores
    setActionData(undefined);

    const formData = new FormData(event.currentTarget);

    setNavigationState("submitting");
    setNavigationFormData(formData);

    try {
      const result = await mockAction(formData);

      if ('success' in result && result.success) {
        // Se for sucesso, define actionData com a propriedade success
        setActionData({ success: true });
      } else if ('error' in result) {
        // Se for erro, define actionData com a propriedade error
        setActionData({ error: result.error });
      }
    } catch (error) {
      setActionData({ error: "Erro inesperado na submissão do formulário." });
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
