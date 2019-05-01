
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