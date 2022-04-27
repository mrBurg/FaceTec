import axios from 'axios';
import _ from 'lodash';
import Script from 'next/script';
import React, { useCallback, useEffect, useState } from 'react';

import { Preloader } from '@component/Preloader';
import { View } from './View';
import { Controller } from './Controller';
import { Config } from './Config';
import { ViewAuditTrail } from './View/ViewAuditTrail';
import { TauditTrail } from './View/@types';

function FacetecComponent() {
  const [faceTecSDK, setFaceTecSDK] = useState(null as typeof FaceTecSDK);
  const [config, setConfig] = useState(null as Config);
  const [controller, setController] = useState(null as Controller);
  const [auditTrail, setAuditTrail] = useState(null as TauditTrail);

  useEffect(() => {
    const getConfig = async () => {
      try {
        const response = await axios.post('/api/config/facetec');

        if (response.status == 200) {
          return response.data;
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (typeof FaceTecSDK != String(void 0)) {
      getConfig().then((data) => {
        if (data) {
          setFaceTecSDK(FaceTecSDK);
          setConfig(new Config(data));
        }
      });
    }
  }, [faceTecSDK]);

  useEffect(() => {
    if (faceTecSDK && config) {
      setController(new Controller(faceTecSDK, config, { setAuditTrail }));
    }
  }, [config, faceTecSDK]);

  const renderAuditTrail = useCallback(() => {
    if (auditTrail) {
      return <ViewAuditTrail auditTrail={auditTrail} controller={controller} />;
    }
  }, [auditTrail, controller]);

  const renderFacetec = useCallback(() => {
    if (controller) {
      return (
        <>
          <View controller={controller} />
          {renderAuditTrail()}
        </>
      );
    }

    return <Preloader />;
  }, [controller, renderAuditTrail]);

  return (
    <>
      <Script strategy="beforeInteractive" src="/facetec/FaceTecSDK.js" />
      {renderFacetec()}
    </>
  );
}

export const Facetec = FacetecComponent;
