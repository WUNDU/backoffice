interface LogoProps {
  small?: boolean;
}

export function Logo({ small = false }: LogoProps) {
  return (
    <div className="flex items-center">
      {/* Logo personalizado */}
      <div className="flex items-center justify-center">
        <img
          src="assets/images/logo-light.png"
          alt="FinanceTracker Logo"
          width={small ? 60 : 98}
          height={small ? 60 : 98}
          className="rounded-xl"
        />
      </div>
      <span className={`ml-2 font-bold font-poppins ${small ? 'text-xl text-dark' : 'text-2xl text-white'}`}>
        One<span className="text-accent">Wundu</span>
      </span>
    </div>
  );
}