import React, { ReactElement } from 'react';
import PropTypes from 'prop-types';

export interface IRenderPropsWrapProps {
  children: (...props: any[]) => ReactElement;
  other?: any[];
}

function RenderPropsWrap({ children, ...other }: IRenderPropsWrapProps) {
  return (
    <React.Fragment>{children(other)}</React.Fragment>
  );
}

RenderPropsWrap.propTypes = {
  children: PropTypes.func.isRequired
};

export default RenderPropsWrap;