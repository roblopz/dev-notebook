import { fade } from '@material-ui/core/styles/colorManipulator';

export const getStyles = (theme: any) => ({  
  searchControlsContainer: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
  },
  searchInput: {
    position: 'relative' as 'relative',
    marginLeft: theme.spacing(1),
    width: 'auto' as 'auto',
    marginRight: theme.spacing(1)
  },
  searchIconContainer: {
    width: theme.spacing(6),
    height: '100%',
    position: 'absolute' as 'absolute',
    pointerEvents: 'none' as 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsIconContainer: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    position: 'relative' as 'relative',
    left: -1 * theme.spacing(1)
  },
  settingsIcon: {
    fontSize: '18px'
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(6),
    transition: theme.transitions.create('width'),
    width: 180,
    '&:focus': {
      width: 240,
    }
  },
  filterSettingsRoot: {
    zIndex: theme.zIndex.drawer + 2
  },
  filterSettingsPaper: {
    padding: theme.spacing(2)
  },
  filterCheckbox: {
    padding: 0,
    marginLeft: 14,
    marginRight: 6
  }
});

export default getStyles;