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
  return (
    <div className="neato-guider-steps gd-mt-8 gd-mb-12 gd-relative">
      {props.children}
    </div>
  );
}

function Step(props: SingleStepProp) {
  return (
    <div className="gd-flex neato-guider-steps-step">
      <div className="neato-guider-steps-step-bubble gd-bg-bgLightest gd-rounded-full gd-relative gd-z-10 gd-text-white gd-size-8 gd-flex gd-justify-center gd-items-center gd-mr-4" />
      <div className="gd-flex-1 neato-guider-steps-step-content gd-mb-12">
        {props.children}
      </div>
    </div>
  );
}

(StepsComponent as StepComponent).Step = Step;
export const Steps = StepsComponent;
