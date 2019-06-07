import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import { makeStyles } from '@material-ui/styles';
import { getStyles } from '../../styles/jss/main/pageResults';
import PageView from '../pageView/pageView';
import { queries } from '../../graphql/queries/pageQueries';
var GET_PAGE_RESULTS = queries.GET_PAGE_RESULTS;
function PageResults() {
    var classes = makeStyles(getStyles)({});
    var _a = useQuery(GET_PAGE_RESULTS), pages = _a.data.pages, loading = _a.loading;
    if (loading)
        return null;
    return (React.createElement("div", { className: classes.root }, pages.map(function (p, idx) {
        return React.createElement(PageView, { className: idx > 0 ? 'mt-3' : null, key: p._id || idx, page: p });
    })));
}
export default PageResults;
//# sourceMappingURL=pageResults.js.map