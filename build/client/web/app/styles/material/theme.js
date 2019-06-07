import { createMuiTheme } from '@material-ui/core/styles';
export var MainTheme = createMuiTheme({
    typography: {
        useNextVariants: true
    },
    transitions: {
        loadingIn: 50,
        loadingOut: 800,
        modalSlideEnter: 400,
        modalSlideExit: 320
    },
    mixins: {
        toolbarPadding: {
            paddingTop: 56,
            '@media (min-width:0px) and (orientation: landscape)': {
                paddingTop: 48
            },
            '@media (min-width:600px)': {
                paddingTop: 64
            }
        }
    }
});
//# sourceMappingURL=theme.js.map