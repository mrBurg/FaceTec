import { Preloader } from '@component/Preloader';
import axios from 'axios';
import _ from 'lodash';
import Script from 'next/script';
import React, { useCallback, useEffect, useState } from 'react';

import { View } from './View';
import { Config, Controller } from './Controller';
import { facetecSdkType } from './@types';

function FacetecComponent() {
  const [faceTecSDK, setFaceTecSDK] = useState(null as facetecSdkType);
  const [config, setConfig] = useState(null as Config);
  const [controller, setController] = useState(null as Controller);

  useEffect(() => {
    const getConfig = async () => {
      try {
        const response = await axios.get('/api/config/facetec');

        if (response.status == 200) {
          return response.data;
        }
      } catch (err) {
        console.log(err);
      }
    };

    getConfig().then((data) => {
      if (data) {
        if (typeof FaceTecSDK != String(void 0)) {
          setFaceTecSDK(FaceTecSDK);
          setConfig(new Config(data));
        }
      }
    });
  }, [faceTecSDK]);

  useEffect(() => {
    if (faceTecSDK) {
      setController(new Controller(faceTecSDK, config));
    }
  }, [config, faceTecSDK]);

  const renderFacetec = useCallback(() => {
    if (controller) {
      return <View controller={controller} />;
    }

    return <Preloader />;
  }, [controller]);

  return (
    <>
      <Script strategy="beforeInteractive" src="/facetec/FaceTecSDK.js" />
      {renderFacetec()}
    </>
  );
}

export const Facetec = FacetecComponent;
