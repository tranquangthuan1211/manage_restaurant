
import { AppProps } from 'next/app';
import { ThemeProvider, createTheme } from '@mui/material/styles';
function App({ Component, pageProps }: AppProps){
  return (
    <ThemeProvider theme={createTheme()}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default App;