import htmlParser from 'html-react-parser';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import { GetStaticPropsContext } from 'next';
import axios from 'axios';
import { ReactElement } from 'react';

// import { Test } from '@component/test';

type typeDomains = Record<'domain' | 'defaultLocale', string> & {
  locales: string[];
};

type typePageProps = {
  context: {
    locales: string[];
    defaultLocale: string;
    domains: typeDomains[];
  };
  static: Record<string, ReturnType<typeof Object.create>>;
};

type typeGridItem = Record<'href' | 'title' | 'text', string>;

function HomeComponent(props: typePageProps) {
  const { title, description, grid, footer } = props.static;

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {/* <Test /> */}
        <h1 className="title">{htmlParser(title)}</h1>
        <p className="description">{htmlParser(description)}</p>

        <div className="grid">
          {grid.map((item: typeGridItem, index: number) => (
            <Link href={item.href} key={index}>
              <a href={item.href} className="card">
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

      {/* <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style> */}

      {/* <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style> */}
    </div>
  );
}

HomeComponent.getLayout = (children: ReactElement) => {
  return (
    // <div className="pageWrapper">
    children
    // </div>
  );
};

export default HomeComponent;

export async function getStaticProps(context: GetStaticPropsContext) {
  const response = await axios.get('/api/static');

  if (response.status == 200) {
    return { props: { context, static: response.data } as typePageProps };
  }

  return { props: {} as typePageProps };
}
