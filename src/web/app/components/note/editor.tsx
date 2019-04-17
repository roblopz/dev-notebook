import React, { useState, useRef } from 'react';
import propTypes from 'prop-types';
import classnames from 'classnames';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import FormatBoldIcon from '@material-ui/icons/FormatBoldRounded';
import FormatItalicIcon from '@material-ui/icons/FormatItalicRounded';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlinedRounded';
import ListIcon from '@material-ui/icons/ListRounded';
import ListBulletIcon from '@material-ui/icons/FormatListBulletedRounded';
import FormatStrikeThroughIcon from '@material-ui/icons/FormatStrikethroughRounded';
import FormatColorFillIcon from '@material-ui/icons/FormatColorFillRounded';
import FormatColorTextIcon from '@material-ui/icons/FormatColorTextRounded';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';
import DraftEditor from 'draft-js-plugins-editor';
import { EditorState /*, convertToRaw, convertFromRaw */} from 'draft-js';
import createRichButtonsPlugin from 'draft-js-richbuttons-plugin';
// import Inspector from 'react-inspector';
import { BlockPicker } from 'react-color';

import RenderPropsWrap from '../common/renderPropsWrap';
import getStyle from '../../styles/jss/note/editor';
import createStyleRenderPropsPlugin from '../../lib/draftJsStyleRenderPropsPlugin';
import createFontSizeSelectPlugin from '../../lib/draftJsFontSizeSelectPlugin';

const richButtonsPlugin = createRichButtonsPlugin();
const fontSizeSelectPlugin1 = createFontSizeSelectPlugin([12, 14, 16, 18, 20, 22, 24, 26, 28]);
const fontSizeSelectPlugin2 = createFontSizeSelectPlugin(['1rem', '2rem', '3rem']);
const fontSizeSelectPlugin3 = createFontSizeSelectPlugin([
  { style: 'font-size: 40px', display: 'BIG'  },
  { style: 'font-size: 20px', display: 'MEDIUM'  },
  { style: 'font-size: 10px', display: 'SMALL'  }
]);
const styleRenderPropsPlugin = createStyleRenderPropsPlugin({
  'HIGHLIGHT': {
    backgroundColor: '#FFE47F',
    padding: '0 .15em',
    color: '#000000'
  },
  'STRIKETHROUGH': {
    textDecoration: 'line-through'
  }
});

const { ItalicButton, BoldButton, UnderlineButton, OLButton, ULButton } = richButtonsPlugin;
const { FontSizeSelect } = fontSizeSelectPlugin1;
const { FontSizeSelect: FontSizeSelectTwo } = fontSizeSelectPlugin2;
const { FontSizeSelect: FontSizeSelectThree } = fontSizeSelectPlugin3;
const { StyleRenderProps } = styleRenderPropsPlugin;

interface EditorPropTypes {
  className?: string;
}

let prevStateRaw: any;
function Editor({ className = '' }: EditorPropTypes) {
  const classes = makeStyles(getStyle)();
  const colorPickerMenuAnchor = useRef(null);
  const [colorPickerOpen, setColorPickerOpen] = useState(false);  
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  function handleColorPickerClose(event: React.MouseEvent) {
    if (colorPickerMenuAnchor.current.contains(event.target))
      return;    

    setColorPickerOpen(false);
  }

  return (
    <div className={className}>
      <Typography variant="button" className="text-capitalize mb-1" component="label" color="textSecondary">
        Content
      </Typography>
      
      <div className={classes.editorWrapper}>        
        <div className={classes.toolbar}>
          {/* Font size */}
          <div className={classes.toolbarBtn}>
            <FontSizeSelect />
          </div>
          {/* <div className={classes.toolbarBtn}>
            <FontSizeSelectTwo />
          </div>
          <div className={classes.toolbarBtn}>
            <FontSizeSelectThree />
          </div> */}

          <span className={classes.toolbarSeparator}>|</span>

          {/*  Color Picker */}
          <div className={classes.toolbarBtn}>
            <span ref={colorPickerMenuAnchor} onClick={() => setColorPickerOpen(!colorPickerOpen)}>        
              <FormatColorTextIcon />
            </span>
            <Popper open={colorPickerOpen} anchorEl={colorPickerMenuAnchor.current} transition disablePortal>
              {({ TransitionProps }) => {                
                return (
                <Grow {...TransitionProps} style={{ transformOrigin: 'center' }} timeout={500}>
                  <ClickAwayListener onClickAway={handleColorPickerClose}>
                    <div style={{ position: 'relative', top: '15px' }}>
                      <BlockPicker />
                    </div>
                  </ClickAwayListener>                  
                </Grow>
              )}}
            </Popper>
          </div>         
          {/*  Highlight */}
          <StyleRenderProps>
            {({ styleKeys, activeStyles, toggleInlineStyle: toggleInlineStyle, onMouseDown }) => (
              <div className={classnames(classes.toolbarBtn, { 'active': activeStyles.includes(styleKeys.HIGHLIGHT) })}
                onClick={toggleInlineStyle(styleKeys.HIGHLIGHT)} onMouseDown={onMouseDown}>
                <FormatColorFillIcon fontSize="small" />
              </div>
            )}
          </StyleRenderProps>

          <span className={classes.toolbarSeparator}>|</span>
          
          <BoldButton>
            <RenderPropsWrap>
              {({ toggleInlineStyle, isActive, onMouseDown }) => (
                <div className={classnames(classes.toolbarBtn, { 'active': isActive })}
                  onClick={toggleInlineStyle} onMouseDown={onMouseDown}>
                  <FormatBoldIcon fontSize="small" />
                </div>
              )}
            </RenderPropsWrap>
          </BoldButton>
          <ItalicButton>
            <RenderPropsWrap>
              {({ toggleInlineStyle, isActive, onMouseDown }) => (
                <div className={classnames(classes.toolbarBtn, { 'active': isActive })}
                  onClick={toggleInlineStyle} onMouseDown={onMouseDown} >
                  <FormatItalicIcon fontSize="small" />
                </div>
              )}
            </RenderPropsWrap>
          </ItalicButton>
          <UnderlineButton>
            <RenderPropsWrap>
              {({ toggleInlineStyle, isActive, onMouseDown }) => (
                <div className={classnames(classes.toolbarBtn, { 'active': isActive })}
                  onClick={toggleInlineStyle} onMouseDown={onMouseDown}>
                  <FormatUnderlinedIcon fontSize="small" />
                </div>
              )}
            </RenderPropsWrap>
          </UnderlineButton>
          <StyleRenderProps>
            {({ styleKeys, activeStyles, toggleInlineStyle: toggleInlineStyle, onMouseDown }) => (
              <div className={classnames(classes.toolbarBtn, { 'active': activeStyles.includes(styleKeys.STRIKETHROUGH) })}
                onClick={toggleInlineStyle(styleKeys.STRIKETHROUGH)} onMouseDown={onMouseDown}>
                <FormatStrikeThroughIcon fontSize="small" />
              </div>
            )}
          </StyleRenderProps>
          <span className={classes.toolbarSeparator}>|</span>
          <OLButton>
            <RenderPropsWrap>
              {({ toggleBlockType, isActive, onMouseDown }) => (
                <div className={classnames(classes.toolbarBtn, { 'active': isActive })}
                  onClick={toggleBlockType} onMouseDown={onMouseDown}>
                  <ListIcon fontSize="small" />
                </div>
              )}
            </RenderPropsWrap>
          </OLButton>
          <ULButton>
            <RenderPropsWrap>
              {({ toggleBlockType, isActive, onMouseDown }) => (
                <div className={classnames(classes.toolbarBtn, { 'active': isActive })}
                  onClick={toggleBlockType} onMouseDown={onMouseDown}>
                  <ListBulletIcon fontSize="small" />
                </div>
              )}
            </RenderPropsWrap>
          </ULButton>         
        </div>

        <div className="p-2">
          <DraftEditor editorState={editorState}
            onChange={editorState => setEditorState(editorState)}
            plugins={[richButtonsPlugin, styleRenderPropsPlugin, fontSizeSelectPlugin1]} />
        </div>
      </div>

      {/* <div className="mt-3">
        <button onClick={() => {
          prevStateRaw = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
        }}>Store State</button>

        <button onClick={() => {
          const restored = convertFromRaw(JSON.parse(prevStateRaw));
          setEditorState(EditorState.createWithContent(restored));
        }}>Restore State</button>
      </div>
      <div className="mt-3">
        <Inspector data={convertToRaw(editorState.getCurrentContent())} />
      </div>
      <div className="mt-3">
        <Inspector data={editorState} />
      </div> */}
    </div>
  );
}

Editor.propTypes = {
  className: propTypes.string
};

export default Editor;