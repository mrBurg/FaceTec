import { ReactElement } from 'react';

import 'normalize';

import { AppPropsWithLayout } from './@types';

function LayoutComponent(props: AppPropsWithLayout) {
  const { Component, pageProps } = props;
  const getLayout =
    Component.getLayout ||
    ((children: ReactElement) => {
      return (
        // <div className="layoutWrapper">
        children
        // </div>
      );
    });

  return (
    // <div className="commonWrapper">
    getLayout(<Component {...pageProps} />)
    // </div>
  );
}

export const Layout = LayoutComponent;
