import * as tslib_1 from "tslib";
import gql from 'graphql-tag';
export var fragments = {
    fullPage: gql(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n    fragment FullPage on Page {\n      _id,\n      title,\n      tags,\n      notebook {\n        _id,\n        name,\n        createdAt,\n        updatedAt\n      }\n      notes {\n        _id,\n        header,\n        subheader,\n        content,\n        snippet {\n          code,\n          language\n        },\n        createdAt,\n        updatedAt\n      }\n      createdAt,\n      updatedAt\n    }\n  "], ["\n    fragment FullPage on Page {\n      _id,\n      title,\n      tags,\n      notebook {\n        _id,\n        name,\n        createdAt,\n        updatedAt\n      }\n      notes {\n        _id,\n        header,\n        subheader,\n        content,\n        snippet {\n          code,\n          language\n        },\n        createdAt,\n        updatedAt\n      }\n      createdAt,\n      updatedAt\n    }\n  "])))
};
export var queries = {
    GET_PAGE_RESULTS: gql(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n    {\n      pages {\n        ...FullPage\n      }\n    }\n    ", "\n  "], ["\n    {\n      pages {\n        ...FullPage\n      }\n    }\n    ", "\n  "])), fragments.fullPage),
    GET_ALL_PAGE_TAGS: gql(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n  {\n    tags: allPageTags\n  }\n  "], ["\n  {\n    tags: allPageTags\n  }\n  "])))
};
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=pageQueries.js.map