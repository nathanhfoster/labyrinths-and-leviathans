import { DependencyList, EffectCallback, useEffect } from 'react';
import useIsMounted from './useIsMounted';

const useEffectAfterMount = (callback: EffectCallback, dependencies: DependencyList) => {
    const mounted = useIsMounted();

    useEffect(() => (mounted ? callback() : undefined), dependencies);
};

export default useEffectAfterMount;
