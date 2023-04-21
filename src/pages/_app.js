import '@/styles/globals.css';
import { AuthProvider } from '../contexts/AuthContext';
import { useEffect } from 'react';

export default function App({ Component, pageProps }) {
  // Set SameSite and Secure attributes for cookies
  useEffect(() => {
    document.cookie = `SameSite=None; Secure`;
  }, []);

  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}
