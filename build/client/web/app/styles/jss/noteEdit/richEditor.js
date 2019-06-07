import { noteTitleIconStyle } from './note';
export var getRichEditorStyle = function (theme) { return ({
    editorWrapper: {
        border: '1px solid #d1d1d1',
        borderRadius: '4px'
    },
    noteTitleIcon: noteTitleIconStyle,
    switchBase: {
        height: 'unset !important'
    },
    switchLabelWrapper: {
        marginLeft: '-8px',
    },
    switchLabelText: {
        position: 'relative',
        left: '-8px',
        fontWeight: 500
    }
}); };
export var getRichEditorToolbarStyle = function (theme) { return ({
    toolbar: {
        backgroundColor: '#f8f8f8',
        borderBottom: '1px solid #d1d1d1',
        padding: '4px 6px 2px',
        borderTopRightRadius: '4px',
        borderTopLeftRadius: '4px'
    },
    toolbarBtn: {
        display: 'inline-block',
        padding: '3px 5px',
        cursor: 'pointer',
        color: 'darkslategrey',
        '&:hover': {
            background: '#e5e5e5',
            border: '1px #bcbcbc solid',
            padding: '2px 4px'
        },
        '&.active': {
            background: '#fff',
            border: '1px #bcbcbc solid',
            padding: '2px 4px'
        }
    },
    colorPickerPopper: {
        zIndex: 1000,
        top: '8px !important'
    },
    toolbarSeparator: {
        cursor: 'default',
        margin: '0 5px'
    }
}); };
//# sourceMappingURL=richEditor.js.map