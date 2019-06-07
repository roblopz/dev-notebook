import * as tslib_1 from "tslib";
export var getStyles = function (theme) {
    return {
        root: {
            display: 'flex'
        },
        contentWrapper: tslib_1.__assign({ flexGrow: 1, maxHeight: '100vh', overflow: 'auto' }, theme.mixins.toolbarPadding),
        addPageIcon: {
            position: 'absolute',
            float: 'right',
            bottom: theme.spacing.unit * 2,
            right: theme.spacing.unit * 2
        }
    };
};
export default getStyles;
//# sourceMappingURL=main.js.map