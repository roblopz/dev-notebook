export var getStyles = function (theme) { return ({
    root: {
        maxHeight: '30%',
        overflow: 'auto'
    },
    tagsIcon: {
        color: 'rgba(0, 0, 0, 0.7)'
    },
    tagsContainer: {
        padding: theme.spacing.unit / 2 + "px " + theme.spacing.unit * 2 + "px"
    },
    tag: {
        height: '24px',
        borderRadius: '14px',
        margin: 1,
        '& > span': {
            padding: '0 8px'
        }
    }
}); };
export default getStyles;
//# sourceMappingURL=tagsTree.js.map