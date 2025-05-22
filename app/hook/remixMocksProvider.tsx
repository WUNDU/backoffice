import React, { useState, createContext } from "react";
import { AuthError } from "~/types/auth";

// Contexto para o mock useActionData
export const ActionDataContext = createContext<{
  data: AuthError | undefined;
  setActionData: (newData: AuthError | undefined) => void;
}>({
  data: undefined,
  setActionData: () => { }
});

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

// Provedor para os mocks
export const RemixMocksProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [actionData, setActionData] = useState<AuthError | undefined>(undefined);
  const [navigationState, setNavigationState] = useState<"idle" | "submitting" | "loading">("idle");
  const [navigationFormMethod] = useState<string | undefined>(undefined);
  const [navigationFormData, setNavigationFormData] = useState<FormData | undefined>(undefined);

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
        {children}
      </NavigationContext.Provider>
    </ActionDataContext.Provider>
  );
};
