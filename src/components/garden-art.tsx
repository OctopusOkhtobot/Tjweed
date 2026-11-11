import type { PlantType } from "@/lib/tajweed/garden";

export function SeedGraphic({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="55" rx="20" ry="26" transform="rotate(-15 50 55)" fill="url(#seed-grad)" stroke="#5c3d1e" strokeWidth="2" />
      <path d="M42 42C48 34 56 32 60 38" stroke="#d4a373" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="58" cy="40" r="3" fill="#ffe8d6" opacity="0.8" />
      <defs>
        <linearGradient id="seed-grad" x1="30" y1="30" x2="70" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#9c6644" />
          <stop offset="0.6" stopColor="#7f4f24" />
          <stop offset="1" stopColor="#582f0e" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function SproutGraphic({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Soil base */}
      <ellipse cx="60" cy="100" rx="36" ry="10" fill="#7a4b26" opacity="0.85" />
      <ellipse cx="60" cy="98" rx="28" ry="7" fill="#583115" />
      {/* Stem */}
      <path d="M60 96 C59 75 58 60 60 45" stroke="#4d7c0f" strokeWidth="5" strokeLinecap="round" />
      {/* Left Leaf */}
      <path
        d="M60 62 C40 60 32 45 35 34 C48 36 56 48 60 62 Z"
        fill="url(#leaf-sprout-left)"
        stroke="#3f6212"
        strokeWidth="1.5"
      />
      {/* Right Leaf */}
      <path
        d="M60 52 C78 48 88 32 82 22 C70 24 64 38 60 52 Z"
        fill="url(#leaf-sprout-right)"
        stroke="#3f6212"
        strokeWidth="1.5"
      />
      {/* Dew drop */}
      <circle cx="38" cy="38" r="2.5" fill="#e0f2fe" opacity="0.9" />
      <defs>
        <linearGradient id="leaf-sprout-left" x1="32" y1="34" x2="60" y2="62" gradientUnits="userSpaceOnUse">
          <stop stopColor="#84cc16" />
          <stop offset="1" stopColor="#4d7c0f" />
        </linearGradient>
        <linearGradient id="leaf-sprout-right" x1="88" y1="22" x2="60" y2="52" gradientUnits="userSpaceOnUse">
          <stop stopColor="#a3e635" />
          <stop offset="1" stopColor="#65a30d" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function TeaPlantGraphic({ className = "w-20 h-20" }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 140" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Soil mound */}
      <ellipse cx="70" cy="122" rx="44" ry="12" fill="#4d321d" />
      <ellipse cx="70" cy="120" rx="36" ry="8" fill="#6d482b" />
      {/* Wood branch */}
      <path d="M70 120 C68 95 69 75 70 55" stroke="#5c4033" strokeWidth="6" strokeLinecap="round" />
      <path d="M70 82 C55 72 45 68 38 62" stroke="#5c4033" strokeWidth="4" strokeLinecap="round" />
      <path d="M70 74 C85 66 96 60 104 54" stroke="#5c4033" strokeWidth="4" strokeLinecap="round" />
      {/* Tea Leaves cluster */}
      <path d="M70 55 C60 35 48 30 40 38 C42 52 56 58 70 55 Z" fill="url(#tea-grad-1)" stroke="#1e4a3a" strokeWidth="1.5" />
      <path d="M70 52 C80 30 94 28 100 36 C96 50 82 55 70 52 Z" fill="url(#tea-grad-2)" stroke="#1e4a3a" strokeWidth="1.5" />
      <path d="M38 62 C22 55 18 42 24 35 C34 40 38 52 38 62 Z" fill="url(#tea-grad-3)" stroke="#1e4a3a" strokeWidth="1.5" />
      <path d="M104 54 C120 48 124 35 116 28 C108 34 104 46 104 54 Z" fill="url(#tea-grad-1)" stroke="#1e4a3a" strokeWidth="1.5" />
      {/* Tender Top Bud (Two leaves and a bud) */}
      <path d="M70 45 C66 26 70 12 70 12 C70 12 74 26 70 45 Z" fill="#bef264" stroke="#4d7c0f" strokeWidth="1.2" />
      <circle cx="70" cy="18" r="2" fill="#ffffff" opacity="0.8" />
      {/* Dewdrops */}
      <circle cx="48" cy="38" r="2.5" fill="#e0f2fe" opacity="0.85" />
      <circle cx="92" cy="36" r="2.5" fill="#e0f2fe" opacity="0.85" />
      <defs>
        <linearGradient id="tea-grad-1" x1="40" y1="30" x2="70" y2="60" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4ade80" />
          <stop offset="0.7" stopColor="#15803d" />
          <stop offset="1" stopColor="#14532d" />
        </linearGradient>
        <linearGradient id="tea-grad-2" x1="70" y1="28" x2="100" y2="55" gradientUnits="userSpaceOnUse">
          <stop stopColor="#86efac" />
          <stop offset="0.8" stopColor="#16a34a" />
          <stop offset="1" stopColor="#166534" />
        </linearGradient>
        <linearGradient id="tea-grad-3" x1="18" y1="35" x2="38" y2="62" gradientUnits="userSpaceOnUse">
          <stop stopColor="#22c55e" />
          <stop offset="1" stopColor="#15803d" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function ChrysanthemumGraphic({ className = "w-20 h-20" }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 140" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Stem and side leaves */}
      <path d="M70 125 C69 105 71 85 70 65" stroke="#3f6212" strokeWidth="5" strokeLinecap="round" />
      <path d="M70 95 C55 90 44 80 48 70 C58 74 66 84 70 95 Z" fill="#65a30d" stroke="#365314" strokeWidth="1.2" />
      <path d="M70 85 C85 80 96 70 92 60 C82 64 74 74 70 85 Z" fill="#65a30d" stroke="#365314" strokeWidth="1.2" />
      
      {/* Outer Golden Petals */}
      <g transform="translate(70 50)">
        {[0, 24, 48, 72, 96, 120, 144, 168, 192, 216, 240, 264, 288, 312, 336].map((deg, i) => (
          <ellipse
            key={`chrys-petal-outer-${deg}-${i}`}
            cx="0"
            cy="-28"
            rx="5.5"
            ry="18"
            transform={`rotate(${deg})`}
            fill="url(#chrys-petal-outer)"
            stroke="#b45309"
            strokeWidth="0.8"
          />
        ))}
        {/* Inner Bright Petals */}
        {[12, 36, 60, 84, 108, 132, 156, 180, 204, 228, 252, 276, 300, 324, 348].map((deg, i) => (
          <ellipse
            key={`chrys-petal-inner-${deg}-${i}`}
            cx="0"
            cy="-20"
            rx="4.5"
            ry="13"
            transform={`rotate(${deg})`}
            fill="url(#chrys-petal-inner)"
            stroke="#d97706"
            strokeWidth="0.8"
          />
        ))}
        {/* Floral Golden Core */}
        <circle cx="0" cy="0" r="12" fill="url(#chrys-center)" stroke="#92400e" strokeWidth="1.2" />
        <circle cx="0" cy="0" r="7" fill="#78350f" opacity="0.3" />
      </g>
      <defs>
        <linearGradient id="chrys-petal-outer" x1="0" y1="-46" x2="0" y2="-10" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fef08a" />
          <stop offset="0.6" stopColor="#facc15" />
          <stop offset="1" stopColor="#eab308" />
        </linearGradient>
        <linearGradient id="chrys-petal-inner" x1="0" y1="-33" x2="0" y2="-7" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fffbeb" />
          <stop offset="0.5" stopColor="#fde047" />
          <stop offset="1" stopColor="#ca8a04" />
        </linearGradient>
        <radialGradient id="chrys-center" cx="0" cy="0" r="12" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f59e0b" />
          <stop offset="0.7" stopColor="#d97706" />
          <stop offset="1" stopColor="#b45309" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export function DamaskRoseGraphic({ className = "w-20 h-20" }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 140" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Stem with thorns */}
      <path d="M70 128 C68 108 71 88 70 70" stroke="#166534" strokeWidth="5" strokeLinecap="round" />
      {/* Thorny spines */}
      <path d="M70 102 C64 100 62 96 61 93 C65 96 68 98 70 99 Z" fill="#14532d" />
      <path d="M70 85 C76 83 78 79 79 76 C75 79 72 81 70 82 Z" fill="#14532d" />
      {/* Rose Leaves with serrated look */}
      <path d="M70 96 C50 94 36 80 40 68 C54 72 64 84 70 96 Z" fill="url(#rose-leaf-left)" stroke="#14532d" strokeWidth="1.2" />
      <path d="M70 84 C90 82 104 68 100 56 C86 60 76 72 70 84 Z" fill="url(#rose-leaf-right)" stroke="#14532d" strokeWidth="1.2" />
      {/* Sepal green base */}
      <path d="M54 64 C62 67 70 68 70 68 C70 68 78 67 86 64 C80 76 60 76 54 64 Z" fill="#15803d" />
      {/* Rose Blossom layers */}
      <g transform="translate(70 48)">
        {/* Layer 1 - Outer Velvet Petals */}
        <path d="M-36 0 C-38 -20 -15 -36 0 -36 C15 -36 38 -20 36 0 C34 18 16 32 0 32 C-16 32 -34 18 -36 0 Z" fill="url(#rose-petal-1)" />
        {/* Layer 2 - Mid Petals */}
        <path d="M-26 -6 C-28 -22 -10 -30 0 -30 C10 -30 28 -22 26 -6 C24 8 12 22 0 22 C-12 22 -24 8 -26 -6 Z" fill="url(#rose-petal-2)" />
        {/* Layer 3 - Overlapping Heart Petals */}
        <path d="M-18 -10 C-20 -22 -4 -24 0 -18 C4 -24 20 -22 18 -10 C16 2 6 12 0 14 C-6 12 -16 2 -18 -10 Z" fill="url(#rose-petal-3)" />
        {/* Rose core spiral */}
        <ellipse cx="0" cy="-6" rx="8" ry="7" fill="url(#rose-core)" />
        <path d="M-4 -8 C-2 -12 2 -12 4 -8 C5 -4 1 -2 -2 -4" stroke="#ffe4e6" strokeWidth="1.5" strokeLinecap="round" />
        {/* Dew droplets on petals */}
        <circle cx="16" cy="-12" r="2.2" fill="#ffffff" opacity="0.8" />
        <circle cx="-14" cy="8" r="1.8" fill="#ffffff" opacity="0.75" />
      </g>
      <defs>
        <linearGradient id="rose-leaf-left" x1="36" y1="68" x2="70" y2="96" gradientUnits="userSpaceOnUse">
          <stop stopColor="#22c55e" />
          <stop offset="1" stopColor="#14532d" />
        </linearGradient>
        <linearGradient id="rose-leaf-right" x1="104" y1="56" x2="70" y2="84" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4ade80" />
          <stop offset="1" stopColor="#166534" />
        </linearGradient>
        <radialGradient id="rose-petal-1" cx="0" cy="0" r="38" gradientUnits="userSpaceOnUse">
          <stop stopColor="#e11d48" />
          <stop offset="0.6" stopColor="#be123c" />
          <stop offset="1" stopColor="#881337" />
        </radialGradient>
        <radialGradient id="rose-petal-2" cx="0" cy="-4" r="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fb7185" />
          <stop offset="0.5" stopColor="#f43f5e" />
          <stop offset="1" stopColor="#9f1239" />
        </radialGradient>
        <radialGradient id="rose-petal-3" cx="0" cy="-6" r="18" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fda4af" />
          <stop offset="0.6" stopColor="#e11d48" />
          <stop offset="1" stopColor="#881337" />
        </radialGradient>
        <radialGradient id="rose-core" cx="0" cy="-6" r="8" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff1f2" />
          <stop offset="0.4" stopColor="#f43f5e" />
          <stop offset="1" stopColor="#4c0519" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export function PlantGraphic({ type, level = 3, className = "w-16 h-16" }: { type: PlantType; level?: number; className?: string }) {
  if (level === 1) return <SeedGraphic className={className} />;
  if (level === 2) return <SproutGraphic className={className} />;
  if (type === "tea") return <TeaPlantGraphic className={className} />;
  if (type === "chrysanthemum") return <ChrysanthemumGraphic className={className} />;
  return <DamaskRoseGraphic className={className} />;
}

export function GardenBanner() {
  return (
    <div className="relative overflow-hidden rounded-card border border-emerald/20 bg-gradient-to-b from-[#e8f5e9] via-[#f1f8e9] to-[#dcedc8] p-6 shadow-sm">
      {/* Decorative sun glow and mountains */}
      <div className="pointer-events-none absolute -top-12 -left-12 h-44 w-44 rounded-full bg-amber-200/50 blur-2xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-28 w-96 opacity-20">
        <svg viewBox="0 0 400 120" className="h-full w-full" preserveAspectRatio="none">
          <path d="M0 120 Q120 40 240 90 T400 60 L400 120 Z" fill="#2e7d32" />
          <path d="M0 120 Q80 70 180 110 T360 85 L400 120 Z" fill="#1b5e20" />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="space-y-1 text-center md:text-start">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-soft px-3 py-0.5 text-xs font-semibold text-emerald-deep">
            🌿 روضة التجويد ومزارع النون الساكنة
          </span>
          <h2 className="amiri text-2xl text-emerald-deep md:text-3xl">
            بستانكِ يزهر مع كل تلاوة وحكم متقن
          </h2>
          <p className="max-w-xl text-sm text-ink/80">
            تُزرع بذرة مع كل جواب صحيح وتكرار سديد: شاي الهدوء والرسوخ، وأقحوان الإظهار المشمس، وورود الجوري الدمشقي للغنة العاطرة.
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <div className="flex flex-col items-center rounded-control bg-paper/85 px-3 py-2 border border-line shadow-xs">
            <TeaPlantGraphic className="h-10 w-10" />
            <span className="text-xs font-medium text-emerald-deep">شاي التجويد</span>
          </div>
          <div className="flex flex-col items-center rounded-control bg-paper/85 px-3 py-2 border border-line shadow-xs">
            <ChrysanthemumGraphic className="h-10 w-10" />
            <span className="text-xs font-medium text-gold">أقحوان النور</span>
          </div>
          <div className="flex flex-col items-center rounded-control bg-paper/85 px-3 py-2 border border-line shadow-xs">
            <DamaskRoseGraphic className="h-10 w-10" />
            <span className="text-xs font-medium text-clay">جوري الغنة</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * شعار مؤسسة عبدالحميد الصانع التعليمية (شكل هندسي سداسي الوجوه بتدرجات خضراء)
 */
export function AlSaneLogoGraphic({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Faceted polygon ring */}
      <polygon points="50,5 89,27 89,73 50,95 11,73 11,27" fill="#84cc16" opacity="0.15" />
      {/* Upper facet */}
      <polygon points="50,8 86,28 68,40 50,22" fill="#a3e635" />
      {/* Upper right */}
      <polygon points="86,28 86,72 68,60 68,40" fill="#84cc16" />
      {/* Lower right */}
      <polygon points="86,72 50,92 50,78 68,60" fill="#65a30d" />
      {/* Lower left */}
      <polygon points="50,92 14,72 32,60 50,78" fill="#4d7c0f" />
      {/* Upper left */}
      <polygon points="14,72 14,28 32,40 32,60" fill="#65a30d" />
      {/* Top left */}
      <polygon points="14,28 50,8 50,22 32,40" fill="#84cc16" />
      {/* Inner opening */}
      <polygon points="50,26 64,40 64,60 50,74 36,60 36,40" fill="#ffffff" />
      {/* Center gold dot */}
      <circle cx="50" cy="50" r="7" fill="#eab308" />
    </svg>
  );
}

/**
 * لؤلؤة متألقة داخل محارة مفتوحة (رمز التراث البحري الكويتي وسوق اللؤلؤ)
 */
export function PearlShellGraphic({
  className = "w-24 h-24",
  pearlCount,
  glow = true,
}: {
  className?: string;
  pearlCount?: number;
  glow?: boolean;
}) {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 160 160" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Shell outer gradient */}
          <linearGradient id="shell-outer-grad" x1="80" y1="20" x2="80" y2="140" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fdfbf7" />
            <stop offset="0.4" stopColor="#fed7aa" />
            <stop offset="0.8" stopColor="#ea580c" />
            <stop offset="1" stopColor="#9a3412" />
          </linearGradient>
          {/* Shell interior iridescent mother-of-pearl */}
          <radialGradient id="nacre-interior" cx="80" cy="85" r="65" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ffffff" />
            <stop offset="0.3" stopColor="#fef08a" stopOpacity="0.8" />
            <stop offset="0.6" stopColor="#bae6fd" stopOpacity="0.7" />
            <stop offset="0.85" stopColor="#fbcfe8" stopOpacity="0.8" />
            <stop offset="1" stopColor="#fed7aa" />
          </radialGradient>
          {/* The glowing Pearl */}
          <radialGradient id="pearl-core" cx="72" cy="80" r="32" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ffffff" />
            <stop offset="0.35" stopColor="#fef9c3" />
            <stop offset="0.7" stopColor="#e0f2fe" />
            <stop offset="0.9" stopColor="#bae6fd" />
            <stop offset="1" stopColor="#93c5fd" />
          </radialGradient>
          {/* Soft shadow */}
          <radialGradient id="shell-shadow" cx="80" cy="140" r="50" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1e293b" stopOpacity="0.35" />
            <stop offset="1" stopColor="#1e293b" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ground shadow */}
        <ellipse cx="80" cy="142" rx="55" ry="12" fill="url(#shell-shadow)" />

        {/* Back upper shell ridges (open top) */}
        <path
          d="M80 15 C45 18 20 50 25 80 C40 88 120 88 135 80 C140 50 115 18 80 15 Z"
          fill="url(#shell-outer-grad)"
          stroke="#c2410c"
          strokeWidth="1.5"
        />
        {/* Scallop flutes on top lid */}
        <path d="M80 15 L80 82 M55 22 L65 83 M105 22 L95 83 M35 38 L50 83 M125 38 L110 83" stroke="#fbcfe8" strokeWidth="1.2" strokeOpacity="0.6" strokeDasharray="2 3" />

        {/* Bottom shell bowl */}
        <path
          d="M20 78 C25 125 55 142 80 142 C105 142 135 125 140 78 C120 90 40 90 20 78 Z"
          fill="url(#nacre-interior)"
          stroke="#ea580c"
          strokeWidth="2"
        />
        {/* Lower shell ribs */}
        <path d="M80 140 C80 115 80 95 80 88 M55 132 C62 112 68 95 70 88 M105 132 C98 112 92 95 90 88 M36 112 C50 102 60 92 64 88 M124 112 C110 102 100 92 96 88" stroke="#fdba74" strokeWidth="1.5" strokeOpacity="0.7" />

        {/* Ambient Pearl Glow */}
        {glow ? (
          <>
            <circle cx="80" cy="85" r="32" fill="#38bdf8" opacity="0.25" className="animate-pulse" />
            <circle cx="80" cy="85" r="24" fill="#fef08a" opacity="0.3" />
          </>
        ) : null}

        {/* The Pearl (Dana) */}
        <circle cx="80" cy="86" r="22" fill="url(#pearl-core)" stroke="#f8fafc" strokeWidth="1.5" />
        {/* Gloss highlight / specular shine */}
        <ellipse cx="73" cy="78" rx="6" ry="4" transform="rotate(-30 73 78)" fill="#ffffff" opacity="0.9" />
        <circle cx="88" cy="94" r="2" fill="#ffffff" opacity="0.75" />

        {/* Water drops / sea sparkles */}
        <circle cx="48" cy="98" r="2" fill="#ffffff" opacity="0.8" />
        <circle cx="112" cy="98" r="2.5" fill="#ffffff" opacity="0.85" />
        <path d="M125 55 L128 62 L135 65 L128 68 L125 75 L122 68 L115 65 L122 62 Z" fill="#fef08a" opacity="0.85" />
        <path d="M35 55 L37 60 L42 62 L37 64 L35 69 L33 64 L28 62 L33 60 Z" fill="#fef08a" opacity="0.7" />
      </svg>

      {/* Optional pearl counter badge */}
      {typeof pearlCount === "number" ? (
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full border border-amber-300 bg-amber-500/90 px-2 py-0.5 text-[11px] font-bold text-white shadow-xs whitespace-nowrap">
          {pearlCount} لؤلؤة
        </span>
      ) : null}
    </div>
  );
}

/**
 * طوق اللؤلؤ الكويتي الفاخر (يتكون من 20 لؤلؤة مكنونة مع دلاية ذهبية)
 */
export function PearlNecklaceGraphic({
  className = "w-32 h-32",
  emojis = ["🦪", "✨", "🇰🇼"],
}: {
  className?: string;
  emojis?: string[];
}) {
  // 20 pearls positioned on an ellipse
  const pearlCoords = Array.from({ length: 20 }, (_, i) => {
    const angle = (i / 20) * 2 * Math.PI - Math.PI / 2;
    const rx = 52;
    const ry = 42;
    const x = 75 + rx * Math.cos(angle);
    const y = 68 + ry * Math.sin(angle);
    // Graduated pearl sizes (larger at the bottom center)
    const distFromBottom = Math.abs(i - 10);
    const radius = Math.max(4.2, 7.5 - distFromBottom * 0.32);
    return { x, y, r: radius, id: `necklace-pearl-${i}` };
  });

  return (
    <div className={`relative inline-flex flex-col items-center justify-center ${className}`}>
      <svg viewBox="0 0 150 150" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="necklace-pearl-grad" cx="30%" cy="30%" r="70%">
            <stop stopColor="#ffffff" />
            <stop offset="0.4" stopColor="#fef9c3" />
            <stop offset="0.75" stopColor="#e0f2fe" />
            <stop offset="1" stopColor="#93c5fd" />
          </radialGradient>
          <linearGradient id="gold-clasp-grad" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#fef08a" />
            <stop offset="0.5" stopColor="#eab308" />
            <stop offset="1" stopColor="#854d0e" />
          </linearGradient>
        </defs>

        {/* Silk cord / wire */}
        <ellipse cx="75" cy="68" rx="52" ry="42" stroke="#d4d4d8" strokeWidth="1.2" strokeDasharray="1 2" />

        {/* 20 Glowing Pearls */}
        {pearlCoords.map((p) => (
          <g key={p.id}>
            <circle cx={p.x} cy={p.y} r={p.r + 1} fill="#e0f2fe" opacity="0.3" />
            <circle cx={p.x} cy={p.y} r={p.r} fill="url(#necklace-pearl-grad)" stroke="#f1f5f9" strokeWidth="0.8" />
            {/* Tiny highlight */}
            <circle cx={p.x - p.r * 0.3} cy={p.y - p.r * 0.3} r={p.r * 0.28} fill="#ffffff" />
          </g>
        ))}

        {/* Gold Clasp / Top Lock */}
        <rect x="70" y="22" width="10" height="7" rx="2" fill="url(#gold-clasp-grad)" stroke="#713f12" strokeWidth="0.8" />
        <circle cx="75" cy="25.5" r="1.5" fill="#fef08a" />

        {/* Golden Central Pendant (دلاية ذهبية كويتية تراثية) */}
        <g transform="translate(75, 112)">
          <polygon points="0,0 7,10 0,18 -7,10" fill="url(#gold-clasp-grad)" stroke="#713f12" strokeWidth="0.8" />
          {/* Teardrop pearl hanging from pendant */}
          <ellipse cx="0" cy="24" rx="4.5" ry="6" fill="url(#necklace-pearl-grad)" stroke="#f8fafc" strokeWidth="0.8" />
          <circle cx="-1" cy="22" r="1.5" fill="#ffffff" />
        </g>
      </svg>

      {/* Floating Celebration Emojis */}
      {emojis && emojis.length > 0 ? (
        <div className="absolute -top-2 flex gap-1 animate-bounce text-sm">
          {emojis.slice(0, 3).map((e, idx) => (
            <span key={`emoji-badge-${e}-${idx}`}>{e}</span>
          ))}
        </div>
      ) : null}
    </div>
  );
}

/**
 * شخصية "دانة" - لؤلؤة التجويد في مدرسة السفر الأهلية (داخل محارتها)
 */
export function DanaMascotGraphic({
  mood = "calm",
  className = "w-28 h-28",
}: {
  mood?: "calm" | "glad" | "kind" | "listening";
  className?: string;
}) {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 160 160" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="dana-shell" x1="80" y1="20" x2="80" y2="140" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fef3c7" />
            <stop offset="0.5" stopColor="#fed7aa" />
            <stop offset="1" stopColor="#c2410c" />
          </linearGradient>
          <radialGradient id="dana-pearl" cx="72" cy="75" r="38" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ffffff" />
            <stop offset="0.4" stopColor="#fef9c3" />
            <stop offset="0.7" stopColor="#e0f2fe" />
            <stop offset="1" stopColor="#7dd3fc" />
          </radialGradient>
        </defs>

        {/* Back shell lid */}
        <path d="M80 18 C45 22 24 50 28 80 C40 88 120 88 132 80 C136 50 115 22 80 18 Z" fill="url(#dana-shell)" stroke="#ea580c" strokeWidth="1.5" />

        {/* Bottom shell */}
        <path d="M22 78 C28 122 55 140 80 140 C105 140 132 122 138 78 C118 90 42 90 22 78 Z" fill="#fed7aa" stroke="#c2410c" strokeWidth="2" />

        {/* Radiance */}
        <circle cx="80" cy="80" r="38" fill="#38bdf8" opacity="0.2" className={mood === "glad" ? "animate-ping" : ""} />

        {/* Dana Pearl Body */}
        <circle cx="80" cy="80" r="28" fill="url(#dana-pearl)" stroke="#f8fafc" strokeWidth="2" />
        <ellipse cx="70" cy="68" rx="8" ry="5" transform="rotate(-30 70 68)" fill="#ffffff" opacity="0.9" />

        {/* Eyes */}
        {mood === "glad" ? (
          // Joyful smiling eyes (arcs)
          <>
            <path d="M68 76 Q73 70 78 76" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M82 76 Q87 70 92 76" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </>
        ) : mood === "listening" ? (
          // Focused wide listening eyes + headset
          <>
            <circle cx="73" cy="76" r="3.5" fill="#0f172a" />
            <circle cx="72" cy="74.5" r="1.2" fill="#ffffff" />
            <circle cx="87" cy="76" r="3.5" fill="#0f172a" />
            <circle cx="86" cy="74.5" r="1.2" fill="#ffffff" />
            {/* Listening headphones */}
            <path d="M52 80 C50 55 110 55 108 80" stroke="#0284c7" strokeWidth="3" fill="none" />
            <rect x="48" y="75" width="6" height="12" rx="3" fill="#0284c7" />
            <rect x="106" y="75" width="6" height="12" rx="3" fill="#0284c7" />
          </>
        ) : (
          // Calm / Kind expressive eyes
          <>
            <circle cx="73" cy="76" r="3.5" fill="#0f172a" />
            <circle cx="72" cy="74.5" r="1.2" fill="#ffffff" />
            <circle cx="87" cy="76" r="3.5" fill="#0f172a" />
            <circle cx="86" cy="74.5" r="1.2" fill="#ffffff" />
          </>
        )}

        {/* Rosy Cheeks */}
        <circle cx="66" cy="84" r="4" fill="#fb7185" opacity="0.6" />
        <circle cx="94" cy="84" r="4" fill="#fb7185" opacity="0.6" />

        {/* Gentle Mouth */}
        {mood === "glad" ? (
          <path d="M74 85 Q80 93 86 85" stroke="#be123c" strokeWidth="2.5" strokeLinecap="round" fill="#fda4af" />
        ) : (
          <path d="M76 85 Q80 89 84 85" stroke="#be123c" strokeWidth="2" strokeLinecap="round" fill="none" />
        )}

        {/* Sparkles */}
        <path d="M120 48 L123 54 L129 57 L123 60 L120 66 L117 60 L111 57 L117 54 Z" fill="#fef08a" />
        <path d="M40 50 L42 54 L46 56 L42 58 L40 62 L38 58 L34 56 L38 54 Z" fill="#fef08a" opacity="0.8" />
      </svg>
    </div>
  );
}

