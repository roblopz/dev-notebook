import * as tslib_1 from "tslib";
import React from 'react';
import PropTypes from 'prop-types';
function RenderPropsWrap(_a) {
    var children = _a.children, other = tslib_1.__rest(_a, ["children"]);
    return (React.createElement(React.Fragment, null, children(other)));
}
RenderPropsWrap.propTypes = {
    children: PropTypes.func.isRequired
};
export default RenderPropsWrap;
//# sourceMappingURL=renderPropsWrap.js.map