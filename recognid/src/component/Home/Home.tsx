import { useRouter } from 'next/router';
import axios from 'axios';
import React, { useCallback } from 'react';

import style from './Home.module.scss';

import { THomeComponentProps } from './@types';
import { API_URIS } from '@root/routes';
import { makeUrl, replaceString } from '@root/utils';
import { TOperationData } from '@component/Facetec/@types';

function HomeComponent(props: THomeComponentProps) {
  const { staticData } = props;

  const router = useRouter();

  const getLink = useCallback(() => {
    const getOperation = async () => {
      const options = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic bWRmaW46cXdlcnR5MTIzNDU=',
        },
      };

      try {
        const response = await axios.post(
          makeUrl(process.env.DOMAIN, API_URIS.OPERATION_INIT),
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
          const response = await axios.post(
            makeUrl(process.env.DEVELOPMENT_HTTP_SERVER, API_URIS.GET_LINK),
            data
          );

          if (response.status == 200) {
            return response.data as string;
          }
        } catch (err) {
          console.log(err);
          throw new Error(
            'You need to run the developer\u2019s server in a separate process. Execute the command "yarn :development" at the root of the project then try again'
          );
        }

        return;
      })
      .then((data) =>
        router.push(
          replaceString(data, process.env.DOMAIN, process.env.HTTPS_SERVER)
        )
      )
      .catch((err) => console.log(err));
  }, [router]);

  return (
    <div className={style.container}>
      <button className={style.button} type="button" onClick={() => getLink()}>
        {staticData.button as string}
      </button>
    </div>
  );
}

export const Home = HomeComponent;
