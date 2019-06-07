export var getStyles = function (theme) {
    var pageInfoLeftPadding = theme.spacing.unit * 2;
    return {
        root: {
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            maxHeight: 'calc(100vh - 50px)'
        },
        mainPageForm: {
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
        },
        pageTitle: {
            display: 'flex',
            justifyContent: 'flex-end',
            padding: '4px 8px',
            paddingLeft: pageInfoLeftPadding,
            width: '100%',
            borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
        },
        closePageBtn: {
            position: 'relative',
            top: 2,
            left: 1,
            height: 28,
            width: 28,
            boxShadow: 'none',
            backgroundColor: 'unset',
            minWidth: 'unset',
            minHeight: 'unset'
        },
        closePageBtnIcon: {
            fontSize: 16
        }
    };
};
export default getStyles;
//# sourceMappingURL=pageEdit.js.map