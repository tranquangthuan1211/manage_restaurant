import type { Direction, PaletteMode } from '@mui/material';
import type { ColorPreset, Contrast } from '../theme/index';

export type Layout = 'horizontal' | 'vertical';

export type NavColor = 'blend-in' | 'discreet' | 'evident' | 'blue' | 'black';

export interface Settings {
  colorPreset?: ColorPreset;
  contrast?: Contrast;
  direction?: Direction;
  layout?: Layout;
  navColor?: NavColor;
  paletteMode?: PaletteMode;
  responsiveFontSizes?: boolean;
  stretch?: boolean;
}
