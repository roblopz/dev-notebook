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
    marginLeft: theme.spacing.unit,
    width: 'auto' as 'auto',
    marginRight: theme.spacing.unit
  },
  searchIconContainer: {
    width: theme.spacing.unit * 6,
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
    left: -1 * theme.spacing.unit
  },
  settingsIcon: {
    fontSize: '18px'
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 5,
    transition: theme.transitions.create('width'),
    width: 120,
    '&:focus': {
      width: 200,
    }
  },
  filterSettingsRoot: {
    zIndex: theme.zIndex.drawer + 2
  },
  filterSettingsPaper: {
    padding: theme.spacing.unit * 2
  },
  filterCheckbox: {
    padding: 0,
    marginLeft: 14,
    marginRight: 6
  }
});

export default getStyles;