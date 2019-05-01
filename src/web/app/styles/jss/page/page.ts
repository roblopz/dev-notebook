
export const getStyles = (theme: any) => {
  const pageInfoLeftPadding = theme.spacing.unit * 2;

  return {
    root: {
      display: 'flex',
      flexDirection: 'column' as 'column',
      position: 'relative' as 'relative',
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
      padding: `0 ${pageInfoLeftPadding}px ${theme.spacing.unit}px`,
      // width: '100%',
      width: '25%',
      minWidth: 160,
      maxWidth: 300,
      borderRight: '1px solid rgba(0, 0, 0, 0.12)'
    },
    pageInfoForm: {
      display: 'flex',
      flexDirection: 'column' as 'column',
      height: '100%',
      paddingBottom: theme.spacing.unit * 2
    },
    pageInfoFooter: {
      display: 'flex',
      flexGrow: 1,
      alignItems: 'flex-end',
      marginTop: '.5rem'
    },
    pageOptionBtns: {
      display: 'flex',
      width: '100%'
    },
    saveBtn: {
      marginRight: theme.spacing.unit,
      flexGrow: '1'
    },
    optionsBtn: {
      padding: 5
    },
    notesSection: {
      flexGrow: 1,
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px`,
      backgroundColor: theme.palette.grey[100]
    }
  };
};

export default getStyles;