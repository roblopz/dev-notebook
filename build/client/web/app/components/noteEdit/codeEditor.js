import * as tslib_1 from "tslib";
import React, { useRef, useMemo } from 'react';
import ResizableBlock from '../common/resizableBlock';
import MonacoEditor from 'react-monaco-editor';
import * as monaco from 'monaco-editor';
import { makeStyles } from '@material-ui/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Collapse from '@material-ui/core/Collapse';
import { getStyles } from '../../styles/jss/noteEdit/codeEditor';
function CodeEditor(_a) {
    var snippet = _a.snippet, hide = _a.hide, toggleHide = _a.toggleHide, onChange = _a.onChange, className = _a.className;
    var classes = makeStyles(getStyles)({});
    var editorRef = useRef(null);
    var availableLanguages = useMemo(function () {
        return monaco.languages.getLanguages().sort(function (a, b) {
            return a.aliases[0].localeCompare(b.aliases[0]);
        });
    }, []);
    return (React.createElement("div", tslib_1.__assign({}, tslib_1.__assign({}, (className && { className: className }))),
        React.createElement("div", { className: "position-relative" },
            React.createElement(FormControlLabel, { control: React.createElement(Switch, { checked: !hide, color: "primary", onChange: function (evt) { return toggleHide(!evt.target.checked); }, classes: { switchBase: classes.switchBase } }), label: "Code", className: classes.switchLabelWrapper, classes: { label: classes.switchLabelText } })),
        React.createElement(Collapse, { in: !hide },
            React.createElement("select", { className: "my-2", value: snippet.language, onChange: function (evt) { return onChange({ code: snippet.code, language: evt.target.value }); } }, availableLanguages.map(function (language) { return (React.createElement("option", { key: language.id, value: language.id }, language.aliases[0])); })),
            React.createElement(ResizableBlock, { className: "position-relative", axis: "y", resizerPosition: "left", limits: { heightMin: 100, heightMax: 700 } }, function (_a) {
                var dimensionStyles = _a.dimensionStyles;
                return (React.createElement(MonacoEditor, { theme: "vs", ref: editorRef, value: snippet.code, onChange: function (val) { return onChange({ code: val, language: snippet.language }); }, language: snippet.language, height: dimensionStyles.height || 100, width: dimensionStyles.width || 0, options: {
                        minimap: { enabled: false },
                        showUnused: false,
                        lineNumbersMinChars: 3,
                        scrollBeyondLastLine: false
                    } }));
            }))));
}
export default CodeEditor;
//# sourceMappingURL=codeEditor.js.map