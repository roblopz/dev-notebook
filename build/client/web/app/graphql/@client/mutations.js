var _a;
import * as tslib_1 from "tslib";
import gql from 'graphql-tag';
import { nameof } from '../../lib/tsUtil';
export var mutations = {
    setPageFilters: {
        get __resolverName() {
            return 'SetPageFilters';
        },
        get __inputName() {
            return nameof('pageFilters');
        },
        get query() {
            return gql("\n        mutation " + this.__resolverName + "($" + this.__inputName + ": Input!) {\n          " + this.__inputName + "(" + this.__inputName + ": $" + this.__inputName + ") @client\n        }\n      ");
        },
        resolver: function (_root, _a, _b) {
            var newFilters = _a.pageFilters;
            var cache = _b.cache;
            var GET_ALL_PAGE_FILTERS = gql(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n        {\n          currentFilters: pageFilters {\n            search,\n            notebook,\n            language,\n            tags\n          }\n        }\n      "], ["\n        {\n          currentFilters: pageFilters {\n            search,\n            notebook,\n            language,\n            tags\n          }\n        }\n      "])));
            var currentFilters = cache.readQuery({ query: GET_ALL_PAGE_FILTERS }).currentFilters;
            var newData = {
                pageFilters: tslib_1.__assign({}, currentFilters, newFilters)
            };
            cache.writeData({
                data: newData
            });
        }
    }
};
export var MutationDefs = (_a = {},
    _a[mutations.setPageFilters.__resolverName] = mutations.setPageFilters.resolver,
    _a);
var templateObject_1;
//# sourceMappingURL=mutations.js.map