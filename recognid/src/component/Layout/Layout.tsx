import React, { ReactElement } from 'react';

import { DeveloperMenu } from '@component/developer/DeveloperMenu';
import { URIS } from '@root/routes';

import { TAppPropsWithLayout } from './@types';

function LayoutComponent(props: TAppPropsWithLayout) {
  const { Component, pageProps } = props;
  const getLayout =
    Component.getLayout || ((children: ReactElement) => children);

  return (
    <>
      <DeveloperMenu
        routes={URIS}
        render={process.env.ENVIRONMENT == 'development'}
      />
      {getLayout(<Component {...pageProps} />)}
    </>
  );
}

export const Layout = LayoutComponent;
