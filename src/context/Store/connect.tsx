import { memo, useContext } from 'react';
import { ConnectType } from '../types';

//@ts-ignore
const connect: ConnectType = mapStateToPropsArray => {
  //@ts-ignore
  return Component => {
    const PureComponent = memo(Component);
    //@ts-ignore
    return ownProps => {
      //@ts-ignore
      const stateToProps = mapStateToPropsArray.reduce((acc, item) => {
        const { context, mapStateToProps } = item;
        const contextState = useContext(context);
        const props =
          mapStateToProps instanceof Function
            ? mapStateToProps(contextState, ownProps)
            : {};
        const newProps = { ...acc, ...props };
        return newProps;
      }, {});

      return <PureComponent {...stateToProps} {...ownProps} />;
    };
  };
};

export default connect;
