
export const getStyles = (theme: any) => ({
  root: {
    maxHeight: '30%',
    overflow: 'auto'
  },
  tagsIcon: {
    color: 'rgba(0, 0, 0, 0.7)'
  },
  tagsContainer: {
    padding: `${theme.spacing(1) / 2}px ${theme.spacing(2)}px`
  },
  tag: {
    height: '24px',
    borderRadius: '14px',
    margin: 1,
    '& > span': {
      padding: '0 8px'
    }
  }
});

export default getStyles;