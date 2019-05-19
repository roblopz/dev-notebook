
export const getStyles = (theme: any) => {
  const pageInfoLeftPadding = theme.spacing.unit * 2;

  return {
    root: {
      display: 'flex',
      flexDirection: 'column' as 'column',
      position: 'relative' as 'relative',
      maxHeight: 'calc(100vh - 50px)'
    },
    mainPageForm: {
      display: 'flex',
      flexDirection: 'column' as 'column',
      overflow: 'hidden'
    },
    pageTitle: {
      display: 'flex',
      justifyContent: 'flex-end',
      padding: '4px 8px',
      paddingLeft: pageInfoLeftPadding,
      width: '100%',
      borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
    },
    closePageBtn: {
      height: 28,
      width: 28,
      boxShadow: 'none',
      backgroundColor: 'unset',
      minWidth: 'unset',
      minHeight: 'unset'
    },
    closePageBtnIcon: {
      fontSize: 16
    }
  };
};

export default getStyles;