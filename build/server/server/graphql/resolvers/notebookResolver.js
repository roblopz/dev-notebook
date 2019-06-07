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
const data_1 = require("../../data");
const notebook_1 = require("../types/notebook");
let NotebookResolver = class NotebookResolver {
    notebooks() {
        return data_1.notebooks;
    }
    pages(notebook) {
        const res = [];
        notebook.pages.forEach(np => {
            if (typeof np === 'string') {
                const page = data_1.pages.find(p => p._id === np);
                res.push(page);
            }
            else {
                res.push(np);
            }
        });
        return res;
    }
};
__decorate([
    type_graphql_1.Query(returns => [notebook_1.Notebook], { nullable: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], NotebookResolver.prototype, "notebooks", null);
__decorate([
    type_graphql_1.FieldResolver(),
    __param(0, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [notebook_1.Notebook]),
    __metadata("design:returntype", Array)
], NotebookResolver.prototype, "pages", null);
NotebookResolver = __decorate([
    type_graphql_1.Resolver(of => notebook_1.Notebook)
], NotebookResolver);
exports.NotebookResolver = NotebookResolver;
//# sourceMappingURL=notebookResolver.js.map