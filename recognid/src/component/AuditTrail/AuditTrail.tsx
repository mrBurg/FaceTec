import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { View } from './view';

// import style from './AuditTrail.module.scss';

import { Preloader } from '@component/Preloader';
import { TAuditTrail } from './@types';
import { API_URIS } from '@root/routes';
import { makeUrl } from '@root/utils';

function AuditTrailComponent() {
  const [auditTrail, setAuditTrail] = useState(null as TAuditTrail);

  useEffect(() => {
    const getAuditTrail = async () => {
      console.log(makeUrl(process.env.HTTPS_SERVER, API_URIS.SESSION_RESULT));

      try {
        const SessionResult = await axios.post(
          makeUrl(process.env.HTTPS_SERVER, API_URIS.SESSION_RESULT)
        );
        const IDScanResult = await axios.post(
          makeUrl(process.env.HTTPS_SERVER, API_URIS.ID_SCAN_RESULT)
        );
        const documentData = await axios.post(
          makeUrl(process.env.HTTPS_SERVER, API_URIS.DOCUMENT_DATA)
        );

        return {
          SessionResult: SessionResult.data,
          IDScanResult: IDScanResult.data,
          documentData: documentData.data,
        };
      } catch (err) {
        console.log(err);
      }

      return;
    };

    getAuditTrail()
      .then((data) => {
        console.log(data);

        if (data) {
          setAuditTrail(data);
        }

        return;
      })
      .catch((err) => console.log(err));
  }, []);

  if (auditTrail) {
    return <View auditTrail={auditTrail} />;
  }

  return <Preloader />;
}

export const AuditTrail = AuditTrailComponent;
