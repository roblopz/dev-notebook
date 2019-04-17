import { optionalSmTextFieldStyle } from '../shared';

const getStyle = (theme: any) => ({
  root: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    position: 'relative' as 'relative',
    marginTop: '1rem',
    border: '1px solid #eee',
    borderLeft: '5px solid #1b809e'
  },
  titleTextFieldInput: optionalSmTextFieldStyle.input,
  titleTextFieldLabel: optionalSmTextFieldStyle.label,
  headerIconOverride: {
    marginTop: '4px !important'
  },
  editorBlock: {
    marginTop: '.75rem'
  }
});

export default getStyle;