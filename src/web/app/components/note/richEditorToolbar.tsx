import React from 'react';
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

import RenderPropsWrap from '../common/renderPropsWrap';
import { IStyleMap, IStyleToPropsPlugin } from '../../lib/draftJsStyleToProps';
import { getRichEditorToolbarStyle as getStyle } from '../../styles/jss/note/richEditor';
import { nameof } from '../../lib/tsUtil';

export interface RichEditorPropTypes {
  EditorPlugins: {
    StyleToPropsPlugin: IStyleToPropsPlugin<IStyleMap>;
    RichButtonsPlugin: any
  };
}

const fontStyles = {
  FONTSIZE_12: { fontSize: '12px' },
  FONTSIZE_18: { fontSize: '18px' },
  FONTSIZE_22: { fontSize: '22px' },
  FONTSIZE_26: { fontSize: '26px' },
  FONTSIZE_30: { fontSize: '30px' }
};

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
  fonts: [fontStyles]
};

function RichEditorToolbar({
  EditorPlugins: { StyleToPropsPlugin, RichButtonsPlugin }
}: RichEditorPropTypes
) {
  const classes = makeStyles(getStyle)();

  return (
    <div className={classes.toolbar}>
     <StyleToPropsPlugin.StyleToProps styleMaps={customStyles}>
      {({ activeStyles, toggleInlineStyle, styleGroupHasClash }) => {
        const activeFontStyles = Object.keys(activeStyles).filter(style => Object.keys(fontStyles).some(k => k === style));
        const multipleFontsInSelection = styleGroupHasClash(nameof('fonts', customStyles));
        const activeFont = multipleFontsInSelection ? '' : (activeFontStyles[0] || '');

        return (
          <React.Fragment>
            {/* Font Size */}
            <div className={classes.toolbarBtn}>
              <select value={activeFont || ''} onChange={(evt) => { toggleInlineStyle(evt.target.value)(null); }}>
                {multipleFontsInSelection ? <option value="" /> : null}
                {!activeFont && !multipleFontsInSelection ? <option value="">Default</option> : null}
                {Object.keys(fontStyles).map(fontStyle => (
                  <option key={fontStyle} value={fontStyle}>{fontStyle}</option>
                ))}
              </select>
            </div>
            
            <span className={classes.toolbarSeparator}>|</span>
            
            {/* Highlight */}
            <div className={classnames(classes.toolbarBtn, { 'active': activeStyles[nameof('HIGHLIGHT', customStyles)] })}
              onClick={toggleInlineStyle(nameof('HIGHLIGHT', customStyles))} 
              onMouseDown={evt => evt.preventDefault()}>
              <FormatColorFillIcon fontSize="small" />
            </div>

            <span className={classes.toolbarSeparator}>|</span>
            
            {/* Bold */}
            <div className={classnames(classes.toolbarBtn, { 'active': activeStyles[nameof('BOLD', customStyles)] })}
              onClick={toggleInlineStyle(nameof('BOLD', customStyles))} 
              onMouseDown={evt => evt.preventDefault()}>
              <FormatBoldIcon fontSize="small" />
            </div>
            {/* Italic */}
            <div className={classnames(classes.toolbarBtn, { 'active': activeStyles[nameof('ITALIC', customStyles)] })}
              onClick={toggleInlineStyle(nameof('ITALIC', customStyles))} 
              onMouseDown={evt => evt.preventDefault()} >
              <FormatItalicIcon fontSize="small" />
            </div>
            {/* Underline */}
            <div className={classnames(classes.toolbarBtn, { 'active': activeStyles[nameof('UNDERLINE', customStyles)] })}
              onClick={toggleInlineStyle(nameof('UNDERLINE', customStyles))} 
              onMouseDown={evt => evt.preventDefault()}>
              <FormatUnderlinedIcon fontSize="small" />
            </div>
            {/* Strike */}
            <div className={classnames(classes.toolbarBtn, { 'active': activeStyles[nameof('STRIKETHROUGH', customStyles)] })}
              onClick={toggleInlineStyle(nameof('STRIKETHROUGH', customStyles))} 
              onMouseDown={evt => evt.preventDefault()}>
              <FormatStrikeThroughIcon fontSize="small" />
            </div>

            <span className={classes.toolbarSeparator}>|</span>              
          </React.Fragment>          
        );
      }}
     </StyleToPropsPlugin.StyleToProps>
    <RichButtonsPlugin.OLButton>
      <RenderPropsWrap>
        {({ toggleBlockType, isActive, onMouseDown }) => (
          <div className={classnames(classes.toolbarBtn, { 'active': isActive })}
            onClick={toggleBlockType} onMouseDown={onMouseDown}>
            <ListIcon fontSize="small" />
          </div>
        )}
      </RenderPropsWrap>
    </RichButtonsPlugin.OLButton>
    <RichButtonsPlugin.ULButton>
      <RenderPropsWrap>
        {({ toggleBlockType, isActive, onMouseDown }) => (
          <div className={classnames(classes.toolbarBtn, { 'active': isActive })}
            onClick={toggleBlockType} onMouseDown={onMouseDown}>
            <ListBulletIcon fontSize="small" />
          </div>
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