import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import classNames from 'classnames';
import _ from 'lodash';

import style from './Home.module.scss';

import { THomeComponentProps } from './@types';
import { Facetec } from '@component/Facetec';
import { TConfigProps } from '@component/Facetec/@types';

function HomeComponent(props: THomeComponentProps) {
  const { staticData } = props;

  const [config, setConfig] = useState(null as TConfigProps);

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

    getConfig().then((data) => {
      if (data) {
        setConfig(data);
      }
    });
  }, []);

  const renderFacetec = useCallback(() => {
    if (config) {
      return <Facetec config={config} />;
    }
  }, [config]);

  return (
    <>
      <h1 className={classNames(style.title)}>{staticData.title}</h1>
      {renderFacetec()}
    </>
  );
}

export const Home = HomeComponent;
