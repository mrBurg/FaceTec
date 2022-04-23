import { GetStaticPropsContext, NextPage } from 'next';
import { AppProps } from 'next/app';
import { ReactElement } from 'react';

type TNextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactElement;
};

export type TAppPropsWithLayout = AppProps & {
  Component: TNextPageWithLayout;
  pageProps: {
    context: GetStaticPropsContext;
  };
};
