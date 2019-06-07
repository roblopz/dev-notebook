import * as tslib_1 from "tslib";
import React, { useState, useCallback } from 'react';
import propTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Collapse from '@material-ui/core/Collapse';
import Switch from '@material-ui/core/Switch';
import DraftJsEditor from 'draft-js-plugins-editor';
import { EditorState } from 'draft-js';
import createRichButtonsPlugin from 'draft-js-richbuttons-plugin';
import { convertFromRaw, convertToRaw } from 'draft-js';
import { getRichEditorStyle as getStyle } from '../../styles/jss/noteEdit/richEditor';
import createStyleToPropsPlugin from 'draft-js-styletoprops-plugin';
import RichEditorToolbar from './richEditorToolbar';
var richButtonsPlugin = createRichButtonsPlugin();
var styleToPropsPlugin = createStyleToPropsPlugin();
function RichEditor(_a) {
    var value = _a.value, hide = _a.hide, toggleHide = _a.toggleHide, onChange = _a.onChange, className = _a.className;
    var classes = makeStyles(getStyle)({});
    var _b = useState(value ? EditorState.createWithContent(convertFromRaw(JSON.parse(value))) : EditorState.createEmpty()), editorState = _b[0], setEditorState = _b[1];
    var onEditorChange = useCallback(function (editorState) {
        setEditorState(editorState);
        var editorContent = editorState.getCurrentContent();
        if (editorContent.hasText()) {
            var serializedEditorContent = JSON.stringify(convertToRaw(editorContent));
            onChange(serializedEditorContent);
        }
        else {
            onChange('');
        }
    }, []);
    return (React.createElement("div", tslib_1.__assign({}, tslib_1.__assign({}, (className && { className: className }))),
        React.createElement(FormControlLabel, { control: React.createElement(Switch, { checked: !hide, color: "primary", onChange: function (evt) { return toggleHide(!evt.target.checked); }, classes: { switchBase: classes.switchBase } }), label: "Content", className: classes.switchLabelWrapper, classes: { label: classes.switchLabelText } }),
        React.createElement(Collapse, { in: !hide },
            React.createElement("div", { className: classes.editorWrapper },
                React.createElement(RichEditorToolbar, { EditorPlugins: {
                        StyleToPropsPlugin: styleToPropsPlugin,
                        RichButtonsPlugin: richButtonsPlugin
                    } }),
                React.createElement("div", { className: "p-2" },
                    React.createElement(DraftJsEditor, { editorState: editorState, onChange: onEditorChange, plugins: [styleToPropsPlugin, richButtonsPlugin] }))))));
}
RichEditor.propTypes = {
    className: propTypes.string
};
export default RichEditor;
//# sourceMappingURL=richEditor.js.map