import { DependencyList, EffectCallback, useEffect } from 'react';
import useMounted from './useMounted';

const useEffectAfterMount: (callback: EffectCallback, dependencies: DependencyList) => void = (callback, dependencies) => {
  const mounted = useMounted();

  useEffect(() => (mounted ? callback() : undefined), dependencies);
};

export default useEffectAfterMount;
