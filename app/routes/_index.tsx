// _index.tsx
import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node"; // Importa a função redirect do Remix

// A função loader é executada no servidor antes de o componente ser renderizado.
// eslint-disable-next-line no-empty-pattern
export async function loader({ }: LoaderFunctionArgs) {
  // Redireciona para a página de login.
  // Em um ambiente Remix real, a rota para o login seria algo como '/login'.
  // Se a sua página de login estiver em um caminho diferente, ajuste aqui.
  return redirect("/login");
}

export const meta: MetaFunction = () => {
  return [
    { title: "Redirecionando para Login..." }, // Título da página enquanto redireciona
    { name: "description", content: "Redirecionando para a página de login." },
  ];
};

// Este componente não será renderizado porque o loader já redireciona.
export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center bg-light text-dark">
      <p className="text-xl font-inter">Redirecionando para a página de login...</p>
    </div>
  );
}