var drawerWidth = 240;
export var getStyles = function (theme) { return ({
    toolbar: theme.mixins.toolbar,
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        width: drawerWidth
    }
}); };
export default getStyles;
//# sourceMappingURL=sidebar.js.map