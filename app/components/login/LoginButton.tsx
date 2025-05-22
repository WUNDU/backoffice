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
                  text-lg transform
                  ${isSubmitting
          ? "bg-gray-400 cursor-not-allowed opacity-80"
          : "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-blue-500 hover:to-purple-500 hover:scale-105 active:scale-95"
        }
                  focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50`}
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
