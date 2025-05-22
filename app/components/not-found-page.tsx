export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-light font-inter text-dark">
      <div className="text-center p-8 bg-white rounded-xl shadow-2xl border border-light/50 animate-fade-in-up">
        <h1 className="text-9xl font-extrabold text-primary font-poppins mb-4">404</h1>
        <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">Página Não Encontrada</h2>
        <p className="text-lg text-dark/80 mb-8">
          Ops! Parece que a página que você está procurando não existe.
        </p>
        <a
          href="/" // Link para a página inicial
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-lg text-white bg-gradient-to-r from-secondary to-primary hover:from-primary hover:to-accent transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          Voltar para a Página Inicial
        </a>
      </div>
    </div>
  );
}
