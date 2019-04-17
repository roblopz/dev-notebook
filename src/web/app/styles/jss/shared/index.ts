
export const optionalSmTextFieldStyle = {
  input: {
    padding: '7px 14px',
    '&:focus, &:not(:placeholder-shown)': {
      backgroundColor: 'initial'
    },
    '&::placeholder': {
      fontSize: '.8rem'
    }
  },
  label: {
    transform: 'translate(14px, 9px) scale(1)'
  }
};

export const headerIcons = (theme: any) => ({
  root: {
    display: 'flex',
    alignItems: 'flex-end',
    position: 'absolute' as 'absolute',
    top: 0,
    right: 0,
    marginTop: theme.spacing.unit,
    color: theme.palette.text.secondary,
    justifyContent: 'flex-end',
    width: '100%',
    padding: `0 ${theme.spacing.unit * 2}px`
  }
});