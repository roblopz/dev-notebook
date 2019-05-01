import React, { useRef, useState, useMemo } from 'react';
import propTypes from 'prop-types';
import classnames from 'classnames';
import { makeStyles } from '@material-ui/styles';
import FormatBoldIcon from '@material-ui/icons/FormatBoldRounded';
import FormatItalicIcon from '@material-ui/icons/FormatItalicRounded';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlinedRounded';
import ListIcon from '@material-ui/icons/ListRounded';
import ListBulletIcon from '@material-ui/icons/FormatListBulletedRounded';
import FormatStrikeThroughIcon from '@material-ui/icons/FormatStrikethroughRounded';
import FormatColorFillIcon from '@material-ui/icons/FormatColorFillRounded';
import FormatSizeIcon from '@material-ui/icons/FormatSizeRounded';
import FormatColorTextIcon from '@material-ui/icons/FormatColorTextRounded';
import Tooltip from '@material-ui/core/Tooltip';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';
import { BlockPicker } from 'react-color';

import RenderPropsWrap from '../common/renderPropsWrap';
import { IStyleMap, IStyleToPropsPlugin } from 'draft-js-styletoprops-plugin';
import { getRichEditorToolbarStyle as getStyle } from '../../styles/jss/note/richEditor';
import { nameof } from '../../lib/tsUtil';

export interface IRichEditorPropTypes {
  EditorPlugins: {
    StyleToPropsPlugin: IStyleToPropsPlugin<IStyleMap>;
    RichButtonsPlugin: any
  };
}

const baseFontColors = [
  '#000000', '#D9E3F0', '#F47373', '#697689', '#37D67A',
  '#2CCCE4', '#555555', '#DCE775', '#FF8A65', '#BA68C8'
];

const baseFontSizes = [12, 14, 16, 18, 20, 22, 28];

const customStyles = {
  'HIGHLIGHT': {
    backgroundColor: '#FFE47F',
    padding: '0 .15em',
    color: '#000000'
  },
  'STRIKETHROUGH': {
    textDecoration: 'line-through'
  },
  'BOLD': {
    fontWeight: 'bold'
  },
  'ITALIC': {
   fontStyle: 'italic'
  },
  'UNDERLINE': {
    textDecoration: 'underline'
  },
  fonts: [
    baseFontSizes.reduce((acc, curr) => {
      acc['FONTSIZE_' + curr] = { fontSize: `${curr}px` };
      return acc;
    }, {})
  ],
  colors: [
    baseFontColors.reduce((acc, curr) => {
      acc[curr] = { color: curr };
      return acc;
    }, {})
  ]
};

function RichEditorToolbar({
  EditorPlugins: { StyleToPropsPlugin, RichButtonsPlugin }
}: IRichEditorPropTypes
) {
  const classes = makeStyles(getStyle)();
  const colorPickerBtnRef = useRef(null);
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const fontSizeOptions = useMemo(() => (
    baseFontSizes.map(fontSize => (
      <option key={fontSize} value={`FONTSIZE_${fontSize}`}>{`${fontSize}px`}</option>
    ))
  ), []);

  return (
    <div className={classes.toolbar}>
     <StyleToPropsPlugin.StyleToProps styleMaps={customStyles}>
      {({ activeStyles, toggleInlineStyle, styleGroupHasClash }) => {
        const activeFontStyles = Object.keys(activeStyles).filter(style => !!customStyles.fonts[0][style]);
        const activeColorStyles = Object.keys(activeStyles).filter(style => !!customStyles.colors[0][style]);
        const multipleFontsInSelection = styleGroupHasClash(nameof('fonts', customStyles));
        const multipleColorsInSelection = styleGroupHasClash(nameof('colors', customStyles));

        const activeFont = multipleFontsInSelection ? '' : (activeFontStyles[0] || '');
        const activeColor = multipleColorsInSelection ? '#000000' : (activeColorStyles[0] || '#000000');

        return (
          <React.Fragment>
            {/* Font Size */}
              <div className={classnames(classes.toolbarBtn, 'cursor-default')}>
                <span className="mr-1"><FormatSizeIcon fontSize="small" /></span>
                <select className="cursor-pointer" value={activeFont || ''}
                  onChange={evt => toggleInlineStyle(evt.target.value)}>
                  {multipleFontsInSelection ? <option value="" /> : null}
                  {!activeFont && !multipleFontsInSelection ? <option value="">Default</option> : null}
                  {fontSizeOptions}
                </select>
              </div>

            <span className={classes.toolbarSeparator}>|</span>

            {/* Color pciker */}
            <Tooltip title="Color">
              <div className={classes.toolbarBtn} ref={colorPickerBtnRef}
                onClick={() => setColorPickerOpen(!colorPickerOpen)}
                onMouseDown={evt => evt.preventDefault()}>
                <FormatColorTextIcon fontSize="small" />
              </div>
            </Tooltip>

            <Popper className={classes.colorPickerPopper} open={colorPickerOpen}
              anchorEl={colorPickerBtnRef.current} transition disablePortal>
              {({ TransitionProps }) => (
                <Grow style={{ transformOrigin: 'center top' }} {...TransitionProps}>
                  <ClickAwayListener onClickAway={() => setColorPickerOpen(false)}>
                    <BlockPicker colors={baseFontColors} color={activeColor}
                      onChange={color => {
                        toggleInlineStyle(color.hex.toUpperCase());
                        setColorPickerOpen(false);
                      }} />
                  </ClickAwayListener>
                </Grow>
              )}
            </Popper>
            {/* Highlight */}
            <Tooltip title="Highlight">
              <div className={classnames(classes.toolbarBtn, { 'active': activeStyles[nameof('HIGHLIGHT', customStyles)] })}
                onClick={() => toggleInlineStyle(nameof('HIGHLIGHT', customStyles))}
                onMouseDown={evt => evt.preventDefault()}>
                <FormatColorFillIcon fontSize="small" />
              </div>
            </Tooltip>

            <span className={classes.toolbarSeparator}>|</span>

            {/* Bold */}
            <Tooltip title="Bold">
              <div className={classnames(classes.toolbarBtn, { 'active': activeStyles[nameof('BOLD', customStyles)] })}
                onClick={() => toggleInlineStyle(nameof('BOLD', customStyles))}
                onMouseDown={evt => evt.preventDefault()}>
                <FormatBoldIcon fontSize="small" />
              </div>
            </Tooltip>
            {/* Italic */}
            <Tooltip title="Italic">
              <div className={classnames(classes.toolbarBtn, { 'active': activeStyles[nameof('ITALIC', customStyles)] })}
                onClick={() => toggleInlineStyle(nameof('ITALIC', customStyles))}
                onMouseDown={evt => evt.preventDefault()} >
                <FormatItalicIcon fontSize="small" />
              </div>
            </Tooltip>
            {/* Underline */}
            <Tooltip title="Underline">
              <div className={classnames(classes.toolbarBtn, { 'active': activeStyles[nameof('UNDERLINE', customStyles)] })}
                onClick={() => toggleInlineStyle(nameof('UNDERLINE', customStyles))}
                onMouseDown={evt => evt.preventDefault()}>
                <FormatUnderlinedIcon fontSize="small" />
              </div>
            </Tooltip>
            {/* Strike */}
            <Tooltip title="Strike">
              <div className={classnames(classes.toolbarBtn, { 'active': activeStyles[nameof('STRIKETHROUGH', customStyles)] })}
                onClick={() => toggleInlineStyle(nameof('STRIKETHROUGH', customStyles))}
                onMouseDown={evt => evt.preventDefault()}>
                <FormatStrikeThroughIcon fontSize="small" />
              </div>
            </Tooltip>

            <span className={classes.toolbarSeparator}>|</span>
          </React.Fragment>
        );
      }}
     </StyleToPropsPlugin.StyleToProps>
    <RichButtonsPlugin.OLButton>
      <RenderPropsWrap>
        {({ toggleBlockType, isActive, onMouseDown }) => (
          <Tooltip title="Ordered list">
            <div className={classnames(classes.toolbarBtn, { 'active': isActive })}
              onClick={toggleBlockType} onMouseDown={onMouseDown}>
              <ListIcon fontSize="small" />
            </div>
          </Tooltip>
        )}
      </RenderPropsWrap>
    </RichButtonsPlugin.OLButton>
    <RichButtonsPlugin.ULButton>
      <RenderPropsWrap>
        {({ toggleBlockType, isActive, onMouseDown }) => (
          <Tooltip title="Unordered list">
            <div className={classnames(classes.toolbarBtn, { 'active': isActive })}
              onClick={toggleBlockType} onMouseDown={onMouseDown}>
              <ListBulletIcon fontSize="small" />
            </div>
          </Tooltip>
        )}
      </RenderPropsWrap>
    </RichButtonsPlugin.ULButton>
    </div>
  );
}

RichEditorToolbar.propTypes = {
  className: propTypes.string
};

export default RichEditorToolbar;