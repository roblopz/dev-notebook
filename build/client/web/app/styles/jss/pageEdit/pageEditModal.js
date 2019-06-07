export var getStyles = function (theme) {
    var _a;
    return ({
        root: (_a = {
                width: '95vw',
                margin: '0 auto',
                marginTop: '25px'
            },
            _a[theme.breakpoints.up('lg')] = {
                width: '80vw',
            },
            _a[theme.breakpoints.up('xl')] = {
                width: '60vw',
            },
            _a),
        modalContainer: {
            alignItems: 'flex-start'
        },
        modalPaperRoot: {
            maxWidth: 'unset',
            maxHeight: 'unset',
            width: '100%',
            margin: 0
        }
    });
};
export default getStyles;
//# sourceMappingURL=pageEditModal.js.map