
import { AppProps } from 'next/app';
import { ThemeProvider} from '@mui/material/styles';
import {createTheme} from 'src/theme/index';
import {initialSettings} from 'src/contexts/settings-context';
import {SnackbarProvider} from 'notistack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AuthConsumer, AuthProvider } from 'src/contexts/auth/jwt-context';
function App({ Component, pageProps }: AppProps){
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <SnackbarProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <AuthProvider>
          <AuthConsumer>
                {(auth) => {
                    // console.log(auth)
                    const showScreen = auth.isInitialized;
                    // console.log(auth)
                    const theme = createTheme(initialSettings);
                    if(!showScreen) {
                      return <h1> loaaa</h1>
                    }else {
                      return (
                        <ThemeProvider theme={theme} >
                          {getLayout(<Component {...pageProps} />)}
                        </ThemeProvider>
                      )
                    }
                  }
                }
          </AuthConsumer>
        </AuthProvider>
      </LocalizationProvider>
    </SnackbarProvider>
  )
}

export default App;