import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        <meta
          name="description"
          content="Faça parte e mude uma vida"
        />
        <link
          rel="icon"
          type="image/x-icon"
          href="favicon.svg"
        ></link>
        <link
          rel="shortcut icon"
          href="favicon.svg"
        />
        <title>My Pet Online</title>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
