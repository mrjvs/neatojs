export interface SeperatorComponent {
  type: 'seperator';
}

export type SeperatorBuilder = () => SeperatorComponent;

export const seperator: SeperatorBuilder = () => {
  return {
    type: 'seperator',
  };
};
