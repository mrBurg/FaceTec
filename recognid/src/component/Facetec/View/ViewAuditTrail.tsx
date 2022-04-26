import React from 'react';
import { TViewAuditTrailProps } from './@types';

function ViewAuditTrailComponent(props: TViewAuditTrailProps) {
  console.log(props.auditTrail);

  return <h1>999</h1>;
}

export const ViewAuditTrail = ViewAuditTrailComponent;
