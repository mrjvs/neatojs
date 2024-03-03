import type { ReactNode } from 'react';

interface CustomComponentOptions {
  component: () => ReactNode;
}

export interface CustomComponentComponent {
  type: 'component';
  component: () => ReactNode;
}

export interface CustomComponentBuilder {
  (component: () => ReactNode): CustomComponentComponent;
  (options: CustomComponentOptions): CustomComponentComponent;
}

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
