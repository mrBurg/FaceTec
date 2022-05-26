import _ from 'lodash';
import { useRouter } from 'next/router';
import React, { /* useEffect, */ useMemo } from 'react';

import { Preloader } from '@component/Preloader';
import { Facetec, FLOW } from '@component/Facetec';
import { TConfigGetProps } from '@component/Facetec/@types';

function FacetecComponent() {
  const router = useRouter();
  const query = useMemo(() => router.query, [router.query]) as TConfigGetProps;

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
    return <Facetec flow={FLOW.ID_MATCH} config={query} />;
  }

  return <Preloader />;
}

export default FacetecComponent;
