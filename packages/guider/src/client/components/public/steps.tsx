import type { ReactNode } from 'react';

export interface StepsProps {
  children?: ReactNode;
}

export interface SingleStepProp {
  children?: ReactNode;
}

export interface StepComponent {
  (props: StepsProps): ReactNode;
  Step: (props: SingleStepProp) => ReactNode;
}

function StepsComponent(props: StepsProps) {
  return <div>{props.children}</div>;
}

function Step(props: SingleStepProp) {
  return <div>{props.children}</div>;
}

(StepsComponent as StepComponent).Step = Step;
export const Steps = StepsComponent;
