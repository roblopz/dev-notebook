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
const note_1 = require("../types/note");
let NoteResolver = class NoteResolver {
    notes(pageID) {
        return data_1.pages.find(p => p._id === pageID).notes;
    }
    allNoteLanguages() {
        const allLangs = data_1.pages.reduce((acc, curr) => {
            const pageLanguages = curr.notes.map(n => n.snippet && n.snippet.language).filter(l => !!l);
            acc.push(...pageLanguages);
            return acc;
        }, []);
        return allLangs.filter((l, idx, self) => self.indexOf(l) === idx);
    }
};
__decorate([
    type_graphql_1.Query(returns => [note_1.Note], { nullable: true }),
    __param(0, type_graphql_1.Arg('pageID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Array)
], NoteResolver.prototype, "notes", null);
__decorate([
    type_graphql_1.Query(returns => [String], { nullable: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], NoteResolver.prototype, "allNoteLanguages", null);
NoteResolver = __decorate([
    type_graphql_1.Resolver(of => note_1.Note)
], NoteResolver);
exports.NoteResolver = NoteResolver;
//# sourceMappingURL=noteResolver.js.map