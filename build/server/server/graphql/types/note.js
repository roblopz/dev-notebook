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
// tslint:disable max-classes-per-file
let Snippet = class Snippet {
};
__decorate([
    type_graphql_1.Field(type => type_graphql_1.ID, { nullable: true }),
    __metadata("design:type", String)
], Snippet.prototype, "_id", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Snippet.prototype, "language", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Snippet.prototype, "code", void 0);
__decorate([
    type_graphql_1.Field({ defaultValue: new Date() }),
    __metadata("design:type", Date)
], Snippet.prototype, "createdAt", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Date)
], Snippet.prototype, "updatedAt", void 0);
Snippet = __decorate([
    type_graphql_1.ObjectType()
], Snippet);
exports.Snippet = Snippet;
let Note = class Note {
};
__decorate([
    type_graphql_1.Field(type => type_graphql_1.ID),
    __metadata("design:type", String)
], Note.prototype, "_id", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Note.prototype, "header", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], Note.prototype, "subheader", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], Note.prototype, "content", void 0);
__decorate([
    type_graphql_1.Field(type => Snippet, { nullable: true }),
    __metadata("design:type", Snippet)
], Note.prototype, "snippet", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true, defaultValue: false }),
    __metadata("design:type", Boolean)
], Note.prototype, "hideContent", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true, defaultValue: false }),
    __metadata("design:type", Boolean)
], Note.prototype, "hideSnippet", void 0);
__decorate([
    type_graphql_1.Field({ defaultValue: new Date() }),
    __metadata("design:type", Date)
], Note.prototype, "createdAt", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Date)
], Note.prototype, "updatedAt", void 0);
Note = __decorate([
    type_graphql_1.ObjectType()
], Note);
exports.Note = Note;
//# sourceMappingURL=note.js.map