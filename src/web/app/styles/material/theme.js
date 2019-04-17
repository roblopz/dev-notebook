import { createMuiTheme } from '@material-ui/core/styles';

export const MainTheme = createMuiTheme({
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