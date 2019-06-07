import { optionalSmTextFieldStyle } from '../shared';

export const noteTitleIconStyle = {
  marginRight: '2px'
};

export const getStyles = (theme: any) => ({
  root: {
    margin: theme.spacing(2),
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
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
  noteIconsContainer: {
    position: 'absolute' as 'absolute',
    right: theme.spacing(1),
    zIndex: theme.zIndex.mobileStepper
  },
  noteIcon: {
    padding: 5
  }
});

export default getStyles;