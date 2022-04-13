import React from 'react';
import classNames from 'classnames';

import style from './Test.module.scss';

function TestComponent() {
  return <h1 className={classNames('h1', style.test)}>Test</h1>;
}

export const Test = TestComponent;
