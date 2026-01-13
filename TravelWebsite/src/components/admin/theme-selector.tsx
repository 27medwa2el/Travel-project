
import { useThemeConfig } from '@/components/admin/active-theme';
import { Label } from '@/components/admin/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue
} from '@/components/admin/ui/select';

const DEFAULT_THEMES = [
  {
    name: 'Default',
    value: 'default'
  },
  {
    name: 'Blue',
    value: 'blue'
  },
  {
    name: 'Green',
    value: 'green'
  },
  {
    name: 'Amber',
    value: 'amber'
  }
];

const SCALED_THEMES = [
  {
    name: 'Default',
    value: 'default-scaled'
  },
  {
    name: 'Blue',
    value: 'blue-scaled'
  }
];

const MONO_THEMES = [
  {
    name: 'Mono',
    value: 'mono-scaled'
  }
];

export function ThemeSelector() {
  const { activeTheme, setActiveTheme } = useThemeConfig();

  return (
    <div className='flex items-center gap-2'>
      <Label htmlFor='theme-selector' className='sr-only'>
        Theme
      </Label>
      <Select value={activeTheme} onValueChange={setActiveTheme}>
        <SelectTrigger
          id='theme-selector'
          className='rounded-xl border-gray-100 bg-white shadow-sm h-10 w-40'
        >
          <span className='text-[10px] font-black uppercase tracking-widest text-gray-400 mr-2'>Theme:</span>
          <SelectValue placeholder='Select' className="text-xs font-black uppercase tracking-tighter" />
        </SelectTrigger>
        <SelectContent align='end' className="rounded-2xl shadow-2xl border-gray-100">
          <SelectGroup>
            <SelectLabel className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 p-2">Colors</SelectLabel>
            {DEFAULT_THEMES.map((theme) => (
              <SelectItem key={theme.name} value={theme.value} className="rounded-lg text-[10px] font-black uppercase tracking-widest">
                {theme.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
