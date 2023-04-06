import Head from 'next/head';
import styles from '@/styles/Home.module.scss';
import Header from '@/components/Header';
import HomeSection from '@/sections/Home';

export default function Home() {
  return (
    <>
      <Head>
        <title>My Pet Online</title>
        <meta
          name="description"
          content="Ajude mais de 80 milhões de animais abandonados com apenas um click"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>
      <Header />
      <main>
        <HomeSection />
      </main>
    </>
  );
}
