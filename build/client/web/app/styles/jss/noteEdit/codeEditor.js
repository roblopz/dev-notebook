import * as tslib_1 from "tslib";
import { noteTitleIconStyle } from './note';
export var getStyles = function (theme) { return ({
    languagesSelect: {
        display: 'flex',
        alignItems: 'center'
    },
    noteTitleIcon: tslib_1.__assign({}, noteTitleIconStyle, { position: 'relative', top: -1 }),
    switchBase: {
        height: 'unset !important'
    },
    switchLabelWrapper: {
        marginLeft: '-8px',
        marginBottom: 0
    },
    switchLabelText: {
        position: 'relative',
        left: '-8px',
        fontWeight: 500
    }
}); };
export default getStyles;
//# sourceMappingURL=codeEditor.js.map