
export const getStyles = (theme: any) => ({
  root: {
    position: 'absolute' as 'absolute',
    right: theme.spacing(1),
    zIndex: theme.zIndex.mobileStepper
  },
  headerIcon: {
    padding: 5
  },
  settingsMenuRoot: {
    left: '-70px !important',
    zIndex: theme.zIndex.modal + 1
  },
  settingsMenu: {
    padding: '4px 0',
    '& > li': {
      padding: '8px 16px',
      '&:focus': {
        backgroundColor: 'white'
      }
    }
  }
});

export default getStyles;