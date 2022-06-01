import _ from 'lodash';
import React, { Fragment, useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import style from './View.module.scss';

import { TViewAuditTrailProps } from '../@types';

function ViewComponent(props: TViewAuditTrailProps) {
  const { auditTrail } = props;

  const router = useRouter();

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

  const renderDocumentData = useCallback(() => {
    const { documentData } = auditTrail;
    const ocrResultsData = JSON.parse(documentData.ocrResults as string);

    return _.map(
      ocrResultsData.ocrResults.userConfirmed.groups,
      (item, index) => (
        <form key={index}>
          <fieldset>
            <legend>{item.groupFriendlyName}</legend>
            {_.map(item.fields, (fieldItem, fieldIndex) => (
              <div className={style.field} key={fieldIndex}>
                <label htmlFor={fieldItem.fieldKey}>{fieldItem.fieldKey}</label>
                <input
                  id={fieldItem.fieldKey}
                  type="text"
                  defaultValue={fieldItem.value}
                />
              </div>
            ))}
          </fieldset>
        </form>
      )
    );
  }, [auditTrail]);

  return (
    <div className={style.auditTrail}>
      <button onClick={() => router.replace('/')}>Close</button>
      {renderSessionResult()}
      <hr />
      {renderIDScanResult()}
      <hr />
      {renderDocumentData()}
    </div>
  );
}

export const View = ViewComponent;
