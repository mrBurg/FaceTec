import { GetStaticPropsContext } from 'next';
import axios from 'axios';
import { ReactElement } from 'react';
import Head from 'next/head';

import { Home } from '@component/Home';
import { Preloader } from '@component/Preloader';
import { TJSON } from '@interface/common';

type TDomains = Record<'domain' | 'defaultLocale', string> & {
  locales: string[];
};

type TPageProps = {
  context: {
    locales: string[];
    defaultLocale: string;
    domains: TDomains[];
  };
  staticData: TJSON;
};

function HomeComponent(props: TPageProps) {
  if (props.staticData) {
    return <Home staticData={props.staticData} />;
  }

  return <Preloader />;
}

HomeComponent.getLayout = (children: ReactElement) => (
  <>
    <Head>
      <title>Recognid:Home</title>
    </Head>
    {children}
  </>
);

export default HomeComponent;

export async function getStaticProps(context: GetStaticPropsContext) {
  const response = await axios.get('/api/static/home');

  if (response.status == 200) {
    return { props: { context, staticData: response.data } };
  }

  return { props: {} };
}
