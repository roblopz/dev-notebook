import { noteTitleIconStyle } from './note';

export const getStyles = (theme: any) => ({
  languagesSelect: {
    display: 'flex',
    alignItems: 'center'

  },
  noteTitleIcon: {
    ...noteTitleIconStyle,
    position: 'relative' as 'relative',
    top: -1
  },
  switchBase: {
    height: 'unset !important'
  },
  switchLabelWrapper: {
    marginLeft: '-8px',
    marginBottom: 0
  },
  switchLabelText: {
    position: 'relative' as 'relative',
    left: '-8px',
    fontWeight: 500
  }
});

export default getStyles;