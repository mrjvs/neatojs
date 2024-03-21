import type { ReactNode } from 'react';

function Container(props: { children?: ReactNode }) {
  return <div className="max-w-5xl my-20 mx-auto">{props.children}</div>;
}

function Title(props: { children?: ReactNode }) {
  return (
    <h1 className="text-xl md:text-2xl text-center mx-auto text-textHeading mb-6 font-bold max-w-lg">
      {props.children}
    </h1>
  );
}

function Subtitle(props: { children?: ReactNode }) {
  return (
    <p className="text-base text-center mx-auto leading-normal max-w-lg mb-28">
      {props.children}
    </p>
  );
}

function Tag(props: { children?: ReactNode }) {
  return (
    <p className="text-sm mb-4 font-bold text-center text-primary">
      {props.children}
    </p>
  );
}

export const Showcase = {
  Container,
  Title,
  Subtitle,
  Tag,
};
