
export const getStyles = (theme: any) => {
  return {
    root: {
      display: 'flex'
    },
    contentWrapper: {
      flexGrow: 1,
      maxHeight: '100vh',
      overflow: 'auto',
      ...theme.mixins.toolbarPadding
    },
    addPageIcon: {
      position: 'absolute' as 'absolute',
      float: 'right' as 'right',
      bottom: theme.spacing(2),
      right: theme.spacing(2)
    }
  };
};

export default getStyles;