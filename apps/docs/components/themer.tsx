import { Button } from '@neato/guider/client';
import classNames from 'classnames';
import type { ReactNode } from 'react';
import React, { useState, useCallback } from 'react';
import type { HsbColor } from 'hooks/color-select';
import { hsbToColorToString, useColorSelect } from 'hooks/color-select';
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
          className="absolute inset-0 rounded-lg overflow-hidden"
          style={{
            backgroundColor: `hsl(${props.color[0]} 100% 50%)`,
          }}
        >
          <div className={styles['value-overlay-one']} />
          <div className={styles['value-overlay-two']} />
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

export function Themer() {
  const [colors, setColors] = useState<HsbColor[]>([
    [259, 0.5, 1],
    [197, 0.74, 0.07],
  ]);
  const [selectedColor, setSelectedColor] = useState(0);
  const currentColor = colors[selectedColor];

  const setColor = useCallback(
    (color: HsbColor) => {
      setColors((oldColors) => {
        const newColors = [...oldColors];
        newColors[selectedColor] = color;
        return newColors;
      });
    },
    [selectedColor],
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
        <Button className="w-full">Get the code</Button>
      </div>
    </div>
  );
}

export function ThemerContainer(props: { children?: ReactNode }) {
  return (
    <div className="p-8 mt-28 flex border border-line rounded-xl">
      <div className="flex-1 py-12 mr-8 [&>*:first-child]:mt-0">
        {props.children}
      </div>
      <div className="w-[17rem] relative">
        <div className="absolute inset-x-0 bottom-0">
          <Themer />
        </div>
      </div>
    </div>
  );
}
