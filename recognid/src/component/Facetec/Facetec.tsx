import axios from 'axios';
import Script from 'next/script';
import React, { useCallback, useEffect, useState } from 'react';

import { Preloader } from '@component/Preloader';
import { View } from './View';
import { Controller } from './controllers';
import { ViewAuditTrail } from './View/ViewAuditTrail';
import { TauditTrail } from './View/@types';
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
  const [auditTrail, setAuditTrail] = useState(null as TauditTrail);
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
              PublicFaceScanEncryptionKey: `-----BEGIN PUBLIC KEY-----
              MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5PxZ3DLj+zP6T6HFgzzk
              M77LdzP3fojBoLasw7EfzvLMnJNUlyRb5m8e5QyyJxI+wRjsALHvFgLzGwxM8ehz
              DqqBZed+f4w33GgQXFZOS4AOvyPbALgCYoLehigLAbbCNTkeY5RDcmmSI/sbp+s6
              mAiAKKvCdIqe17bltZ/rfEoL3gPKEfLXeN549LTj3XBp0hvG4loQ6eC1E1tRzSkf
              GJD4GIVvR+j12gXAaftj3ahfYxioBH7F7HQxzmWkwDyn3bqU54eaiB7f0ftsPpWM
              ceUaqkL2DZUvgN0efEJjnWy5y1/Gkq5GGWCROI9XG/SwXJ30BbVUehTbVcD70+ZF
              8QIDAQAB
              -----END PUBLIC KEY-----`,
            };

            const { config, ...restProps } = props;

            const cfg = new Config(
              faceTecSDK,
              Object.assign({}, restProps, config, facetecConfig)
            );

            setController(
              new Controller(faceTecSDK, cfg, {
                setAuditTrail,
                setInitialized,
              })
            );
          }

          return;
        })
        .catch((err) => console.log(err));
    }
  }, [faceTecSDK, props]);

  const renderAuditTrail = useCallback(() => {
    if (auditTrail) {
      return <ViewAuditTrail auditTrail={auditTrail} controller={controller} />;
    }
  }, [auditTrail, controller]);

  const renderFacetec = useCallback(() => {
    if (controller) {
      return (
        <>
          <View initialized={initialized} controller={controller} />
          {renderAuditTrail()}
        </>
      );
    }

    return <Preloader />;
  }, [controller, initialized, renderAuditTrail]);

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
