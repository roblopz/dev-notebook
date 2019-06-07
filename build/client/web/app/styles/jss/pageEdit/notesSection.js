export var getStyles = function (theme) {
    return {
        notesSection: {
            flexGrow: 1,
            maxHeight: '100%',
            backgroundColor: theme.palette.grey[100],
            overflow: 'hidden',
            overflowY: 'auto',
            borderBottomRightRadius: 4
        },
        addNoteIcon: {
            position: 'absolute',
            float: 'right',
            bottom: theme.spacing.unit,
            right: theme.spacing.unit
        }
    };
};
export default getStyles;
//# sourceMappingURL=notesSection.js.map