
import { AppProps } from 'next/app';
import { ThemeProvider} from '@mui/material/styles';
import {createTheme} from 'src/theme/index';
import {initialSettings} from 'src/contexts/settings-context';
function App({ Component, pageProps }: AppProps){
  const getLayout = Component.getLayout ?? ((page) => page);
  const theme = createTheme(initialSettings);
  return (
    <ThemeProvider theme={theme} >
      {getLayout(<Component {...pageProps} />)}
    </ThemeProvider>
  )
}

export default App;