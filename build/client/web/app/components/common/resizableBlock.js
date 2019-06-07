import * as tslib_1 from "tslib";
import React, { useState, useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
var checkStyleEffectTimeout;
function ResizableBlock(_a) {
    var _b;
    var children = _a.children, _c = _a.limits, limits = _c === void 0 ? { heightMin: 0, heightMax: 0, widthMin: 0, widthMax: 0 } : _c, _d = _a.viewportMargins, viewportMargins = _d === void 0 ? { bottom: 0, right: 0 } : _d, axis = _a.axis, className = _a.className, _e = _a.resizerPosition, resizerPosition = _e === void 0 ? 'right' : _e;
    var containerRef = useRef(null);
    var isResizing = useRef(false);
    var _f = useState({ height: 0, width: 0, draggingClientY: 0, draggingClientX: 0 }), resizable = _f[0], setResizable = _f[1];
    useEffect(function () {
        var onMouseMove = function (evt) {
            if (isResizing.current) {
                var evtClientX_1 = evt.clientX;
                var evtClientY_1 = evt.clientY;
                setResizable(function (resizable) {
                    // No change
                    if (evtClientY_1 === resizable.draggingClientY && evtClientX_1 === resizable.draggingClientX)
                        return resizable;
                    var containerBoundaries = containerRef.current.getBoundingClientRect();
                    var newElemHeight = resizable.height;
                    var newElemWidth = resizable.width;
                    // x-axis
                    if (axis === 'both' || axis === 'x') {
                        var offsetX = evtClientX_1 - resizable.draggingClientX;
                        newElemWidth = resizable.width + offsetX;
                        var viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
                        var isDraggingRight = evtClientX_1 > resizable.draggingClientX;
                        // Don't allow to go outside viewport/limit
                        if (isDraggingRight && ((containerBoundaries.right + viewportMargins.right) >= viewportWidth))
                            newElemWidth = resizable.width;
                        if (limits.widthMax && newElemWidth > limits.widthMax)
                            newElemWidth = limits.widthMax;
                        else if (limits.widthMin && newElemWidth < limits.widthMin)
                            newElemWidth = limits.widthMin;
                    }
                    // y-axis
                    if (axis === 'both' || axis === 'y') {
                        var offsetY = evtClientY_1 - resizable.draggingClientY;
                        newElemHeight = resizable.height + offsetY;
                        var viewportHeigth = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
                        var isDraggingDown = evtClientY_1 > resizable.draggingClientY;
                        // Don't allow to go outside viewport/limit
                        if (isDraggingDown && ((containerBoundaries.bottom + viewportMargins.bottom) >= viewportHeigth))
                            newElemHeight = resizable.height;
                        if (limits.heightMax && newElemHeight > limits.heightMax)
                            newElemHeight = limits.heightMax;
                        else if (limits.heightMin && newElemHeight < limits.heightMin)
                            newElemHeight = limits.heightMin;
                    }
                    return {
                        height: newElemHeight,
                        width: newElemWidth,
                        draggingClientY: evtClientY_1,
                        draggingClientX: evtClientX_1
                    };
                });
            }
        };
        var onMouseLeaveOrUp = function (evt) { return isResizing.current = false; };
        var onDoneResizeTimeout;
        var onWindowResize = function (evt) {
            // Allow children to loose width momentariy so we can reduce container
            if (!onDoneResizeTimeout)
                setResizable(function (resizable) { return Object.assign({}, resizable, { width: 0 }); });
            // Clear style to allow element to resize on window resizing
            containerRef.current.style.width = null;
            clearTimeout(onDoneResizeTimeout);
            onDoneResizeTimeout = setTimeout(function () {
                setResizable(function (resizable) {
                    onDoneResizeTimeout = null;
                    return Object.assign({}, resizable, { width: containerRef.current.offsetWidth });
                });
            }, 100);
        };
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener('mouseleave', onMouseLeaveOrUp);
        document.addEventListener('mouseenter', onMouseLeaveOrUp);
        document.addEventListener('mouseup', onMouseLeaveOrUp);
        window.addEventListener('resize', onWindowResize);
        return function () {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseleave', onMouseLeaveOrUp);
            document.removeEventListener('mouseenter', onMouseLeaveOrUp);
            document.removeEventListener('mouseup', onMouseLeaveOrUp);
            window.removeEventListener('resize', onWindowResize);
        };
    }, [
        axis,
        limits.heightMax, limits.heightMin, limits.widthMax, limits.widthMin,
        viewportMargins.bottom, viewportMargins.right
    ]);
    useEffect(function () {
        // Allow container to finish adjusting
        setTimeout(function () {
            setResizable({
                height: containerRef.current.offsetHeight,
                width: containerRef.current.offsetWidth,
                draggingClientX: 0,
                draggingClientY: 0
            });
        }, 100);
    }, []);
    // (react bug?) somethimes, even when react state lifecycle runs OK the actual DOM don't reflec width style changes
    useEffect(function () {
        clearTimeout(checkStyleEffectTimeout);
        checkStyleEffectTimeout = setTimeout(function () {
            if (!containerRef || !containerRef.current)
                return;
            if (resizable.width && !(containerRef.current.style.width.includes(resizable.width)))
                containerRef.current.style.width = isNaN(resizable.width) ? resizable.width : resizable.width + "px";
        }, 200);
    });
    var onResizerMouseDown = useCallback(function (evt) {
        var clientY = evt.clientY;
        var clientX = evt.clientX;
        setResizable(function (resizableInfo) {
            isResizing.current = true;
            return {
                height: resizableInfo.height,
                width: resizableInfo.width,
                draggingClientY: clientY,
                draggingClientX: clientX
            };
        });
    }, []);
    var dimensionStyles = tslib_1.__assign({}, (resizable.height && { height: resizable.height }), (resizable.width && { width: resizable.width }));
    return (React.createElement("div", { ref: containerRef, style: dimensionStyles, className: classnames((_b = {}, _b[className] = !!className, _b)) },
        children({ dimensionStyles: dimensionStyles }),
        React.createElement("div", { className: classnames({
                'block-resizer-left': resizerPosition === 'left',
                'block-resizer-right': resizerPosition === 'right',
                'cursor-nwse-resize': axis === "both",
                'cursor-ew-resize': axis === 'x',
                'cursor-ns-resize': axis === 'y'
            }), onMouseDown: onResizerMouseDown })));
}
ResizableBlock.propTypes = {
    children: PropTypes.func.isRequired,
    limits: PropTypes.shape({
        heightMin: PropTypes.number,
        heightMax: PropTypes.number,
        widthMin: PropTypes.number,
        widthMax: PropTypes.number
    }),
    viewportMargins: PropTypes.shape({
        bottom: PropTypes.number,
        right: PropTypes.number
    }).isRequired,
    axis: PropTypes.oneOf(['x', 'y', 'both']).isRequired,
    className: PropTypes.string,
    resizerPosition: PropTypes.oneOf(['right', 'left'])
};
ResizableBlock.defaultProps = {
    viewportMargins: { top: 0, bottom: 0, left: 0, right: 0 },
    resizerPosition: 'right'
};
export default ResizableBlock;
//# sourceMappingURL=resizableBlock.js.map