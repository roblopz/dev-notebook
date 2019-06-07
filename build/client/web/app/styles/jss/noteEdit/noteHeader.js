export var getStyles = function (theme) { return ({
    root: {
        position: 'absolute',
        right: theme.spacing.unit,
        zIndex: theme.zIndex.mobileStepper
    },
    headerIcon: {
        padding: 5
    },
    settingsMenuRoot: {
        left: '-70px !important',
        zIndex: theme.zIndex.modal + 1
    },
    settingsMenu: {
        padding: '4px 0',
        '& > li': {
            padding: '8px 16px',
            '&:focus': {
                backgroundColor: 'white'
            }
        }
    }
}); };
export default getStyles;
//# sourceMappingURL=noteHeader.js.map