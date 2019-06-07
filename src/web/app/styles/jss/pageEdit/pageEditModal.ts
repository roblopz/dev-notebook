
export const getStyles = (theme: any) => ({
  root: {
    width: '95vw',
    margin: '0 auto',
    marginTop: '25px',
    [theme.breakpoints.up('lg')]: {
      width: '80vw',
    },
    [theme.breakpoints.up('xl')]: {
      width: '60vw',
    }
  },
  modalContainer: {
    alignItems: 'flex-start'
  },
  modalPaperRoot: {
    maxWidth: 'unset',
    maxHeight: 'unset',
    width: '100%',
    margin: 0
  }
});

export default getStyles;