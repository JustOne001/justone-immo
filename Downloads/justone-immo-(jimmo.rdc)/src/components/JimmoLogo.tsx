import React from "react";

interface JimmoLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showTagline?: boolean;
  variant?: "light" | "dark" | "full";
}

export const JimmoLogo: React.FC<JimmoLogoProps> = ({
  className = "",
  size = "md",
  showTagline = true,
  variant = "full",
}) => {
  // Scale dimensions
  const heights = {
    sm: "h-8",
    md: "h-11",
    lg: "h-14",
    xl: "h-20",
  };

  // Color palette depending on variant
  const colors =
    variant === "light"
      ? {
          primary: "#ffffff",
          primaryDark: "#e6eef8",
          accent: "#ffffff",
          subtitle: "#cbd5e1",
        }
      : variant === "dark"
      ? {
          primary: "#0369a1",
          primaryDark: "#0284c7",
          accent: "#0ea5e9",
          subtitle: "#94a3b8",
        }
      : {
          primary: "#0284c7",
          primaryDark: "#0369a1",
          accent: "#0ea5e9",
          subtitle: "#94a3b8",
        };

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`} id="jimmo-brand-logo" role="img" aria-label="Justone Immo logo">
      <svg
        viewBox="0 0 540 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${heights[size]} w-auto aspect-[540/280] drop-shadow-sm`}
        aria-label="Justone Immo (Jimmo.rdc) Logo"
      >
        <defs>
          <linearGradient id="jimmoPrimaryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.primary} />
              <stop offset="50%" stopColor={colors.primaryDark} />
              <stop offset="100%" stopColor={colors.primaryDark} />
          </linearGradient>
          <linearGradient id="jimmoBlueGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={colors.accent} />
              <stop offset="100%" stopColor={colors.accent} />
          </linearGradient>
        </defs>

        {/* 1. House Roof, Chimney & Attic Window */}
        {/* Chimney */}
        <path d="M170 85 V45 H186 V98" stroke={colors.primary} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />

        {/* Roof Triangles & Eaves */}
        <path d="M20 152 L125 38 L230 152" stroke={colors.primaryDark} strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />

        {/* House Walls Outline */}
        <path d="M52 148 V270 H105" stroke={colors.primaryDark} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M198 270 H198 V168" stroke={colors.primaryDark} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />

        {/* Round Attic Window with Cross */}
        <circle cx="125" cy="112" r="19" stroke={colors.primary} strokeWidth="8" fill="none" />
        <line x1="125" y1="93" x2="125" y2="131" stroke={colors.primary} strokeWidth="6" strokeLinecap="round" />
        <line x1="106" y1="112" x2="144" y2="112" stroke={colors.primary} strokeWidth="6" strokeLinecap="round" />

        {/* 2. Signature Elegant Sweeping 'J' Monogram forming the Doorway */}
        {/* The Starting Ball Dot of J */}
        <circle cx="62" cy="225" r="19" fill={colors.primary} />

        {/* The fluid curved arch of 'J' rising up into the house door and dropping down */}
        <path d="M62 225 C62 250 82 262 108 262 C135 262 142 245 142 205 L142 165 C142 135 158 120 182 120 C206 120 208 140 208 175 L208 262" stroke={colors.primary} strokeWidth="24" strokeLinecap="round" fill="none" />

        {/* Door Knob inside the Doorway */}
        <circle cx="166" cy="192" r="12" fill={colors.primary} />

        {/* 3. The Bold Modern "immo" Wordmark */}
        {/* Letter 'i' */}
        {/* Dot of 'i' */}
        <circle cx="258" cy="162" r="11" fill={colors.primary} />
        {/* Stem of 'i' */}
        <rect x="247" y="186" width="22" height="76" rx="6" fill={colors.primary} />

        {/* Letter First 'm' */}
        <path d="M285 262 V186 H304 C314 186 322 191 327 199 C333 191 342 186 352 186 C368 186 376 197 376 215 V262 H356 V218 C356 208 352 204 344 204 C336 204 331 209 331 218 V262 H311 V218 C311 208 307 204 299 204 C292 204 287 209 287 218 V262 H267" fill={colors.primary} />

        {/* Letter Second 'm' */}
        <path d="M388 262 V186 H407 C417 186 425 191 430 199 C436 191 445 186 455 186 C471 186 479 197 479 215 V262 H459 V218 C459 208 455 204 447 204 C439 204 434 209 434 218 V262 H414 V218 C414 208 410 204 402 204 C395 204 390 209 390 218 V262 H370" fill={colors.primary} />

        {/* Letter 'o' */}
        <circle cx="504" cy="224" r="38" stroke={colors.primary} strokeWidth="20" fill="none" />

        {/* 4. Subtitle "GESTION IMMOBILIÈRE" */}
        <text x="355" y="290" textAnchor="middle" fill={colors.accent} fontSize="22" fontWeight="700" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="7">
          GESTION IMMOBILIÈRE
        </text>
      </svg>

      {showTagline && (
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-1.5">
            <span className={`text-base sm:text-lg font-black tracking-tight`} style={{ color: variant === 'light' ? '#ffffff' : '#ffffff' }}>
              Justone Immo
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-800/20 text-emerald-300 border border-emerald-500/20">
              Jimmo.rdc
            </span>
          </div>
          <span className="text-[10px] font-medium tracking-wider uppercase" style={{ color: colors.subtitle }}>
            Gestion Immobilière & Locative RDC
          </span>
        </div>
      )}
    </div>
  );
};
