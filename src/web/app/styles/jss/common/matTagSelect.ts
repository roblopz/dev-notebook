
export const getStyles = (theme: any) => ({
  menuContainer: {
    '& div:empty': {
      display: 'none'
    }
  },
  menuItem: {
    padding: `5px ${theme.spacing.unit * 2}px`
  }
});

export default getStyles;