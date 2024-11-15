
import { AppProps } from 'next/app';
import { ThemeProvider} from '@mui/material/styles';
import {createTheme} from 'src/theme/index';
import {initialSettings} from 'src/contexts/settings-context';
import {SnackbarProvider} from 'notistack';
function App({ Component, pageProps }: AppProps){
  const getLayout = Component.getLayout ?? ((page) => page);
  const theme = createTheme(initialSettings);
  return (
    <SnackbarProvider>
      <ThemeProvider theme={theme} >
        {getLayout(<Component {...pageProps} />)}
      </ThemeProvider>
    </SnackbarProvider>
  )
}

export default App;