import classNames from 'classnames';
import _ from 'lodash';

import style from './Home.module.scss';

import { typeHomeComponentProps } from './@types';
import { Facetec } from '@component/Facetec';

function HomeComponent(props: typeHomeComponentProps) {
  const { title } = props.static;

  return (
    <>
      <h1 className={classNames(style.title)}>{title}</h1>
      <Facetec />
    </>
  );
}

export const Home = HomeComponent;
