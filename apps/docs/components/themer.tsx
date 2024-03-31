import type { ThemeColorStoreColors } from '@neato/guider/client';
import { Button } from '@neato/guider/client';
import classNames from 'classnames';
import type { ReactNode } from 'react';
import React, { useState, useCallback, useRef } from 'react';
import type { HsbColor } from 'hooks/color-select';
import { hsbToColorToString, useColorSelect } from 'hooks/color-select';
import { makeColors, useGuideThemePicker } from 'hooks/use-guider-theme-picker';
import styles from './themer.module.css';

function ThemeColor(props: {
  color: HsbColor;
  name: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      className={classNames({
        'flex items-center text-left transition-colors duration-100 px-4 py-1.5 group hover:bg-bgLightest hover:text-textHeading text-text':
          true,
        '!bg-bgLightest !text-textHeading': props.active,
      })}
      onClick={props.onClick}
    >
      <span className="flex-1">{props.name}</span>
      <div
        className={classNames(
          'h-9 w-16 rounded-md border-white border-2 transition-none border-opacity-0 duration-100',
          {
            'group-hover:border-opacity-25': true,
            '!border-opacity-25': props.active,
          },
        )}
        style={{ background: hsbToColorToString(props.color) }}
      />
    </button>
  );
}

function ColorPicker(props: {
  color: HsbColor;
  onSelect: (c: HsbColor) => void;
}) {
  const { hueLeft, hueMouseDown, valueLeft, valueMouseDown, valueTop } =
    useColorSelect(props.color, props.onSelect);
  const stringColor = hsbToColorToString(props.color);
  return (
    <div className="space-y-2">
      <div className="h-[10rem] relative" onMouseDown={valueMouseDown}>
        <div
          style={{ '--picked-color': `hsl(${props.color[0]} 100% 50%)` } as any}
        >
          <div
            className={classNames(
              styles.value,
              'h-[10rem] border-2 border-bgLight rounded-lg',
            )}
          />
        </div>
        <div
          className="outline-white -translate-x-1/2 -translate-y-1/2 outline outline-[3px] z-10 absolute rounded-full h-2.5 w-2.5 pointer-events-none"
          style={{
            backgroundColor: stringColor,
            top: `${valueTop}%`,
            left: `${valueLeft}%`,
          }}
        />
      </div>
      <div onMouseDown={hueMouseDown} className="py-2">
        <div
          className={classNames(
            'h-2.5 rounded-full w-full relative',
            styles.hue,
          )}
        >
          <div
            className="outline-white outline absolute outline-[3px] transform rounded-full h-2.5 w-2.5 pointer-events-none"
            style={{
              backgroundColor: `hsl(${props.color[0]} 100% 50%)`,
              left: `${hueLeft}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export function ThemeColorPicker(props: {
  colors: [HsbColor, HsbColor];
  setColors: (n: [HsbColor, HsbColor]) => void;
  onGetCode?: (colors: [HsbColor, HsbColor]) => void;
}) {
  const { colors, setColors } = props;
  const [selectedColor, setSelectedColor] = useState(0);
  const currentColor = colors[selectedColor];

  const setColor = useCallback(
    (color: HsbColor) => {
      const newColors: [HsbColor, HsbColor] = [...colors];
      newColors[selectedColor] = color;
      setColors(newColors);
    },
    [selectedColor, colors],
  );

  return (
    <div className="border w-full bg-bgLight overflow-hidden rounded-2xl flex flex-col border-line">
      <div className="p-4 pb-4">
        <ColorPicker color={currentColor} onSelect={setColor} />
      </div>
      <hr className="border-0 border-b border-line" />
      <div className="flex mt-2 flex-col">
        <ThemeColor
          active={selectedColor === 0}
          name="Primary color"
          color={colors[0]}
          onClick={() => {
            setSelectedColor(0);
          }}
        />
        <ThemeColor
          active={selectedColor === 1}
          name="Background color"
          color={colors[1]}
          onClick={() => {
            setSelectedColor(1);
          }}
        />
      </div>
      <div className="p-4">
        <Button className="w-full" onClick={() => props.onGetCode?.(colors)}>
          Get the code
        </Button>
      </div>
    </div>
  );
}

export function Themer(props: {
  onGetCode?: (colors: ThemeColorStoreColors) => void;
}) {
  const [colors, setColors] = useGuideThemePicker();
  const onGetCode = useCallback(
    (c: [HsbColor, HsbColor]) => {
      props.onGetCode?.(makeColors(c));
    },
    [props.onGetCode],
  );

  return (
    <ThemeColorPicker
      colors={colors}
      setColors={setColors}
      onGetCode={onGetCode}
    />
  );
}

export function ThemerContainer(props: { children?: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const tokenRef = useRef<HTMLSpanElement | null>(null);
  const [hasCode, setHasCode] = useState(false);
  const onGetCode = useCallback((c: ThemeColorStoreColors) => {
    if (tokenRef.current) {
      tokenRef.current.innerText = JSON.stringify(c, null, 2);
      return;
    }
    if (ref.current) {
      setHasCode(true);
      const token = [
        ...ref.current.querySelectorAll('code [data-line] span'),
      ].find(
        (el) => (el as HTMLSpanElement).innerText === 'CODE',
      ) as HTMLSpanElement | null;
      if (token) {
        tokenRef.current = token;
        token.innerText = JSON.stringify(c, null, 2);
      }
    }
  }, []);

  return (
    <div
      className={hasCode ? 'relative mb-[24rem]' : 'relative [&_figure]:hidden'}
    >
      <div className="sm:p-8 mt-28 flex flex-col lg:flex-row sm:border sm:border-line rounded-xl">
        <div
          ref={ref}
          className="flex-1 py-12 mr-8 [&>*:first-child]:mt-0 [&>figure]:absolute [&>figure]:inset-x-0 [&>figure]:-bottom-12 [&>figure]:translate-y-full"
        >
          {props.children}
        </div>
        <div className="lg:w-[17rem] relative">
          <div className="lg:absolute inset-x-0 bottom-0">
            <Themer onGetCode={onGetCode} />
          </div>
        </div>
      </div>
    </div>
  );
}
