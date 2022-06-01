import _ from 'lodash';
import { useRouter } from 'next/router';
import React, { /* useEffect, */ useMemo } from 'react';

import { Preloader } from '@component/Preloader';
import { Facetec, FLOW } from '@component/Facetec';
import { TConfigGetProps } from '@component/Facetec/@types';
import { API_URIS, URIS, URLS } from '@root/routes';
import { makeUrl } from '@root/utils';

function FacetecComponent() {
  const router = useRouter();
  const query = useMemo(() => router.query as TConfigGetProps, [router.query]);

  /* useEffect(() => {
    if (_.size(query)) {
      router.push(
        {
          pathname: '/liveness',
        },
        null,
        { shallow: true }
      );

      console.log(query);
    }
  }, [query, router]); */

  if (_.size(query)) {
    return (
      <Facetec
        flow={FLOW.ID_MATCH}
        config={query}
        paths={{
          facetecSDK: '/facetec/FaceTecSDK.js',
          getConfig: makeUrl(API_URIS.GET_CONFIG, URLS.DOMAIN), // TODO удалить параметр URLS.DOMAIN
          operation: makeUrl(API_URIS.OPERATION, URLS.DOMAIN), // TODO удалить параметр URLS.DOMAIN
          auditTrail: URIS.AUDIT_TRAIL,
        }}
        preloader={<Preloader />}
      />
    );
  }

  return <Preloader />;
}

export default FacetecComponent;
