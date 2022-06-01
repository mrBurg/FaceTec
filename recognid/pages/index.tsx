import { GetStaticPropsContext } from 'next';
import axios from 'axios';
import React, { ReactElement } from 'react';
import Head from 'next/head';

import { Home } from '@component/Home';
import { Preloader } from '@component/Preloader';
import { TPageProps } from '@interface/page';
import { API_URIS, URIS, URLS } from '@root/routes';
import { makeUrl } from '@root/utils';

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
  try {
    const response = await axios.get(
      makeUrl(API_URIS.STATIC + URIS.HOME, URLS.BASE_HTTP_URL)
    );

    if (response.status == 200) {
      return {
        props: {
          context,
          staticData: response.data,
        },
      };
    }
  } catch (err) {
    return {
      props: {
        staticData: {
          title: String(void 0),
          pageTitle: String(void 0),
        },
      },
    };
  }
}
