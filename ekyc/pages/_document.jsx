import React from 'react';
import { Html, Head, Main, NextScript } from 'next/document';

function DocumentComponent() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

const Document = DocumentComponent;

export default Document;
