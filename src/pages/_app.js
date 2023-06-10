import { NextAuthProvider } from "../providers";
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <NextAuthProvider>
      <Component {...pageProps} />
    </NextAuthProvider>
  );
}
