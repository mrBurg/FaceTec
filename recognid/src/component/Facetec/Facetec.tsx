import axios from 'axios';
import Script from 'next/script';
import React, { useCallback, useEffect, useState } from 'react';

import { Preloader } from '@component/Preloader';
import { View } from './View';
import { Controller } from './controllers';
import { Config } from './config/Config';
import { TFacetecProps } from './@types';
import { API_URIS, URLS } from '@root/routes';

export enum FLOW {
  ENROLL = 0, // Enroll User,
  ID_MATCH = 1, // Photo ID Match
}

function FacetecComponent(props: TFacetecProps) {
  const [faceTecSDK, setFaceTecSDK] = useState(null as typeof FaceTecSDK);
  const [controller, setController] = useState(null as Controller);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (faceTecSDK) {
      const getConfig = async () => {
        try {
          const response = await axios.get(URLS.DOMAIN + API_URIS.GET_CONFIG);

          if (response.status == 200) {
            return response.data.value;
          }
        } catch (err) {
          console.log(err);
        }
      };

      getConfig()
        .then((data) => {
          if (data) {
            const facetecConfig = {
              ProductionKey: '',
              BaseURL: data.base_url,
              DeviceKeyIdentifier: data.device_key,
              PublicFaceScanEncryptionKey: data.ssh_public_key,
            };

            const { config, ...restProps } = props;

            const cfg = new Config(
              faceTecSDK,
              Object.assign({}, restProps, config, facetecConfig)
            );

            setController(
              new Controller(faceTecSDK, cfg, {
                setInitialized,
              })
            );
          }

          return;
        })
        .catch((err) => console.log(err));
    }
  }, [faceTecSDK, props]);

  const renderFacetec = useCallback(() => {
    if (controller) {
      return <View initialized={initialized} controller={controller} />;
    }

    return <Preloader />;
  }, [controller, initialized]);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src="/facetec/FaceTecSDK.js"
        onLoad={() => setFaceTecSDK(FaceTecSDK)}
      />
      {renderFacetec()}
    </>
  );
}

export const Facetec = FacetecComponent;
