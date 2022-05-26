import { useRouter } from 'next/router';
import React, { useEffect, useMemo } from 'react';

import { Preloader } from '@component/Preloader';
import { TProcessingGetProps } from '@component/Facetec/@types';
import axios from 'axios';
import { API_URIS } from '@root/routes';

function ProcessingComponent() {
  const router = useRouter();
  const query = useMemo(
    () => router.query,
    [router.query]
  ) as TProcessingGetProps;

  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .get(API_URIS.PROCESSING, {
          params: { id: query.id },
        })
        .catch((err) => console.log(err));
    }, 5000);

    return () => clearInterval(interval);
  }, [query, router]);

  return <Preloader />;
}

export default ProcessingComponent;
