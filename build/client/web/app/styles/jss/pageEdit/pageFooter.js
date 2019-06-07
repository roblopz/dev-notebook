export var getStyles = function (theme) {
    return {
        root: {
            display: 'flex',
            alignItems: 'flex-end',
            margin: '1rem 0'
        },
        pageOptionBtns: {
            position: 'relative',
            display: 'flex',
            width: '100%'
        },
        saveBtn: {
            marginRight: theme.spacing.unit,
            flexGrow: 1
        },
        optionsBtn: {
            padding: 5
        },
        settingsMenuRoot: {
            left: '45px !important',
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
    };
};
export default getStyles;
//# sourceMappingURL=pageFooter.js.map