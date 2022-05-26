import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { View } from './view';

// import style from './AuditTrail.module.scss';

import { Preloader } from '@component/Preloader';
import { TauditTrail } from './@types';

function AuditTrailComponent() {
  const [auditTrail, setAuditTrail] = useState(null as TauditTrail);
  // const { staticData } = props;

  useEffect(() => {
    const getAuditTrail = async () => {
      try {
        const SessionResult = await axios.post('/api/facetec/sessionResult');
        const IDScanResult = await axios.post('/api/facetec/IDScanResult');
        const documentData = await axios.post('/api/facetec/documentData');

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
