import React from 'react';
import { useTheme } from '@material-ui/styles';
import Inspector from 'react-inspector';
var CurrentTheme = function () {
    var theme = useTheme();
    return (React.createElement("div", null,
        React.createElement(Inspector, { data: theme, theme: theme.palette.type === 'light' ? 'chromeLight' : 'chromeDark' })));
};
export default CurrentTheme;
//# sourceMappingURL=currentTheme.js.map