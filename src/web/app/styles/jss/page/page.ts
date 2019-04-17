import { optionalSmTextFieldStyle, headerIcons } from '../shared';

const getStyle = (theme: any) => ({
  root: {
    padding: theme.spacing.unit * 2,
    position: 'relative' as 'relative'
  },
  headerIcons: headerIcons(theme),
  titleTextFieldInput: optionalSmTextFieldStyle.input,
  titleTextFieldLabel: optionalSmTextFieldStyle.label
});

export default getStyle;