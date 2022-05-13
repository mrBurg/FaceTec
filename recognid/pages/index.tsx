import { GetStaticPropsContext } from 'next';
import axios from 'axios';
import React, { ReactElement } from 'react';
import Head from 'next/head';

import { Home } from '@component/Home';
import { Preloader } from '@component/Preloader';
import { TPageProps } from '@interface/page';

function HomeComponent(props: TPageProps) {
  if (props.staticData) {
    return <Home staticData={props.staticData} />;
  }

  return <Preloader />;
}

HomeComponent.getLayout = (children: ReactElement) => {
  const { staticData } = children.props;

  return (
    <>
      <Head>
        <title>{staticData.title}</title>
      </Head>
      {children}
    </>
  );
};

export default HomeComponent;

export async function getStaticProps(context: GetStaticPropsContext) {
  const response = await axios.get('/api/static/home');

  if (response.status == 200) {
    return { props: { context, staticData: response.data } };
  }

  return { props: {} };
}
