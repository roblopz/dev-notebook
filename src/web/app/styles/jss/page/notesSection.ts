
export const getStyles = (theme: any) => {
  return {
    notesSection: {
      flexGrow: 1,
      maxHeight: '100%',
      backgroundColor: theme.palette.grey[100],
      overflow: 'hidden',
      overflowY: 'auto' as 'auto'
    },
    addNoteIcon: {
      position: 'absolute' as 'absolute',
      float: 'right' as 'right',
      bottom: theme.spacing.unit,
      right: theme.spacing.unit
    }
  };
};

export default getStyles;