import isObject from 'lodash/isObject';
/**
 * This function allows the state to be controlled by an HOC by overwritting it with props
 * @param {ReducerState} state
 * @param {ReducerState} props
 * @returns {ReducerState}
 */

const getDerivedStateFromProps = (state, props) => {
  if (!isObject(state)) {
    return state;
  }
  return {
    ...(state && {
      ...state,
    }),
    ...(props && {
      ...props,
    }),
  };
};

export default getDerivedStateFromProps;
