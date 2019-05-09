import { optionalSmTextFieldStyle } from '../shared';

export const noteTitleIconStyle = {
  marginRight: '2px'
};

export const getStyles = (theme: any) => ({
  root: {
    margin: theme.spacing.unit * 2,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    position: 'relative' as 'relative',
    border: '1px solid #eee',
    borderLeft: `5px solid ${theme.palette.primary.main}`
  },
  titleTextFieldInput: optionalSmTextFieldStyle.input,
  titleTextFieldLabel: optionalSmTextFieldStyle.label,
  headerIconOverride: {
    marginTop: '4px !important'
  },
  andOrDivider: {
    marginTop: 25
  },
  noteOptionsIcon: {
    padding: 5,
    position: 'absolute' as 'absolute',
    right: theme.spacing.unit,
    zIndex: theme.zIndex.mobileStepper
  }
});

export default getStyles;