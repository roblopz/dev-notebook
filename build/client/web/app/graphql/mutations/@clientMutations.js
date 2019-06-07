import * as tslib_1 from "tslib";
import gql from 'graphql-tag';
export var mutations = {
    SET_PAGE_FILTERS: gql(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n    {\n      mutation SetPageFilters($id: Int!) {\n        toggleTodo(id: $id) @client\n      }\n    }\n  "], ["\n    {\n      mutation SetPageFilters($id: Int!) {\n        toggleTodo(id: $id) @client\n      }\n    }\n  "])))
};
var templateObject_1;
//# sourceMappingURL=@clientMutations.js.map