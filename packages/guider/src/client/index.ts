import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

library.add(fas, fab, far);

export * from './virtuals';
export * from './page/create-mdx-page';
export * from './theme';
export * from './types';
export { useMDXComponents } from './components/markdown';
