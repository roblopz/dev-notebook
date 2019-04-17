import React, { ReactElement } from 'react';
import PropTypes from 'prop-types';

interface RenderPropsWrapProps {
  children: (...props: any[]) => ReactElement;
  other?: any[];
}

function RenderPropsWrap({ children, ...other }: RenderPropsWrapProps) {
  return (
    <React.Fragment>{children(other)}</React.Fragment>
  );
}

RenderPropsWrap.propTypes = {
  children: PropTypes.func.isRequired
};

export default RenderPropsWrap;