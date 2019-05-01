import { noteTitleIconStyle } from './note';

export const getStyles = (theme: any) => ({
  languagesSelect: {
    display: 'flex',
    alignItems: 'center',
    position: 'absolute' as 'absolute',
    top: -2,
    right: 0
  },
  noteTitleIcon: {
    ...noteTitleIconStyle,
    position: 'relative' as 'relative',
    top: -1
  }
});

export default getStyles;