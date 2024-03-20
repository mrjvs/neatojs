import type { ReactNode } from 'react';

function Container(props: { children?: ReactNode }) {
  return <div className="max-w-3xl my-20 mx-auto">{props.children}</div>;
}

function Title(props: { children?: ReactNode }) {
  return (
    <h1 className="text-[2rem] text-textHeading mb-6 font-bold max-w-md">
      {props.children}
    </h1>
  );
}

function Subtitle(props: { children?: ReactNode }) {
  return (
    <p className="text-lg leading-normal max-w-md mb-16">{props.children}</p>
  );
}

export const Home = {
  Container,
  Title,
  Subtitle,
};
