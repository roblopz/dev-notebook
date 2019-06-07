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
const class_validator_1 = require("class-validator");
let PageFilterInput = class PageFilterInput {
};
__decorate([
    type_graphql_1.Field({ nullable: true }),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.Length(3),
    __metadata("design:type", String)
], PageFilterInput.prototype, "search", void 0);
__decorate([
    type_graphql_1.Field(type => type_graphql_1.ID, { nullable: true }),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], PageFilterInput.prototype, "notebook", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], PageFilterInput.prototype, "language", void 0);
__decorate([
    type_graphql_1.Field(type => [String], { nullable: true }),
    class_validator_1.IsOptional(),
    class_validator_1.IsArray(),
    __metadata("design:type", String)
], PageFilterInput.prototype, "tags", void 0);
PageFilterInput = __decorate([
    type_graphql_1.InputType()
], PageFilterInput);
exports.PageFilterInput = PageFilterInput;
//# sourceMappingURL=pageInputs.js.map