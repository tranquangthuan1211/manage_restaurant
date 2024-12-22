import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import { UserProvider } from 'src/contexts/users/user-context';
import { createTheme } from 'src/theme/index';
import { initialSettings } from 'src/contexts/settings-context';
import { LoadingProvider, useLoading } from 'src/contexts/loading';
import { useEffect } from 'react';
import Spinner from 'src/components/spinner';
import "./global.css";

function InnerApp({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const { isLoading, setLoading } = useLoading();

  return (
    <>
      {isLoading && <Spinner />} {/* Show spinner during loading */}
      {!isLoading && (
        <UserProvider>{getLayout(<Component {...pageProps} />)}</UserProvider>
      )}
    </>
  );
}

function App(props: AppProps) {
  const theme = createTheme(initialSettings);

  return (
    <ThemeProvider theme={theme}>
      <LoadingProvider>
        <InnerApp {...props} />
      </LoadingProvider>
    </ThemeProvider>
  );
}

export default App;
