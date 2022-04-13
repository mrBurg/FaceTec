import { ReactElement } from 'react';

type typeLayoutProps = {
  children: ReactElement;
};

export default function Layout(props: typeLayoutProps) {
  // return <div className="innerWrapper">{props.children}</div>;
  return props.children;
}
