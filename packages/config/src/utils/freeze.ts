type DeepReadonlyCond<T> = T extends (infer R)[]
  ? DeepReadonlyArray<R>
  : T extends (...a: any[]) => any
    ? T
    : T extends object
      ? DeepReadonly<T>
      : T;

type DeepReadonlyArray<T> = readonly DeepReadonlyCond<T>[];

export type DeepReadonly<T> = {
  readonly [P in keyof T]: DeepReadonlyCond<T[P]>;
};

type DeepWriteableCond<T> = T extends (infer R)[]
  ? DeepWriteableArray<R>
  : T extends (...a: any[]) => any
    ? T
    : T extends object
      ? DeepWriteable<T>
      : T;

type DeepWriteableArray<T> = DeepWriteableCond<T>[];

export type DeepWriteable<T> = {
  -readonly [P in keyof T]: DeepWriteableCond<T[P]>;
};

export function deepFreeze<T>(object: T): DeepReadonly<T> {
  const obj = object as any;
  const propNames = Reflect.ownKeys(obj);

  for (const name of propNames) {
    const value = obj[name];
    if (value && typeof value === 'object') deepFreeze(value);
  }

  return Object.freeze(obj);
}
