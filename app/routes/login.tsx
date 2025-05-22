// Importa o provedor de mocks
import Login from "~/pages/Login";
import { RemixMocksProvider } from "~/hook/remixMocksProvider";

export default function LoginScreen() {
  // O componente deve retornar o JSX que deseja renderizar
  return (
    <RemixMocksProvider>
      <Login />
    </RemixMocksProvider>
  );
}
