import { ReactElement, ReactNode } from 'react';
import Layout from '@component/layout';
import { GetStaticPropsContext, NextPage } from 'next';
import type { AppProps } from 'next/app';

import 'normalize';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  pageProps: {
    context: GetStaticPropsContext;
  };
};

export default function App(props: AppPropsWithLayout) {
  const { Component, pageProps } = props;
  const getLayout =
    Component.getLayout || ((children: ReactElement) => children);

  return getLayout(
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
