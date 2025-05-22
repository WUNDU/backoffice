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
import "./tailwind.css"; // Importa o seu arquivo Tailwind CSS
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
  // Se você tiver outros links de folha de estilo, adicione-os aqui
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        {/* Os estilos Tailwind CSS são agora carregados através do import "./tailwind.css" acima */}
        {/* e processados pelo seu pipeline de build do Remix/Tailwind. */}
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
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    // Initial check for authentication status on component mount
    setIsAuthenticated(checkAuthCookie());
  }, [setIsAuthenticated]);

  useEffect(() => {
    // Logic to handle redirects based on authentication status
    if (isAuthenticated) {
      // If authenticated and trying to access login or root, redirect to dashboard
      if (location.pathname === '/' || location.pathname === '/login') {
        console.log("Authenticated, redirecting from login/root to /dashboard");
        navigate('/dashboard');
      }
    } else {
      // If NOT authenticated and trying to access any dashboard route, redirect to login
      if (location.pathname.startsWith('/dashboard')) {
        console.log("Not authenticated, redirecting from dashboard route to /login");
        navigate('/login');
      }
    }
  }, [isAuthenticated, location.pathname, navigate]);

  // Render Outlet, which will render the specific route component (e.g., login.tsx, dashboard.tsx)
  // The content of the specific route component will then be responsible for rendering AdminLayout if needed.
  return <Outlet />;
}
