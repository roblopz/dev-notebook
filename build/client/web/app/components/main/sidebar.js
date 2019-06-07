import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import { getStyles } from '../../styles/jss/main/sidebar';
import PageSearch from './pageSearch';
import NotebookTree from './notebookTree';
import LanguageTree from './languageTree';
import TagsTree from './tagsTree';
import { useQuery } from 'react-apollo-hooks';
import { queries as notebookQueries } from '../../graphql/queries/notebookQueries';
import { queries as noteQueries } from '../../graphql/queries/noteQueries';
import { queries as pageQueries } from '../../graphql/queries/pageQueries';
var GET_NOTEBOOK_LIST = notebookQueries.GET_NOTEBOOK_LIST;
var GET_ALL_NOTE_LANGUAGES = noteQueries.GET_ALL_NOTE_LANGUAGES;
var GET_ALL_PAGE_TAGS = pageQueries.GET_ALL_PAGE_TAGS;
function Sidebar() {
    var classes = makeStyles(getStyles)({});
    var _a = useQuery(GET_NOTEBOOK_LIST), notebooks = _a.data.notebooks, loadingNotebooks = _a.loading;
    var _b = useQuery(GET_ALL_NOTE_LANGUAGES), languages = _b.data.languages, loadingLanguages = _b.loading;
    var _c = useQuery(GET_ALL_PAGE_TAGS), tags = _c.data.tags, loadingTags = _c.loading;
    if (loadingNotebooks || loadingLanguages || loadingTags)
        return null;
    return (React.createElement(Drawer, { variant: "permanent", className: classes.drawer, classes: { paper: classes.drawerPaper } },
        React.createElement("div", { className: classes.toolbar }),
        React.createElement(PageSearch, null),
        React.createElement(Divider, null),
        React.createElement("div", { className: "h-100" },
            React.createElement(NotebookTree, { notebooks: notebooks }),
            React.createElement(LanguageTree, { languages: languages }),
            React.createElement(TagsTree, { tags: tags }))));
}
export default Sidebar;
//# sourceMappingURL=sidebar.js.map