import type { PaletteColor } from '@mui/material/styles/createPalette';
import type { ColorPreset } from './index';
import { black, blue, green, indigo, purple,yellow } from './colors';
import { ca } from 'date-fns/locale';

export const getPrimary = (preset?: ColorPreset): PaletteColor => {
  switch (preset) {
    case 'blue':
      return blue;
    case 'green':
      return green;
    case 'indigo':
      return indigo;
    case 'purple':
      return purple;
    case 'black':
      return black;
    case "yellow":
      return yellow;
    default:
      console.error('Invalid color preset, accepted values: "blue", "green", "indigo" or "purple"".');
      return blue;
  }
};



export const getSecondary = (): PaletteColor => {
  return black
};
