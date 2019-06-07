import * as tslib_1 from "tslib";
import gql from 'graphql-tag';
export var queries = {
    GET_PAGE_FILTERS: gql(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n    {\n      pageFilters @client {\n        search,\n        notebook,\n        language,\n        tags\n      }\n    }\n  "], ["\n    {\n      pageFilters @client {\n        search,\n        notebook,\n        language,\n        tags\n      }\n    }\n  "])))
};
var templateObject_1;
//# sourceMappingURL=@clientQueries.js.map