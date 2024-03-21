import { useCallback, useEffect, useRef } from 'react';

export type HsbColor = [number, number, number];

function hsbToHsl(
  hue: number,
  sat: number,
  value: number,
): [number, number, number] {
  const lightness = ((2 - sat) * value) / 2;
  let newSat = sat;

  if (lightness !== 0) {
    if (lightness === 1) {
      newSat = 0;
    } else if (lightness < 0.5) {
      newSat = (sat * value) / (lightness * 2);
    } else {
      newSat = (sat * value) / (2 - lightness * 2);
    }
  }

  return [hue, newSat, lightness];
}

export function hsbToColorToString(hsbColor: HsbColor): string {
  const c = hsbToHsl(...hsbColor);
  return `hsl(${c[0]} ${c[1] * 100}% ${c[2] * 100}%)`;
}

function stopEvent(e: MouseEvent) {
  e.stopPropagation();
  e.preventDefault();
}

function useColorValueSelect(color: HsbColor, cb: (color: HsbColor) => void) {
  const top = (1 - color[2]) * 100;
  const left = color[1] * 100;

  const destroy = useRef<null | (() => void)>(null);

  const onMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!e.target) return;
      stopEvent(e.nativeEvent);
      const el = e.target as HTMLDivElement;
      const rect = el.getBoundingClientRect();
      function onMouseMove(ev: MouseEvent) {
        stopEvent(ev);
        const xPerc = Math.max(
          0,
          Math.min(1, (ev.x - rect.left) / (rect.right - rect.left)),
        );
        const yPerc = Math.max(
          0,
          Math.min(1, (ev.y - rect.top) / (rect.bottom - rect.top)),
        );
        cb([color[0], xPerc, 1 - yPerc]);
      }

      function onMouseUp() {
        destroy.current?.();
        destroy.current = null;
      }

      onMouseMove(e.nativeEvent);
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
      destroy.current = () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };
    },
    [cb, color],
  );

  useEffect(() => {
    return () => {
      destroy.current?.();
    };
  }, []);

  return {
    top,
    left,
    onMouseDown,
  };
}

function useColorHueSelect(color: HsbColor, cb: (color: HsbColor) => void) {
  const left = (color[0] / 360) * 100;
  const destroy = useRef<null | (() => void)>(null);

  const onMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!e.target) return;
      stopEvent(e.nativeEvent);
      const el = e.target as HTMLDivElement;
      const rect = el.getBoundingClientRect();
      function onMouseMove(ev: MouseEvent) {
        stopEvent(ev);
        const xPerc = Math.max(
          0,
          Math.min(1, (ev.x - rect.left) / (rect.right - rect.left)),
        );
        cb([Math.round(xPerc * 360), color[1], color[2]]);
      }

      function onMouseUp() {
        destroy.current?.();
        destroy.current = null;
      }

      onMouseMove(e.nativeEvent);
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
      destroy.current = () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };
    },
    [cb, color],
  );

  useEffect(() => {
    return () => {
      destroy.current?.();
    };
  }, []);

  return {
    left,
    onMouseDown,
  };
}

export function useColorSelect(color: HsbColor, cb: (color: HsbColor) => void) {
  const value = useColorValueSelect(color, cb);
  const hue = useColorHueSelect(color, cb);

  return {
    valueLeft: value.left,
    valueTop: value.top,
    valueMouseDown: value.onMouseDown,
    hueLeft: hue.left,
    hueMouseDown: hue.onMouseDown,
  };
}
