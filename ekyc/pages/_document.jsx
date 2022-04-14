import React from 'react';
import { Html, Head, Main, NextScript } from 'next/document';

function DocumentComponent() {
  return (
    <Html>
      {/* <Html lang="en"> */}
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

const Document = DocumentComponent;

export default Document;
