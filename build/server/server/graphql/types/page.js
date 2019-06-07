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
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const notebook_1 = require("./notebook");
const note_1 = require("./note");
let Page = class Page {
};
__decorate([
    type_graphql_1.Field(type => type_graphql_1.ID),
    __metadata("design:type", String)
], Page.prototype, "_id", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Page.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(type => notebook_1.Notebook),
    __metadata("design:type", Object)
], Page.prototype, "notebook", void 0);
__decorate([
    type_graphql_1.Field(type => [String]),
    __metadata("design:type", Array)
], Page.prototype, "tags", void 0);
__decorate([
    type_graphql_1.Field(type => [note_1.Note]),
    __metadata("design:type", Array)
], Page.prototype, "notes", void 0);
__decorate([
    type_graphql_1.Field({ defaultValue: new Date() }),
    __metadata("design:type", Date)
], Page.prototype, "createdAt", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Date)
], Page.prototype, "updatedAt", void 0);
Page = __decorate([
    type_graphql_1.ObjectType()
], Page);
exports.Page = Page;
//# sourceMappingURL=page.js.map