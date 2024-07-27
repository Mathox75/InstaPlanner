import type { AppProps } from 'next/app';
import Layout from '../app/layout';
import { AuthProvider } from '../context/AuthContext';
import '../app/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;