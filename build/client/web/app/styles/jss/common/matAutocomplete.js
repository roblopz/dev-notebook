export var getStyles = function (theme) { return ({
    menuContainer: {
        '& div:empty': {
            display: 'none'
        }
    },
    menuItem: {
        padding: "5px " + theme.spacing.unit * 2 + "px"
    }
}); };
export default getStyles;
//# sourceMappingURL=matAutocomplete.js.map