import Link from 'next/link.js';

export function Logo() {
  return (
    <Link
      href="/"
      className="active:scale-105 hover:bg-bgLightest font-bold text-textHeading flex items-center rounded-md p-2 -ml-2 transition-[background-color,transform] duration-100"
    >
      <img src="/logo.svg" className="h-8 mr-2" /> NeatoJS
    </Link>
  );
}
