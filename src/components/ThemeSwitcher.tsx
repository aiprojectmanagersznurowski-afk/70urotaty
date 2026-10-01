import React, { useEffect, useState } from 'react';

export type ThemeOption = 'azure-ochre' | 'olive-terracotta';

export const ThemeSwitcher: React.FC = () => {
  const [theme, setTheme] = useState<ThemeOption>('azure-ochre');

  useEffect(() => {
    // Read theme from URL param, localStorage or default to 'azure-ochre' (Option 2)
    const params = new URLSearchParams(window.location.search);
    const urlTheme = params.get('theme') as ThemeOption | null;
    const validUrlTheme = (urlTheme === 'azure-ochre' || urlTheme === 'olive-terracotta') ? urlTheme : null;
    const saved = validUrlTheme || (localStorage.getItem('rsvp_theme_70') as ThemeOption) || 'azure-ochre';
    setTheme(saved);
    document.documentElement.setAttribute('data-theme', saved);
  }, []);

  const handleSelect = (newTheme: ThemeOption) => {
    setTheme(newTheme);
    localStorage.setItem('rsvp_theme_70', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <div className="w-full flex justify-center py-2 px-3 z-40 select-none">
      <div className="inline-flex items-center gap-1.5 p-1 rounded-full bg-white/90 backdrop-blur-md border border-[var(--color-line)] shadow-sm">
        {/* Opcja 2: Morski Szafir & Złocista Ochra (Domyślna) */}
        <button
          type="button"
          onClick={() => handleSelect('azure-ochre')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] sm:text-[13px] font-bold transition-all active:scale-95 cursor-pointer whitespace-nowrap ${
            theme === 'azure-ochre'
              ? 'bg-[#0E2646] text-white shadow-sm ring-1 ring-[#C28E3A]/40'
              : 'text-[var(--color-muted)] hover:text-[var(--color-ink)]'
          }`}
          aria-pressed={theme === 'azure-ochre'}
          title="Styl domyślny: Opcja 2 – Morski Szafir & Złocista Ochra"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#C28E3A] shrink-0 shadow-xs" />
          <span>Opcja 2<span className="hidden sm:inline">: Szafir & Złoto</span><span className="sm:hidden">: Szafir</span></span>
        </button>

        {/* Opcja 3: Toskańska Oliwka & Cynamonowa Terakota */}
        <button
          type="button"
          onClick={() => handleSelect('olive-terracotta')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] sm:text-[13px] font-bold transition-all active:scale-95 cursor-pointer whitespace-nowrap ${
            theme === 'olive-terracotta'
              ? 'bg-[#485841] text-white shadow-sm ring-1 ring-[#B35434]/40'
              : 'text-[var(--color-muted)] hover:text-[var(--color-ink)]'
          }`}
          aria-pressed={theme === 'olive-terracotta'}
          title="Styl alternatywny: Opcja 3 – Toskańska Oliwka & Cynamonowa Terakota"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#B35434] shrink-0 shadow-xs" />
          <span>Opcja 3<span className="hidden sm:inline">: Oliwka & Terakota</span><span className="sm:hidden">: Oliwka</span></span>
        </button>
      </div>
    </div>
  );
};
