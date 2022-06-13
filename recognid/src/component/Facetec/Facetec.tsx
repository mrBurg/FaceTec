import axios from 'axios';
import Script from 'next/script';
import React, { useCallback, useEffect, useState } from 'react';

import { View } from './View';
import { Controller } from './controllers';
import { Config } from './config/Config';
import { TFacetecProps, TGetConfigProps } from './@types';

export enum FLOW {
  ENROLL = 0, // Enroll User,
  ID_MATCH = 1, // Photo ID Match
}

function FacetecComponent(props: TFacetecProps) {
  const { paths } = props;

  const [faceTecSDK, setFaceTecSDK] = useState(null as typeof FaceTecSDK);
  const [controller, setController] = useState(null as Controller);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (faceTecSDK) {
      const { config, paths, ...restProps } = props;

      console.log('Partner key ' + config.partner); // Используется для получения логотипа и локализации

      const getConfig = async () => {
        try {
          const response = await axios.get(paths.getConfig, {
            params: { id: config.id },
          });

          if (response.status == 200) {
            return response.data.value as TGetConfigProps;
          }
        } catch (err) {
          console.log(err);
        }
      };

      getConfig()
        .then((data) => {
          if (data) {
            const facetecConfig = {
              ProductionKey: data.production_key,
              DeviceKeyIdentifier: data.device_key,
              PublicFaceScanEncryptionKey: data.ssh_public_key,
              paths: {
                ...paths,
                base_url: data.base_url,
              },
            };

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

    return props.preloader;
  }, [controller, initialized, props.preloader]);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={paths.facetecSDK}
        onLoad={() => setFaceTecSDK(FaceTecSDK)}
      />
      {renderFacetec()}
    </>
  );
}

export const Facetec = FacetecComponent;
