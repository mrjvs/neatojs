import type { CustomComponentBuilder } from './types';

export const component: CustomComponentBuilder = (componentOrOptions) => {
  if (typeof componentOrOptions !== 'function') {
    return {
      ...componentOrOptions,
      type: 'component',
    };
  }
  return {
    component: componentOrOptions,
    type: 'component',
  };
};
