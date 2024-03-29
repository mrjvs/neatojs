export interface SeparatorComponent {
  type: 'separator';
}

export type SeparatorBuilder = () => SeparatorComponent;

export const separator: SeparatorBuilder = () => {
  return {
    type: 'separator',
  };
};
