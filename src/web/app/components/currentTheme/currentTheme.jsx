import React from 'react';
import { useTheme } from '@material-ui/styles';
import Inspector from 'react-inspector';

const CurrentTheme = () => {
  const theme = useTheme();

  return (
    <div>
      <Inspector data={theme} theme={theme.palette.type === 'light' ? 'chromeLight' : 'chromeDark'} />
    </div>
  );
};

export default CurrentTheme;