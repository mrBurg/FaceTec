import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import style from './Home.module.scss';

import { THomeComponentProps } from './@types';
import { Preloader } from '@component/Preloader';
import { API_URIS, URLS } from '@root/routes';
import { makeUrl, replaceString } from '@root/utils';
import { TOperationData } from '@component/Facetec/@types';

function HomeComponent(props: THomeComponentProps) {
  const [url, setUrl] = useState('');

  useEffect(() => {
    const getOperation = async () => {
      const options = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic bWRmaW46cXdlcnR5MTIzNDU=',
        },
      };

      try {
        const response = await axios.post(
          makeUrl(API_URIS.OPERATION_INIT, URLS.DOMAIN), // TODO удалить параметр URLS.DOMAIN
          null,
          options
        );

        if (response.status == 200) {
          return response.data as TOperationData;
        }
      } catch (err) {
        console.log(err);
      }
    };

    getOperation()
      .then(async (data) => {
        try {
          const response = await axios.post(API_URIS.GET_LINK, data);

          if (response.status == 200) {
            return response.data as string;
          }
        } catch (err) {
          console.log(err);
        }

        return;
      })
      .then((data) =>
        setUrl(
          replaceString(
            // Заменяет оригинайльный URL на локальный
            data,
            URLS.DOMAIN,
            URLS.BASE_HTTPS_URL
          )
        )
      )
      .catch((err) => console.log(err));
  }, []);

  if (url) {
    const { staticData } = props;

    return (
      <div className={style.container}>
        <Link href={url}>
          <a className={style.title} href={url}>
            {staticData.pageTitle as string}
          </a>
        </Link>
      </div>
    );
  }

  return <Preloader />;
}

export const Home = HomeComponent;
