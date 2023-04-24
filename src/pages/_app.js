import '@/styles/globals.css';
import InfoProvider from '../contexts/InfoContext';

export default function App({ Component, pageProps }) {

  return <InfoProvider><Component {...pageProps} /></InfoProvider>
}
