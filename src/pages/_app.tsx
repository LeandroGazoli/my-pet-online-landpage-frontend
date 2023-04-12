import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

export default function App({ Component, pageProps }: AppProps) {
  const token = process.env.NEXT_PUBLIC_API_KEY_GOOGLE_RECAPTCHA as string;
  return (
    <>
      <GoogleReCaptchaProvider reCaptchaKey={token}>
        <Component {...pageProps} />
      </GoogleReCaptchaProvider>
      <ToastContainer />
    </>
  );
}
