import type { AppProps } from 'next/app';
import { AuthProvider } from '@/contexts/AuthContext';

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootswatch/dist/flatly/bootstrap.min.css';
import './styles.css';

function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default App;
