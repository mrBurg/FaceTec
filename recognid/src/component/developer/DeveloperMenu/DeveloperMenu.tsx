import React, {
  MouseEvent,
  useEffect,
  useState,
  useRef,
  ReactElement,
} from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import Router from 'next/router';

import style from './DeveloperMenu.module.scss';

import { TDeveloperMenuProps, TRoutes } from './@types';

function DeveloperMenuComponent(props: TDeveloperMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  const [float, setFloat] = useState(false);
  const [routesSorted, setRoutesSorted] = useState<TRoutes>({});
  const [devMenu, setDevMenu] = useState<ReactElement | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setRoutesSorted(props.routes), [props.routes]);

  useEffect(() => {
    if (props.render) {
      setDevMenu(
        <div
          ref={menuRef}
          className={classNames(style.developerMenu, {
            [style.scrolled]: scrolled,
          })}
          onDoubleClick={() => setDevMenu(null)}
          onContextMenu={(event: MouseEvent<HTMLDivElement>) => {
            event.preventDefault();

            setFloat(!float);

            if (menuRef && menuRef.current) {
              menuRef.current.style.right = float ? '0' : 'auto';
            }
          }}
          onMouseUp={(event: MouseEvent<HTMLDivElement>) =>
            event.button == 1 && setDevMenu(null)
          }
          onMouseEnter={(event) =>
            setScrolled(event.currentTarget.offsetHeight > window.innerHeight)
          }
          onMouseLeave={() => setScrolled(false)}
          aria-hidden
        >
          <p>Developer Menu</p>
          <ul className={style.list}>
            {_.map(routesSorted, (item: string, index: number) => (
              <li key={index} className={style.item}>
                <button
                  type={'button'}
                  className={style.link}
                  onClick={() => Router.replace(item)}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>
      );
    }
  }, [setRoutesSorted, float, scrolled, props.render, routesSorted]);

  return devMenu;
}

export const DeveloperMenu = DeveloperMenuComponent;
