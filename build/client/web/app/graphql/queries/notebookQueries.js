import * as tslib_1 from "tslib";
import gql from 'graphql-tag';
export var queries = {
    GET_NOTEBOOK_LIST: gql(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n    {\n      notebooks {\n        _id,\n        name\n      }\n    }\n  "], ["\n    {\n      notebooks {\n        _id,\n        name\n      }\n    }\n  "])))
};
var templateObject_1;
//# sourceMappingURL=notebookQueries.js.map