import { ReactElement } from 'react';

import { TAppPropsWithLayout } from './@types';

function LayoutComponent(props: TAppPropsWithLayout) {
  const { Component, pageProps } = props;
  const getLayout =
    Component.getLayout || ((children: ReactElement) => children);

  return getLayout(<Component {...pageProps} />);
}

export const Layout = LayoutComponent;
