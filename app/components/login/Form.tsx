import { mockAction, useActionData, useNavigation } from "~/hook/authMock";

export const Form: React.FC<{
  children: React.ReactNode;
  method: string;
  className?: string;
}> = ({ children, method, className }) => {
  const { setState: setNavigationState, setFormData: setNavigationFormData } = useNavigation();
  const { setActionData } = useActionData();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Limpar erros anteriores
    setActionData(undefined);

    const formData = new FormData(event.currentTarget);

    setNavigationState("submitting");
    setNavigationFormData(formData);

    try {
      const result = await mockAction(formData);

      if (result instanceof Response) {
        // Simular redirecionamento em caso de sucesso
        window.location.href = result.headers.get("Location") || "/dashboard";
      } else {
        // Definir dados de erro
        setActionData(result);
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