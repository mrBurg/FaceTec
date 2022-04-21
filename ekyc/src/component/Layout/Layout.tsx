import { ReactElement } from 'react';

import { AppPropsWithLayout } from './@types';

function LayoutComponent(props: AppPropsWithLayout) {
  const { Component, pageProps } = props;
  const getLayout =
    Component.getLayout || ((children: ReactElement) => children);

  return getLayout(<Component {...pageProps} />);
}

export const Layout = LayoutComponent;
