
export const getStyles = (theme: any) => {
  const pageInfoLeftPadding = theme.spacing.unit * 2;

  return {
    root: {
      maxHeight: '100%',
      padding: `0 ${pageInfoLeftPadding}px ${theme.spacing.unit}px`,
      width: '25%',
      minWidth: 160,
      maxWidth: 300,
      borderRight: '1px solid rgba(0, 0, 0, 0.12)',
      overflowY: 'auto' as 'auto'
    },
    wrapper: {
      display: 'flex',
      flexDirection: 'column' as 'column',
      height: '100%',
      paddingBottom: theme.spacing.unit * 2
    },
    notebookAddMenuItem: {
      padding: '4px 16px',
      fontWeight: 500,
      fontStyle: 'italic',
    },
    newNotebookIcon: {
      color: '#4caf50',
      position: 'relative' as 'relative',
      top: -1
    }
  };
};

export default getStyles;