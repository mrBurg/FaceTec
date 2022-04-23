import { GetStaticPropsContext } from 'next';
import axios from 'axios';
import { ReactElement } from 'react';
import Head from 'next/head';

import { Home } from '@component/Home';
import { Preloader } from '@component/Preloader';
import { jsonType } from '@interface/common';

type typeDomains = Record<'domain' | 'defaultLocale', string> & {
  locales: string[];
};

type typePageProps = {
  context: {
    locales: string[];
    defaultLocale: string;
    domains: typeDomains[];
  };
  static: jsonType;
};

function HomeComponent(props: typePageProps) {
  if (props.static) {
    return <Home static={props.static} />;
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
    return { props: { context, static: response.data } };
  }

  return { props: {} };
}
