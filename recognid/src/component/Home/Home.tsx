import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import style from './Home.module.scss';

import { THomeComponentProps } from './@types';
import { Preloader } from '@component/Preloader';
import { API_URIS, URLS } from '@root/routes';
import { replaceString } from '@root/utils';

function HomeComponent(props: THomeComponentProps) {
  const { staticData } = props;

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
          URLS.DOMAIN + API_URIS.OPERATION_INIT,
          null,
          options
        );

        if (response.status == 200) {
          return response.data;
        }
      } catch (err) {
        console.log(err);
      }
    };

    getOperation()
      .then(async (data) => {
        try {
          const response = await axios.post(API_URIS.GET_LINK, {
            // Заменить на объект с оригинальным доменом
            ...data,
            operation_url: replaceString(
              // Заменяет оригинайльный URL на контейнер
              data.operation_url,
              URLS.ORIGIN,
              URLS.CONTAINER
            ),
          });

          if (response.status == 200) {
            return response.data;
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
            URLS.ORIGIN,
            URLS.LOCAL
          )
        )
      )
      .catch((err) => console.log(err));
  }, []);

  if (url) {
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
