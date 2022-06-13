import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useRef, useState } from 'react';

import { Preloader } from '@component/Preloader';
import { API_URIS } from '@root/routes';
import { TProcessingGetProps } from './@types';
import { makeUrl } from '@root/utils';

function ProcessingComponent() {
  const ref = useRef({
    attempts: 20,
    delay: 5000,
    delayAfterAction: 60000,
  });

  const [timer, setTimer] = useState(ref.current.delay);
  const [counter, setCounter] = useState(ref.current.attempts);

  const router = useRouter();

  const query = useMemo(
    () => router.query as TProcessingGetProps,
    [router.query]
  );

  useEffect(() => {
    let interval: NodeJS.Timer;

    if (counter) {
      interval = setInterval(async () => {
        try {
          const response = await axios.get(
            makeUrl(process.env.DOMAIN, API_URIS.PROCESSING),
            {
              params: query,
              validateStatus: (status) => status < 500,
            }
          );

          if (response.status == 200) {
            clearInterval(interval);

            if (response.request.responseURL) {
              router.replace(response.request.responseURL);
            }
          }
        } catch (err) {
          console.log(err);
        }

        setCounter(counter - 1);
      }, timer);
    } else {
      setTimer(ref.current.delayAfterAction);
      setCounter(ref.current.attempts);
    }

    return () => clearInterval(interval);
  }, [counter, query, router, timer]);

  return <Preloader />;
}

export const Processing = ProcessingComponent;
