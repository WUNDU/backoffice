// RemixMocksProvider.tsx
import React, { useState, useEffect, createContext } from "react";
import { AuthError } from "~/types/auth";
import { checkAuthCookie } from "./authMock";


// Contexto para o mock useActionData
export const ActionDataContext = createContext<{
  data: AuthError | undefined;
  setActionData: (newData: AuthError | undefined) => void;
}>({ data: undefined, setActionData: () => { } });

// Contexto para o mock useNavigation
export const NavigationContext = createContext<{
  state: "idle" | "submitting" | "loading";
  formMethod: string | undefined;
  formData: FormData | undefined;
  setState: (newState: "idle" | "submitting" | "loading") => void;
  setFormData: (newFormData: FormData | undefined) => void;
}>({
  state: "idle",
  formMethod: undefined,
  formData: undefined,
  setState: () => { },
  setFormData: () => { },
});

// Novo Contexto para o status de autenticação
export const AuthContext = createContext<{
  isAuthenticated: boolean;
  setIsAuthenticated: (status: boolean) => void;
}>({
  isAuthenticated: false,
  setIsAuthenticated: () => { },
});


// Provedor para os mocks garantindo que compartilham o estado
export const RemixMocksProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [actionData, setActionData] = useState<AuthError | undefined>(undefined);
  const [navigationState, setNavigationState] = useState<"idle" | "submitting" | "loading">("idle");
  const [navigationFormMethod] = useState<string | undefined>(undefined);
  const [navigationFormData, setNavigationFormData] = useState<FormData | undefined>(undefined);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false); // Novo estado de autenticação

  // Verifica o status de autenticação ao carregar o provedor
  useEffect(() => {
    setIsAuthenticated(checkAuthCookie());
  }, []);

  // Este useEffect no mock não é estritamente necessário se o componente Form
  // redefinir corretamente o estado, mas pode atuar como um fallback.
  useEffect(() => {
    if (navigationState === "submitting") {
      // console.log("Navigation state is submitting..."); // Removido para segurança
      // Simula um timeout se a ação não definir explicitamente idle
      const timer = setTimeout(() => {
        // console.log("Navigation state auto-reset to idle after 2s (mock fallback)"); // Removido para segurança
        // setNavigationState("idle"); // Isso pode entrar em conflito se o Form também definir idle
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [navigationState]);

  return (
    <ActionDataContext.Provider value={{ data: actionData, setActionData }}>
      <NavigationContext.Provider
        value={{
          state: navigationState,
          formMethod: navigationFormMethod,
          formData: navigationFormData,
          setState: setNavigationState,
          setFormData: setNavigationFormData,
        }}
      >
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
          {children}
        </AuthContext.Provider>
      </NavigationContext.Provider>
    </ActionDataContext.Provider>
  );
};
