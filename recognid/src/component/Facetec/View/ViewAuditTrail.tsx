import React, { useCallback } from 'react';
import Image from 'next/image';

import style from './Facetec.module.scss';

import { TViewAuditTrailProps } from './@types';
import _ from 'lodash';

function ViewAuditTrailComponent(props: TViewAuditTrailProps) {
  const { auditTrail, controller } = props;

  console.log(auditTrail);
  const renderScanResultBlob = useCallback(() => {
    const { scanResultBlob } = auditTrail;

    if (scanResultBlob) {
      return (
        <dl className={style.descriptionList}>
          <dt>scanResultBlob</dt>
          <dd>{scanResultBlob}</dd>
        </dl>
      );
    }
  }, [auditTrail]);

  const renderSessionResult = useCallback(() => {
    const { SessionResult } = auditTrail;

    if (SessionResult) {
      return (
        <>
          <h3>SessionResult</h3>
          <dl className={style.descriptionList}>
            <dt>sessionId</dt>
            <dd>{SessionResult.sessionId}</dd>
            <dt>faceScan</dt>
            <dd>{SessionResult.faceScan.substring(0, 50)}...</dd>
            <dt>auditTrail</dt>
            <dd>
              {_.map(SessionResult.auditTrail, (item, index) => (
                <Image
                  key={index}
                  src={`data:image/jpeg;base64,${item}`}
                  alt={'faceScan'}
                  width={'100px'}
                  height={'161px'}
                  layout="fixed"
                />
              ))}
            </dd>
            <dt>lowQualityAuditTrail</dt>
            <dd>
              {_.map(SessionResult.lowQualityAuditTrail, (item, index) => (
                <Image
                  key={index}
                  src={`data:image/jpeg;base64,${item}`}
                  alt={'faceScan'}
                  width={'100px'}
                  height={'161px'}
                  layout="fixed"
                />
              ))}
            </dd>
          </dl>
        </>
      );
    }
  }, [auditTrail]);

  const renderIDScanResult = useCallback(() => {
    const { IDScanResult } = auditTrail;

    if (IDScanResult) {
      return (
        <>
          <h3>IDScanResult</h3>
          <dl className={style.descriptionList}>
            <dt>sessionId</dt>
            <dd>{IDScanResult.sessionId}</dd>
            <dt>faceScan</dt>
            <dd>{IDScanResult.idScan.substring(0, 50)}...</dd>
            <dt>frontImages</dt>
            <dd>
              {_.map(IDScanResult.frontImages, (item, index) => (
                <Image
                  key={index}
                  src={`data:image/jpeg;base64,${item}`}
                  alt={'faceScan'}
                  width={'161px'}
                  height={'100px'}
                  layout="fixed"
                />
              ))}
            </dd>
            <dt>backImages</dt>
            <dd>
              {_.map(IDScanResult.backImages, (item, index) => (
                <Image
                  key={index}
                  src={`data:image/jpeg;base64,${item}`}
                  alt={'faceScan'}
                  width={'161px'}
                  height={'100px'}
                  layout="fixed"
                />
              ))}
            </dd>
          </dl>
        </>
      );
    }
  }, [auditTrail]);

  return (
    <div className={style.auditTrail}>
      <button onClick={() => controller.closeAuditTrail()}>Close</button>
      {renderScanResultBlob()}
      <hr />
      {renderSessionResult()}
      <hr />
      {renderIDScanResult()}
    </div>
  );
}

export const ViewAuditTrail = ViewAuditTrailComponent;
