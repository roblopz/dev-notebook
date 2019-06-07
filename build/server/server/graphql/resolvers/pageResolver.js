"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const page_1 = require("../types/page");
const notebook_1 = require("../types/notebook");
const data_1 = require("../../data");
const pageInputs_1 = require("../inputs/pageInputs");
const commonInputs_1 = require("../inputs/commonInputs");
let PageResolver = class PageResolver {
    pages(pageFilter, pagination) {
        return data_1.pages;
    }
    notebook(page) {
        if (typeof page.notebook === 'string') {
            return data_1.notebooks.find(n => n._id === page.notebook);
        }
        else {
            return page.notebook;
        }
    }
    allPageTags() {
        const allTags = data_1.pages.reduce((acc, curr) => {
            acc.push(...curr.tags);
            return acc;
        }, []);
        return allTags.filter((l, idx, self) => self.indexOf(l) === idx);
    }
};
__decorate([
    type_graphql_1.Query(returns => [page_1.Page], { nullable: true }),
    __param(0, type_graphql_1.Arg('filter', { nullable: true })),
    __param(1, type_graphql_1.Arg('pagination', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pageInputs_1.PageFilterInput,
        commonInputs_1.PaginateInput]),
    __metadata("design:returntype", Array)
], PageResolver.prototype, "pages", null);
__decorate([
    type_graphql_1.FieldResolver(),
    __param(0, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [page_1.Page]),
    __metadata("design:returntype", notebook_1.Notebook)
], PageResolver.prototype, "notebook", null);
__decorate([
    type_graphql_1.Query(returns => [String], { nullable: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], PageResolver.prototype, "allPageTags", null);
PageResolver = __decorate([
    type_graphql_1.Resolver(of => page_1.Page)
], PageResolver);
exports.PageResolver = PageResolver;
//# sourceMappingURL=pageResolver.js.map