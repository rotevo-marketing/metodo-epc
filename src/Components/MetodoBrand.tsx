import Link from "next/link";

type MetodoLogoProps = {
  href?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "dark" | "light";
};

type MetodoFooterProps = {
  description?: string;
};

function getLogoSize(size: MetodoLogoProps["size"] = "md") {
  if (size === "sm") return "h-10 w-auto";
  if (size === "lg") return "h-16 w-auto";
  return "h-12 w-auto";
}

export function MetodoLogo({
  href = "/",
  className = "",
  size = "md",
  variant = "dark",
}: MetodoLogoProps) {
  const src =
    variant === "light" ? "/brand/logo-light.png" : "/brand/logo-dark.png";

  const logo = (
    <img
      src={src}
      alt="Rotevo"
      className={`${getLogoSize(size)} object-contain ${className}`}
    />
  );

  if (!href) {
    return <div className="inline-flex items-center">{logo}</div>;
  }

  return (
    <Link href={href} className="inline-flex items-center">
      {logo}
    </Link>
  );
}

export function MetodoFooter({
  description = "Painel estratégico da Rotevo.",
}: MetodoFooterProps) {
  return (
    <footer className="mt-20 bg-black px-6 py-10 lg:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-4">
          <MetodoLogo href="/" size="md" variant="light" />
          <p className="max-w-xl text-sm leading-7 text-white/60">
            {description}
          </p>
        </div>

        <div className="space-y-2 text-sm text-white/50 lg:text-right">
          <p>contato@rotevo.com.br</p>
          <p>WhatsApp: (22) 98141-2223</p>
          <p>© 2026 Rotevo. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
