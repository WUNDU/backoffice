interface LoginButtonProps {
  isSubmitting: boolean;
}

export function LoginButton({ isSubmitting }: LoginButtonProps) {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className={`w-full py-3 px-4 flex justify-center items-center
                  text-white font-medium rounded-md shadow-md 
                  transition-all duration-200 ease-in-out
                  font-poppins text-base
                  ${isSubmitting
          ? "bg-secondary/70 cursor-not-allowed"
          : "bg-secondary hover:bg-primary"}`}
    >
      {isSubmitting ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Entrando...
        </>
      ) : (
        "Entrar"
      )}
    </button>
  );
}