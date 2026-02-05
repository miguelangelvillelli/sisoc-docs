import { useTheme } from '@/context/ThemeContext';
import { Sun, Moon, Building2 } from 'lucide-react';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const themes = [
    { value: 'light', label: 'Claro', icon: Sun },
    { value: 'dark', label: 'Oscuro', icon: Moon },
    { value: 'poncho', label: 'Poncho', icon: Building2 },
  ] as const;

  const currentTheme = themes.find(t => t.value === theme) || themes[0];
  const Icon = currentTheme.icon;

  return (
    <div className="relative group">
      <button
        className="p-2 rounded-lg bg-card hover:bg-muted transition-colors border border-border"
        aria-label="Cambiar tema"
      >
        <Icon className="w-5 h-5 text-foreground" strokeWidth={1.5} />
      </button>

      {/* Dropdown menu */}
      <div className="absolute right-0 top-full mt-2 w-40 bg-card border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        {themes.map((t) => {
          const ThemeIcon = t.icon;
          return (
            <button
              key={t.value}
              onClick={() => setTheme(t.value)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-muted transition-colors first:rounded-t-lg last:rounded-b-lg ${
                theme === t.value ? 'bg-muted text-primary font-medium' : 'text-foreground'
              }`}
            >
              <ThemeIcon className="w-4 h-4" strokeWidth={1.5} />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ThemeToggle;
