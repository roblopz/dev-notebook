export var getStyles = function (theme) {
    var pageInfoLeftPadding = theme.spacing.unit * 2;
    return {
        root: {
            maxHeight: '100%',
            padding: "0 " + pageInfoLeftPadding + "px " + theme.spacing.unit + "px",
            width: '25%',
            minWidth: 160,
            maxWidth: 300,
            borderRight: '1px solid rgba(0, 0, 0, 0.12)',
            overflowY: 'auto'
        },
        wrapper: {
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            paddingBottom: theme.spacing.unit * 2
        },
        notebookAddMenuItem: {
            padding: '4px 16px',
            fontWeight: 500,
            fontStyle: 'italic',
        },
        newNotebookIcon: {
            color: '#4caf50',
            position: 'relative',
            top: -1
        }
    };
};
export default getStyles;
//# sourceMappingURL=pageInfoSection.js.map