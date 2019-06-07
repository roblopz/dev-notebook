import * as tslib_1 from "tslib";
import React, { useState, useRef, useCallback } from 'react';
// import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import FilterIcon from '@material-ui/icons/FilterListRounded';
import SettingsIconActive from '@material-ui/icons/SettingsApplicationsRounded';
import SettingsIcon from '@material-ui/icons/SettingsRounded';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Popper from '@material-ui/core/Popper';
import Typography from '@material-ui/core/Typography';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { getStyles } from '../../styles/jss/main/navbarSearch';
var allOptions = ['header', 'subheader', 'content', 'snippet.code'];
function NavbarFilterNotes() {
    var classes = makeStyles(getStyles)({});
    var _a = useState(null), filterBy = _a[0], setFilterBy = _a[1];
    var _b = useState(false), filterSettingsOpen = _b[0], setFilterSettingsOpen = _b[1];
    var iconButtonRef = useRef(null);
    var toggleFilterSettingsOpen = useCallback(function () {
        setFilterSettingsOpen(!filterSettingsOpen);
    }, [filterSettingsOpen]);
    var toggleFilterBy = useCallback(function (evt, option) {
        var newFilterBy = filterBy;
        if (!option) {
            if (evt.target.checked)
                newFilterBy = allOptions;
        }
        else {
            if (evt.target.checked) {
                newFilterBy = newFilterBy ? newFilterBy.concat([option]) : [option];
            }
            else { // Not checked
                if (newFilterBy)
                    newFilterBy = newFilterBy.filter(function (f) { return f !== option; }).slice();
                else
                    newFilterBy = allOptions.filter(function (f) { return f !== option; });
            }
        }
        if (!(newFilterBy || []).length)
            newFilterBy = null;
        if (newFilterBy !== filterBy)
            setFilterBy(newFilterBy);
    }, [filterBy]);
    var noFiltering = !filterBy || filterBy.length === allOptions.length;
    return (React.createElement("div", { className: classes.searchControlsContainer },
        React.createElement("div", { className: classes.searchInput },
            React.createElement("div", { className: classes.searchIconContainer },
                React.createElement(FilterIcon, null)),
            React.createElement(InputBase, { placeholder: "Filter notes", classes: { root: classes.inputRoot, input: classes.inputInput } })),
        React.createElement("div", { className: classes.settingsIconContainer, ref: iconButtonRef, onClick: toggleFilterSettingsOpen }, noFiltering ? React.createElement(SettingsIcon, { className: classes.settingsIcon })
            : React.createElement(SettingsIconActive, { className: classes.settingsIcon })),
        React.createElement(Popper, { className: classes.filterSettingsRoot, open: filterSettingsOpen, anchorEl: iconButtonRef.current, transition: true }, function (_a) {
            var TransitionProps = _a.TransitionProps;
            return (React.createElement(Grow, tslib_1.__assign({}, TransitionProps),
                React.createElement(ClickAwayListener, { onClickAway: function (evt) {
                        if (!iconButtonRef.current.contains(evt.target))
                            toggleFilterSettingsOpen();
                    } },
                    React.createElement(Paper, { className: classes.filterSettingsPaper },
                        React.createElement(Typography, { variant: "subtitle2", className: "mb-2" }, "Filter by:"),
                        React.createElement("div", null,
                            React.createElement(FormGroup, null,
                                React.createElement(FormControlLabel, { label: "Everything", control: React.createElement(Checkbox, { checked: noFiltering, onChange: function (evt) { return toggleFilterBy(evt, null); }, className: classes.filterCheckbox, color: "primary" }), disabled: noFiltering }),
                                React.createElement(FormControlLabel, { label: "Note header", control: React.createElement(Checkbox, { checked: !filterBy || filterBy.includes('header'), onChange: function (evt) { return toggleFilterBy(evt, 'header'); }, className: classes.filterCheckbox, color: "primary" }) }),
                                React.createElement(FormControlLabel, { label: "Note subheader", control: React.createElement(Checkbox, { checked: !filterBy || filterBy.includes('subheader'), onChange: function (evt) { return toggleFilterBy(evt, 'subheader'); }, className: classes.filterCheckbox, color: "primary" }) }),
                                React.createElement(FormControlLabel, { label: "Note content", control: React.createElement(Checkbox, { checked: !filterBy || filterBy.includes('content'), onChange: function (evt) { return toggleFilterBy(evt, 'content'); }, className: classes.filterCheckbox, color: "primary" }) }),
                                React.createElement(FormControlLabel, { label: "Note snippet", control: React.createElement(Checkbox, { checked: !filterBy || filterBy.includes('snippet.code'), onChange: function (evt) { return toggleFilterBy(evt, 'snippet.code'); }, className: classes.filterCheckbox, color: "primary" }) })))))));
        })));
}
NavbarFilterNotes.propTypes = {};
export default NavbarFilterNotes;
//# sourceMappingURL=navbarFilterNotes.js.map