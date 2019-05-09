import React, { useState, useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export type axis = 'x' | 'y' | 'both';

export interface IResizableBlockProps {
  children: ({ dimensionStyles }: { dimensionStyles: { height: number | string, width: number | string } }) => React.ReactElement;
  limits?: { heightMin?: number, heightMax?: number, widthMin?: number, widthMax?: number };
  viewportMargins?: { bottom?: number, right?: number };
  axis: axis;
  className?: string;
  resizerPosition?: 'right' | 'left';
}

let checkStyleEffectTimeout: NodeJS.Timeout;

function ResizableBlock({
  children,
  limits = { heightMin: 0, heightMax: 0, widthMin: 0, widthMax: 0 },
  viewportMargins = { bottom: 0, right: 0 },
  axis,
  className,
  resizerPosition = 'right'
}: IResizableBlockProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isResizing = useRef(false);
  const [resizable, setResizable] = useState({ height: 0, width: 0, draggingClientY: 0, draggingClientX: 0 });

  useEffect(() => {
    const onMouseMove = (evt: MouseEvent) => {
      if (isResizing.current) {
        const evtClientX = evt.clientX;
        const evtClientY = evt.clientY;

        setResizable(resizable => {
          // No change
          if (evtClientY === resizable.draggingClientY && evtClientX === resizable.draggingClientX)
            return resizable;

          const containerBoundaries = containerRef.current.getBoundingClientRect();
          let newElemHeight = resizable.height;
          let newElemWidth = resizable.width;

          // x-axis
          if (axis === 'both' || axis === 'x') {
            const offsetX = evtClientX - resizable.draggingClientX;
            newElemWidth = resizable.width + offsetX;

            const viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
            const isDraggingRight = evtClientX > resizable.draggingClientX;

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
            const offsetY = evtClientY - resizable.draggingClientY;
            newElemHeight = resizable.height + offsetY;

            const viewportHeigth = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
            const isDraggingDown = evtClientY > resizable.draggingClientY;

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
            draggingClientY: evtClientY,
            draggingClientX: evtClientX
          };
        });
      }
    };

    const onMouseLeaveOrUp = (evt: MouseEvent) => isResizing.current = false;

    let onDoneResizeTimeout: NodeJS.Timeout;
    const onWindowResize = (evt: UIEvent): void => {
      // Allow children to loose width momentariy so we can reduce container
      if (!onDoneResizeTimeout)
        setResizable(resizable => Object.assign({}, resizable, { width: 0 }));

      // Clear style to allow element to resize on window resizing
      containerRef.current.style.width = null;
      clearTimeout(onDoneResizeTimeout);

      onDoneResizeTimeout = setTimeout(() => {
        setResizable(resizable => {
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

    return () => {
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

  useEffect(() => {
    // Allow container to finish adjusting
    setTimeout(() => {
      setResizable({
        height: containerRef.current.offsetHeight,
        width: containerRef.current.offsetWidth,
        draggingClientX: 0,
        draggingClientY: 0
      });
    }, 100);
  }, []);

  // (react bug?) somethimes, even when react state lifecycle runs OK the actual DOM don't reflec width style changes
  useEffect(() => {
    clearTimeout(checkStyleEffectTimeout);

    checkStyleEffectTimeout = setTimeout(() => {
      if (resizable.width && !(containerRef.current.style.width.includes(resizable.width as any)))
        containerRef.current.style.width = isNaN(resizable.width) ? resizable.width as unknown as string : `${resizable.width}px`;      
    }, 200);
  });

  const onResizerMouseDown = useCallback((evt: React.MouseEvent<HTMLDivElement>) => {
    const clientY = evt.clientY;
    const clientX = evt.clientX;

    setResizable(resizableInfo => {
      isResizing.current = true;
      return {
        height: resizableInfo.height,
        width: resizableInfo.width,
        draggingClientY: clientY,
        draggingClientX: clientX
      };
    });
  }, []);

  const dimensionStyles = {
    ...(resizable.height && { height: resizable.height }),
    ...(resizable.width && { width: resizable.width })
  };

  return (
    <div ref={containerRef} style={dimensionStyles} className={classnames({ [className]: !!className })}>
      {children({ dimensionStyles })}
      <div className={classnames({
        'block-resizer-left': resizerPosition === 'left',
        'block-resizer-right': resizerPosition === 'right',
        'cursor-nwse-resize': axis === "both",
        'cursor-ew-resize': axis === 'x',
        'cursor-ns-resize': axis === 'y'
      })} onMouseDown={onResizerMouseDown} />
    </div>
  );
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