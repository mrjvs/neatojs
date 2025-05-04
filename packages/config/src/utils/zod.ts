import { z } from 'zod';

export const zodCoercedBoolean = () =>
  z.preprocess((val) => {
    if (typeof val === 'boolean') return val;
    if (typeof val !== 'string') return false;
    const lowercased = val.toLowerCase().trim();
    if (lowercased === 'true' || lowercased === 'yes') return true;
    return false;
  }, z.boolean());
