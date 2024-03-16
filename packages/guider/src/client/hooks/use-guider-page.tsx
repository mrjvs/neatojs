import { useContext } from 'react';
import { GuiderLayoutContext } from '../page/context';
import { useGuider } from './use-guider';

export function useGuiderPage() {
  const context = useContext(GuiderLayoutContext);
  const guider = useGuider(context?.meta);

  return {
    ...guider,
    page: context,
  };
}
