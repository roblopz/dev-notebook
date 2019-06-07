import { optionalSmTextFieldStyle } from '../shared';
export var noteTitleIconStyle = {
    marginRight: '2px'
};
export var getStyles = function (theme) { return ({
    root: {
        margin: theme.spacing.unit * 2,
        padding: theme.spacing.unit + "px " + theme.spacing.unit * 2 + "px",
        position: 'relative',
        border: '1px solid #eee',
        borderLeft: "5px solid " + theme.palette.primary.main
    },
    titleTextFieldInput: optionalSmTextFieldStyle.input,
    titleTextFieldLabel: optionalSmTextFieldStyle.label,
    headerIconOverride: {
        marginTop: '4px !important'
    },
    andOrDivider: {
        marginTop: 25
    },
    noteIconsContainer: {
        position: 'absolute',
        right: theme.spacing.unit,
        zIndex: theme.zIndex.mobileStepper
    },
    noteIcon: {
        padding: 5
    }
}); };
export default getStyles;
//# sourceMappingURL=note.js.map