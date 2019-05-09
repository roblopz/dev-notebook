
export const getStyles = (theme: any) => {
  const pageInfoLeftPadding = theme.spacing.unit * 2;

  return {
    root: {
      display: 'flex',
      flexDirection: 'column' as 'column',
      position: 'relative' as 'relative',
      maxHeight: 'calc(100vh - 50px)'
    },
    pageTitle: {
      display: 'flex',
      justifyContent: 'flex-end',
      padding: '4px 8px',
      paddingLeft: pageInfoLeftPadding,
      width: '100%',
      borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
    },
    closeBtn: {
      height: 28,
      width: 28,
      boxShadow: 'none',
      backgroundColor: 'unset',
      minWidth: 'unset',
      minHeight: 'unset'
    },
    closeBtnIcon: {
      fontSize: 16
    },
    pageInfoSection: {
      maxHeight: '100%',
      padding: `0 ${pageInfoLeftPadding}px ${theme.spacing.unit}px`,
      width: '25%',
      minWidth: 160,
      maxWidth: 300,
      borderRight: '1px solid rgba(0, 0, 0, 0.12)',
      overflow: 'hidden',
      overflowY: 'auto' as 'auto'
    },
    pageInfoForm: {
      display: 'flex',
      flexDirection: 'column' as 'column',
      height: '100%',
      paddingBottom: theme.spacing.unit * 2
    },
    pageInfoFooter: {
      display: 'flex',
      alignItems: 'flex-end',
      margin: '1rem 0'
    },
    pageOptionBtns: {
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
    },
    notebookAddMenuItem: {
      padding: '4px 16px',
      fontWeight: 500,
      fontStyle: 'italic',
    }
  };
};

export default getStyles;