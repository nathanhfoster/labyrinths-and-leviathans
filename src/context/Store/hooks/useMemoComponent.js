/* eslint-disable react/jsx-props-no-spreading */
import { useRef, useMemo } from 'react';
import isFunction from 'lodash/isFunction';
import usePreviousValue from '~lib/utils/Hooks/usePreviousValue';

/**
 * Hook that controls the reference of a component to only update when it's previous and next props differ
 * @param {JSX.Element} Component
 * @param {*} props
 * @param {object} ref
 * @param {function} isEqual
 * @returns {JSX.Element}
 */
const useMemoComponent = ({ Component, props, ref, isEqual }) => {
  const previousProps = usePreviousValue(props);

  // Component ref instance
  const componentRef = useRef(Component);
  const componentPropsRef = useRef(props);

  const renderComponent = useMemo(() => {
    // Use the previous component and props instance
    let FinalComponent = componentRef.current;
    let finalProps = componentPropsRef.current;

    // Check if props have stayed the same
    const arePropsEqual = isFunction(isEqual) ? isEqual(previousProps, props) : false;

    // If the props differ update the reference of the component instance and it's props
    if (!arePropsEqual) {
      componentRef.current = Component;
      componentPropsRef.current = props;
      FinalComponent = Component;
      finalProps = props;
    }

    return FinalComponent ? <FinalComponent {...finalProps} ref={ref} /> : null;
  }, [props, Component]);

  return renderComponent;
};

export default useMemoComponent;
