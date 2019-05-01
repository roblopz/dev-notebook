
export const getStyles = (theme: any) => ({
  tagChip: {
    height: 24,
    borderRadius: 12,
    marginTop: 3,
    marginRight: 2,
    '&:first-of-type': {
      marginTop: 5
    },
    '&:last-of-type': {
      marginBottom: 8
    },
    '& > span': {
      padding: '0 8px',
      fontWeight: '500' as 'bold'
    }
  },
  tagChipDeleteIcon: {
    width: '.7em',
    marginLeft: -4
  },
  tagInput: {
    minWidth: 10
  }
});

export default getStyles;