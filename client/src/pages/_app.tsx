import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from 'src/theme/index';
import { initialSettings } from 'src/contexts/settings-context';
import { SnackbarProvider } from 'notistack';
import { UserProvider } from 'src/contexts/users/user-context';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AuthConsumer, AuthProvider } from 'src/contexts/auth/jwt-context';
import "./global.css";

function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const theme = createTheme(initialSettings);
  return (
    <SnackbarProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {/* <AuthProvider>
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
                          <UserProvider>{getLayout(<Component {...pageProps} />)}</UserProvider>
                        </ThemeProvider>
                      )
                    }
                  }
                }
          </AuthConsumer>
        </AuthProvider> */}
          <ThemeProvider theme={theme} >
            <UserProvider>{getLayout(<Component {...pageProps} />)}</UserProvider>
          </ThemeProvider>
      </LocalizationProvider>
    </SnackbarProvider>
  )
}

export default App;
