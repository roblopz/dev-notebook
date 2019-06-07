
export const getStyles = (theme: any) => {
  return {
    noteHeader: {
      fontSize: '1rem',
    },
    noteSubheader: {
      fontSize: '.85rem'
    },
    expandIcon: {
      padding: 8,
      marginTop: 10
    },
    snippetLanguage: {
      textAlign: 'right' as 'right',
      fontStyle: 'italic'
    },
    contentView: {
      border: '1px solid #d1d1d1',
      borderRadius: '2px'
    }
  };
};

export default getStyles;