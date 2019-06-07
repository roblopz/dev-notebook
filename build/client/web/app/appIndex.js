import * as tslib_1 from "tslib";
import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { Switch, Route } from 'react-router-dom';
// Components
import Main from './components/main/main';
import CurrentTheme from './components/currentTheme/currentTheme';
import PageEditModal from './components/pageEdit/pageEditModal';
var App = /** @class */ (function (_super) {
    tslib_1.__extends(App, _super);
    function App() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    App.prototype.render = function () {
        return (React.createElement(React.Fragment, null,
            React.createElement(Switch, null,
                React.createElement(Route, { exact: true, path: "/", component: Main }),
                React.createElement(Route, { exact: true, path: "/theme", component: CurrentTheme })),
            React.createElement(PageEditModal, null)));
    };
    return App;
}(React.Component));
export default hot(App);
//# sourceMappingURL=appIndex.js.map