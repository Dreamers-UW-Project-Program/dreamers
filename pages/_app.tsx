import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { RenderContext, RenderContextProvider } from '../contexts/render'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RenderContextProvider>
      <Component {...pageProps} />
    </RenderContextProvider>
  );
}

export default MyApp
