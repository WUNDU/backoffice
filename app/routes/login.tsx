import { useState } from "react";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import type { ActionFunction } from "@remix-run/node";
import { AuthError } from "~/types/auth";
import { authenticateUser } from "~/datas/auth.server";
import { Logo } from "~/components/login/Logo";
import { InputField } from "~/components/login/InputField";
import { LoginButton } from "~/components/login/LoginButton";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    return json<AuthError>(
      { error: "Por favor, preencha todos os campos" },
      { status: 400 }
    );
  }

  try {
    const user = await authenticateUser(email, password);
    if (!user) {
      return json<AuthError>(
        { error: "Credenciais inválidas" },
        { status: 401 }
      );
    }

    // Cria uma nova sessão e redireciona para o dashboard
    return redirect("/dashboard");
  } catch (error) {
    return json<AuthError>(
      { error: "Erro ao fazer login. Tente novamente." },
      { status: 500 }
    );
  }
};

export default function Login() {
  const actionData = useActionData<AuthError>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Lado esquerdo - Banner */}
      <div className="hidden md:flex md:w-1/2 bg-primary items-center justify-center p-12">
        <div className="max-w-md flex flex-col items-center text-center">
          <Logo />
          <h2 className="text-3xl font-poppins font-bold mt-8 text-white">
            Controle Financeiro Inteligente
          </h2>
          <p className="mt-4 text-light/80 font-inter">
            Categorize suas transações, acompanhe seus gastos e receba insights personalizados para melhorar sua saúde financeira.
          </p>
          <div className="mt-10 bg-white/10 p-6 rounded-lg">
            <p className="text-white font-medium font-poppins">&quot;Economizei mais de 30% nas minhas despesas mensais depois que comecei a usar este aplicativo.&quot;</p>
            <p className="mt-2 text-light/70 text-sm">Carlos Santos, usuário desde 2023</p>
          </div>
        </div>
      </div>

      {/* Lado direito - Formulário de login */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 bg-light">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center md:text-left">
            <div className="md:hidden mb-6">
              <Logo small />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold font-poppins text-dark">
              Acesse sua conta
            </h1>
            <p className="mt-2 text-gray-600 font-inter">
              Entre para gerenciar suas finanças e acompanhar seus progressos
            </p>
          </div>

          {actionData?.error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
              {actionData.error}
            </div>
          )}

          <Form method="post" className="space-y-6">
            <InputField
              id="email"
              label="Email"
              type="email"
              name="email"
              placeholder="seu@email.com"
              required
            />

            <InputField
              id="password"
              label="Senha"
              type="password"
              name="password"
              placeholder="••••••••"
              required
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-secondary border-gray-300 rounded focus:ring-secondary"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700 font-inter"
                >
                  Lembrar-me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="/recuperar-senha"
                  className="font-medium text-secondary hover:text-primary transition-colors"
                >
                  Esqueceu a senha?
                </a>
              </div>
            </div>

            <LoginButton isSubmitting={isSubmitting} />
          </Form>

          <div className="mt-8 text-center text-sm text-gray-600 font-inter">
            <p>
              Não tem uma conta?{" "}
              <a
                href="/cadastro"
                className="font-medium text-secondary hover:text-primary transition-colors"
              >
                Cadastre-se agora
              </a>
            </p>
            <p className="mt-2">
              Precisa de ajuda?{" "}
              <a
                href="/suporte"
                className="font-medium text-secondary hover:text-primary transition-colors"
              >
                Contate o suporte
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}