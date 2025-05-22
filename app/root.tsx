import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
  useNavigate,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import React, { useEffect, useContext } from "react";

import "./tailwind.css";
import { AuthContext, RemixMocksProvider } from "./hook/remixMocksProvider";
import { checkAuthCookie } from "./hook/authMock";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <RemixMocksProvider>
          {children}
        </RemixMocksProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  // Este useEffect é responsável por gerir os redirecionamentos com base no estado de autenticação.
  useEffect(() => {
    const currentPath = location.pathname;
    // Verifica diretamente o status de autenticação do "cookie" (localStorage) para a decisão mais recente.
    const isAuthFromCookie = checkAuthCookie();

    console.log(`[root.tsx] Effect running: path=${currentPath}, isAuthenticated (context)=${isAuthenticated}, isAuthFromCookie=${isAuthFromCookie}`);

    // Cenário 1: O utilizador está autenticado (seja pelo contexto ou pelo cookie)
    if (isAuthenticated || isAuthFromCookie) {
      // Se ele está na página de login ou na raiz, redireciona para o dashboard
      if (currentPath === '/login' || currentPath === '/') {
        console.log(`[root.tsx] Authenticated, redirecting from ${currentPath} to /dashboard`);
        navigate('/dashboard', { replace: true }); // Usar replace para evitar adicionar ao histórico
      }
    }
    // Cenário 2: O utilizador NÃO está autenticado (nem pelo contexto nem pelo cookie)
    else {
      // Se ele está a tentar aceder a qualquer rota do dashboard, redireciona para o login
      if (currentPath.startsWith('/dashboard')) {
        console.log(`[root.tsx] Not authenticated, redirecting from ${currentPath} to /login`);
        navigate('/login', { replace: true }); // Usar replace para evitar adicionar ao histórico
      }
    }
  }, [isAuthenticated, location.pathname, navigate]); // Dependências para re-executar o efeito

  return <Outlet />;
}
