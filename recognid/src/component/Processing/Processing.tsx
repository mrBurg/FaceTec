import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo } from 'react';

import { Preloader } from '@component/Preloader';
import { API_URIS } from '@root/routes';
import { TProcessingGetProps } from './@types';

function ProcessingComponent() {
  const router = useRouter();
  const query = useMemo(
    () => router.query as TProcessingGetProps,
    [router.query]
  );

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await axios.get(API_URIS.PROCESSING, {
          params: query,
        });

        if (response.status == 200) {
          if (response.data) {
            clearInterval(interval);

            const { data } = response;

            if (data.status == 'ok') {
              router.replace(data.location);
            }
          }
        }
      } catch (err) {
        console.log(err);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [query, router]);

  return <Preloader />;
}

export const Processing = ProcessingComponent;
