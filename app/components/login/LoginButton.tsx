interface LoginButtonProps {
  isSubmitting: boolean;
}

export function LoginButton({ isSubmitting }: LoginButtonProps) {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className={`w-full py-3 px-4 flex justify-center items-center gap-2
                  text-white font-semibold rounded-lg shadow-lg
                  transition-all duration-300 ease-in-out
                  font-poppins text-lg transform
                  ${isSubmitting
          ? "bg-gradient-to-r from-secondary/70 to-primary/70 cursor-not-allowed opacity-80" // Cores principais com opacidade
          : "bg-gradient-to-r from-secondary to-primary hover:from-primary hover:to-secondary hover:scale-105 active:scale-95" // Cores principais para normal e hover
        }
                  focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-opacity-50`}
    >
      {isSubmitting ? (
        <>
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Entrando...
        </>
      ) : (
        "Entrar"
      )}
    </button>
  );
}
