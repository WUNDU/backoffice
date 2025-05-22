// LoginScreen.tsx
import { useState, useEffect } from "react";
import { Form, useActionData, useAuth, useNavigation } from "~/hook/authMock";
import { AuthError } from "~/types/types";
import { Logo } from "./Logo";
import { InputField } from "./InputField";
import { LoginButton } from "./LoginButton";


export default function LoginScreen() {
  const { data: actionData } = useActionData<AuthError>();
  const navigation = useNavigation();
  const { isAuthenticated } = useAuth(); // Obter o status de autenticação
  const isSubmitting = navigation.state === "submitting";
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string | undefined>(undefined);
  const [passwordError, setPasswordError] = useState<string | undefined>(undefined);
  const [globalError, setGlobalError] = useState<string | undefined>(undefined);

  // Efeito para redirecionar se já estiver autenticado
  useEffect(() => {
    if (isAuthenticated) {
      console.log("Usuário já autenticado, redirecionando para o dashboard.");
      window.location.href = '/dashboard'; // Redireciona para o dashboard
    }
  }, [isAuthenticated]);

  // Efeito para lidar com erros retornados pela action
  useEffect(() => {
    setGlobalError(undefined);
    setEmailError(undefined);
    setPasswordError(undefined);

    if (actionData?.error) {
      setGlobalError(actionData.error);
      if (actionData.error.toLowerCase().includes("email") || actionData.error.toLowerCase().includes("credenciais")) {
        setEmailError("Email ou senha inválidos.");
        setPasswordError("Email ou senha inválidos.");
      } else if (actionData.error.toLowerCase().includes("senha")) {
        setPasswordError("Senha inválida.");
      } else {
        setEmailError(undefined);
        setPasswordError(undefined);
      }
    }
  }, [actionData]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-inter">
      {/* Lado esquerdo - Banner */}
      <div
        className="hidden md:flex md:w-1/2 bg-gradient-to-br from-primary to-secondary items-center justify-center p-12 relative overflow-hidden"
      >
        {/* Adiciona formas abstratas para um visual mais dinâmico */}
        <div className="absolute top-0 left-0 w-48 h-48 bg-light opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2 animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-light opacity-5 rounded-full translate-x-1/2 -translate-y-1/2 animate-blob animation-delay-2000"></div>

        <div className="max-w-md flex flex-col items-center text-center bg-dark/30 backdrop-blur-sm p-10 rounded-xl shadow-2xl border border-light/20 animate-fade-in-up">
          <Logo />
          <h2 className="text-4xl font-poppins font-extrabold mt-8 text-light leading-tight">
            Sistema Administrativo
          </h2>
          <p className="mt-4 text-light/90 text-lg font-light">
            Acesse e gerencie as informações internas com segurança e eficiência.
          </p>
        </div>
      </div>

      {/* Lado direito - Formulário de login */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 bg-light relative">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl border border-light/50 animate-fade-in-right">
          <div className="mb-8 text-center md:text-left">
            <div className="md:hidden mb-6 flex justify-center">
              <Logo small />
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold font-poppins text-dark leading-tight">
              Acesse o BackOffice
            </h1>
            <p className="mt-2 text-dark/80 text-lg">
              Faça login para administrar conteúdos e dados internos.
            </p>
          </div>

          {/* Mensagem de erro global */}
          {globalError && (
            <div className={`mb-6 p-4 bg-tertiary text-white rounded-lg shadow-xl animate-fade-in-down animate-shake`}>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p className="font-medium">{globalError}</p>
              </div>
            </div>
          )}

          <Form method="post" className="space-y-6">
            <InputField
              id="email"
              label="Email Corporativo"
              type="email"
              name="email"
              placeholder="seu@email.com"
              required
              hasError={!!emailError}
              errorMessage={emailError}
            />

            <InputField
              id="password"
              label="Senha"
              type="password"
              name="password"
              placeholder="••••••••"
              required
              hasError={!!passwordError}
              errorMessage={passwordError}
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-5 w-5 text-secondary border-gray-300 rounded focus:ring-secondary transition-colors duration-200 ease-in-out cursor-pointer"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-base text-dark/80 font-medium cursor-pointer"
                >
                  Manter minha sessão ativa
                </label>
              </div>
              <a
                href="/recuperar-senha"
                className="font-medium text-secondary hover:text-primary transition-colors duration-200 ease-in-out text-base"
              >
                Esqueceu sua senha?
              </a>
            </div>

            <LoginButton isSubmitting={isSubmitting} />
          </Form>

          <div className="mt-8 text-center text-sm text-dark/60 font-inter">
            <p className="mt-2">
              Problemas no acesso?{" "}
              <a
                href="/suporte"
                className="font-medium text-secondary hover:text-primary transition-colors duration-200 ease-in-out"
              >
                Contate o suporte técnico
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
