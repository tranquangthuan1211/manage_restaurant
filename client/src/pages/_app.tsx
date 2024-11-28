
import { AppProps } from 'next/app';
import { ThemeProvider} from '@mui/material/styles';
import {createTheme} from 'src/theme/index';
import {initialSettings} from 'src/contexts/settings-context';
import {SnackbarProvider} from 'notistack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
function App({ Component, pageProps }: AppProps){
  const getLayout = Component.getLayout ?? ((page) => page);
  const theme = createTheme(initialSettings);
  return (
    <SnackbarProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={theme} >
          {getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
      </LocalizationProvider>
    </SnackbarProvider>
  )
}

export default App;