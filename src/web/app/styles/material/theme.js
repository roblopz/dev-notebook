import { createMuiTheme } from '@material-ui/core/styles';

export const MainTheme = createMuiTheme({
  breakpoints: {
    keys: ['xs', 'sm', 'md', 'lg', 'xl'],
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200
    }
  },
  typography: {
    useNextVariants: true
  },
  transitions: {
    loadingIn: 50,
    loadingOut: 800,
    modalSlideEnter: 400,
    modalSlideExit: 320
  }
});