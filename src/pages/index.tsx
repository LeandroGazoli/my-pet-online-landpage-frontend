import Head from 'next/head';
import Header from '@/components/Header';
import HomeSection from '@/sections/Home';

export default function Home() {
  return (
    <>
      <Head>
        <title>My Pet Online</title>
        <meta
          name="description"
          content="Ajude mais de 30 milhões de animais abandonados com apenas um click"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <meta
          property="og:site_name"
          content="My Pet Online"
        />
        <meta
          property="og:title"
          content="My Pet Online"
        />
        <meta
          property="og:description"
          content="Ajude mais de 30 milhões de animais abandonados com apenas um click"
        />
        <meta
          property="og:image"
          itemProp="image"
          content="/assets/images/logo-og.png"
        />
        <meta
          property="og:type"
          content="website"
        />
      </Head>
      <Header />
      <main>
        <HomeSection />
      </main>
    </>
  );
}
