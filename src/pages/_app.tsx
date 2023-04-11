import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootswatch/dist/cosmo/bootstrap.min.css';
import './styles.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
