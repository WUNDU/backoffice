import { useContext } from "react";
import { AuthError, User } from "~/types/auth";
import { ActionDataContext, NavigationContext } from "./remixMocksProvider";

export const useActionData = <T = AuthError>() => {
  return useContext(ActionDataContext) as {
    data: T | undefined;
    setActionData: (newData: T | undefined) => void
  };
};

export const useNavigation = () => {
  return useContext(NavigationContext);
};


/**
 * MOCK: Simula a função de autenticação de usuário.
 */
export async function authenticateUser(email: string, password: string): Promise<User | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (email === "test@example.com" && password === "password123") {
        resolve({ id: "123", email: "test@example.com", name: "Test User", role: "user" });
      } else {
        resolve(null);
      }
    }, 1000); // Reduzido para 1 segundo
  });
}

/**
 * MOCK: Simula a função de redirecionamento do Remix.
 */
export const redirect = (path: string) => {
  return new Response(null, { status: 302, headers: { Location: path } });
};

/**
 * MOCK: Simula a função `action` do Remix.
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
    return redirect("/dashboard");
  } catch (error) {
    return { error: "Erro ao fazer login. Tente novamente." };
  }
}