import htmlParser from 'html-react-parser';
import Link from 'next/link';
import Image from 'next/image';
import classNames from 'classnames';

import style from './Home.module.scss';

import { typeHomeComponentProps, typeGridItem } from './@types';

function HomeComponent(props: typeHomeComponentProps) {
  const { title, description, grid, footer } = props.static;

  return (
    <div className={classNames('container', style.container)}>
      <main>
        <h1 className={style.title}>{htmlParser(title)}</h1>
        <p className={style.description}>{htmlParser(description)}</p>

        <div className={style.grid}>
          {grid.map((item: typeGridItem, index: number) => (
            <Link href={item.href} key={index}>
              <a href={item.href} className={style.card}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </a>
            </Link>
          ))}
        </div>
      </main>

      <footer>
        <a href={footer.href} target="_blank" rel="noopener noreferrer">
          {footer.text}{' '}
          <Image
            width={Math.round(100 * 1.618 * 100) / 100}
            height={100}
            src="/logo.svg"
            alt="Vercel"
            className="logo"
          />
        </a>
      </footer>

      {/* <style jsx>{``}</style> */}
      {/* <style jsx global>{``}</style> */}
    </div>
  );
}

export const Home = HomeComponent;
