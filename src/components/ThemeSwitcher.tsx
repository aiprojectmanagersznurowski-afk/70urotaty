import React, { useEffect, useState } from 'react';

export type ThemeOption = 'azure-ochre' | 'cobalt-azure' | 'olive-terracotta';

export const ThemeSwitcher: React.FC = () => {
  const [theme, setTheme] = useState<ThemeOption>('azure-ochre');

  useEffect(() => {
    // Read theme from URL param, localStorage or default to 'azure-ochre' (Option 2)
    const params = new URLSearchParams(window.location.search);
    const urlTheme = params.get('theme') as ThemeOption | null;
    const validUrlTheme = (urlTheme === 'azure-ochre' || urlTheme === 'cobalt-azure' || urlTheme === 'olive-terracotta') ? urlTheme : null;
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
    <div className="w-full flex justify-center py-2 px-2 z-40 select-none">
      <div className="inline-flex items-center gap-1 p-1 rounded-full bg-white/90 backdrop-blur-md border border-[var(--color-line)] shadow-sm max-w-full overflow-x-auto scrollbar-none">
        {/* Opcja 2: Morski Szafir & Złocista Ochra */}
        <button
          type="button"
          onClick={() => handleSelect('azure-ochre')}
          className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-[11.5px] sm:text-[12.5px] font-bold transition-all active:scale-95 cursor-pointer whitespace-nowrap ${
            theme === 'azure-ochre'
              ? 'bg-[#0E2646] text-white shadow-sm ring-1 ring-[#C28E3A]/40'
              : 'text-[var(--color-muted)] hover:text-[var(--color-ink)]'
          }`}
          aria-pressed={theme === 'azure-ochre'}
          title="Styl: Morski Szafir & Złocista Ochra"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#C28E3A] shrink-0 shadow-xs" />
          <span><span className="hidden sm:inline">Szafir & Złoto</span><span className="sm:hidden">Szafir</span></span>
        </button>

        {/* Nowa Paleta: Królewski Kobalt & Błękit Lazurowy */}
        <button
          type="button"
          onClick={() => handleSelect('cobalt-azure')}
          className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-[11.5px] sm:text-[12.5px] font-bold transition-all active:scale-95 cursor-pointer whitespace-nowrap ${
            theme === 'cobalt-azure'
              ? 'bg-[#0A2540] text-white shadow-sm ring-1 ring-[#0077B6]/50'
              : 'text-[var(--color-muted)] hover:text-[var(--color-ink)]'
          }`}
          aria-pressed={theme === 'cobalt-azure'}
          title="Nowy styl: Królewski Kobalt & Lazurowy Błękit (Czysty Błękit)"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#0077B6] shrink-0 shadow-xs" />
          <span><span className="hidden sm:inline">Królewski Błękit</span><span className="sm:hidden">Błękit</span></span>
        </button>

        {/* Opcja 3: Toskańska Oliwka & Cynamonowa Terakota */}
        <button
          type="button"
          onClick={() => handleSelect('olive-terracotta')}
          className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-[11.5px] sm:text-[12.5px] font-bold transition-all active:scale-95 cursor-pointer whitespace-nowrap ${
            theme === 'olive-terracotta'
              ? 'bg-[#485841] text-white shadow-sm ring-1 ring-[#B35434]/40'
              : 'text-[var(--color-muted)] hover:text-[var(--color-ink)]'
          }`}
          aria-pressed={theme === 'olive-terracotta'}
          title="Styl: Toskańska Oliwka & Cynamonowa Terakota"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#B35434] shrink-0 shadow-xs" />
          <span><span className="hidden sm:inline">Oliwka & Terakota</span><span className="sm:hidden">Oliwka</span></span>
        </button>
      </div>
    </div>
  );
};
