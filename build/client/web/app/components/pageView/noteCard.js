import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import { Editor, EditorState } from 'draft-js';
import { convertFromRaw } from 'draft-js';
import MonacoEditor from 'react-monaco-editor';
import { getStyles } from '../../styles/jss/pageView/noteCard';
import ResizableBlock from '../common/resizableBlock';
function NoteCard(_a) {
    var note = _a.note, className = _a.className, pageEmitter = _a.pageEmitter;
    var classes = makeStyles(getStyles)({});
    var _b = useState(false), isOpen = _b[0], setIsOpen = _b[1];
    var contentEditorState = useState(note.content ? EditorState.createWithContent(convertFromRaw(JSON.parse(note.content))) : EditorState.createEmpty())[0];
    useEffect(function () {
        var toggleExpand = function (expand) { return setIsOpen(expand); };
        pageEmitter.on('expandNotes', toggleExpand);
        return function () {
            pageEmitter.removeListener('expandNotes', toggleExpand);
        };
    }, []);
    return (React.createElement(Card, { className: className },
        React.createElement(CardHeader, { title: note.header, subheader: note.subheader, action: React.createElement(IconButton, { onClick: function () { return setIsOpen(!isOpen); }, className: classes.expandIcon }, isOpen ? React.createElement(ExpandLessIcon, { fontSize: "small" })
                : React.createElement(ExpandMoreIcon, { fontSize: "small" })), className: "py-1", classes: { title: classes.noteHeader, subheader: classes.noteSubheader } }),
        React.createElement(Collapse, { in: isOpen, timeout: "auto" },
            React.createElement(CardContent, { className: "pt-1 pb-2" },
                note.content ?
                    React.createElement(Editor, { editorState: contentEditorState, onChange: function () { }, readOnly: true })
                    : null,
                note.snippet && (note.snippet.language && note.snippet.code) ?
                    React.createElement(React.Fragment, null,
                        React.createElement(Typography, { variant: "caption", className: 'mr-1 mt-0 mb-1 ' + classes.snippetLanguage }, note.snippet.language),
                        React.createElement(ResizableBlock, { className: "position-relative", axis: "y", resizerPosition: "right", limits: { heightMin: 100, heightMax: 700 } }, function (_a) {
                            var dimensionStyles = _a.dimensionStyles;
                            return (React.createElement(MonacoEditor, { theme: "vs", value: note.snippet.code, language: note.snippet.language, height: dimensionStyles.height || 100, width: dimensionStyles.width || 0, options: {
                                    readOnly: true,
                                    minimap: { enabled: false },
                                    showUnused: false,
                                    lineNumbersMinChars: 3,
                                    scrollBeyondLastLine: false
                                } }));
                        }))
                    : null))));
}
NoteCard.propTypes = {
    note: PropTypes.object.isRequired,
    className: PropTypes.string
};
export default NoteCard;
//# sourceMappingURL=noteCard.js.map