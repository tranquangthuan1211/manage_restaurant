
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import { UserProvider } from 'src/contexts/users/user-context';
import { createTheme } from 'src/theme/index';
import { initialSettings } from 'src/contexts/settings-context';
import "./global.css";

function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const theme = createTheme(initialSettings);
  return (
    <ThemeProvider theme={theme} >
      <UserProvider>
        {getLayout(<Component {...pageProps} />)}
      </UserProvider>
    </ThemeProvider>
  )
}

export default App;