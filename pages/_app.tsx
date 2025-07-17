import "@/styles/globals.css";
import type { AppProps } from "next/app";
import '../styles/Landing.module.scss';
import '../styles/Navbar.module.scss';
import Navbar from '../components/Navbar';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isDashboard = router.pathname.startsWith('/dashboard');
  return (
    <>
      {!isDashboard && <Navbar />}
      <Component {...pageProps} />
    </>
  );
}
