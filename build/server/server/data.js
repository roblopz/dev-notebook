"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const shortid_1 = __importDefault(require("shortid"));
// tslint:disable max-line-length
const notebook1PageIDs = [shortid_1.default.generate(), shortid_1.default.generate()];
const notebook2PageIDs = [shortid_1.default.generate(), shortid_1.default.generate()];
const notebooks = [
    {
        _id: shortid_1.default.generate(),
        createdAt: new Date(),
        name: 'Notebook 1',
        pages: notebook1PageIDs
    },
    {
        _id: shortid_1.default.generate(),
        createdAt: new Date(),
        name: 'Notebook 2',
        pages: notebook2PageIDs
    }
];
exports.notebooks = notebooks;
const pages = [
    {
        _id: notebook1PageIDs[0],
        createdAt: new Date(),
        notebook: notebooks[0]._id,
        title: 'Page 1 title',
        tags: ['page', 'one', 'tags'],
        notes: [
            {
                _id: shortid_1.default.generate(),
                content: '{"blocks":[{"key":"bd82p","text":"This is the main note content.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"7a9d3","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"c45fn","text":"This is the second line of it.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":12,"length":6,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}',
                snippet: { code: 'var express = require(\'express\');\nvar app = express();\napp.get(\'/\', function (req, res) {\nres.send(\'Hello World!\');\n});\napp.listen(3000, function () {\nconsole.log(\'Example app listening on port 3000!\');\n})', language: 'html', createdAt: new Date() },
                createdAt: new Date(),
                header: 'Page 1 note 1 header',
                subheader: 'Note 1 subheader',
                hideContent: false,
                hideSnippet: false
            },
            {
                _id: shortid_1.default.generate(),
                content: '{"blocks":[{"key":"bd82p","text":"This is the main note content.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"7a9d3","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"c45fn","text":"This is the second line of it.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":12,"length":6,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}',
                snippet: { code: 'var express = require(\'express\');\nvar app = express();\napp.get(\'/\', function (req, res) {\nres.send(\'Hello World!\');\n});\napp.listen(3000, function () {\nconsole.log(\'Example app listening on port 3000!\');\n})', language: 'javascript', createdAt: new Date() },
                createdAt: new Date(),
                header: 'Page 1 note 2 header',
                subheader: 'Note 2 subheader',
                hideContent: false,
                hideSnippet: false
            }
        ]
    },
    {
        _id: notebook1PageIDs[1],
        createdAt: new Date(),
        notebook: notebooks[0]._id,
        title: 'Page 2 title',
        tags: ['page', 'two', 'tags'],
        notes: [
            {
                _id: shortid_1.default.generate(),
                content: '{"blocks":[{"key":"bd82p","text":"This is the main note content.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"7a9d3","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"c45fn","text":"This is the second line of it.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":12,"length":6,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}',
                snippet: { code: 'var express = require(\'express\');\nvar app = express();\napp.get(\'/\', function (req, res) {\nres.send(\'Hello World!\');\n});\napp.listen(3000, function () {\nconsole.log(\'Example app listening on port 3000!\');\n})', language: 'text', createdAt: new Date() },
                createdAt: new Date(),
                header: 'Page 2 note 1 header',
                subheader: 'Note 1 subheader',
                hideContent: false,
                hideSnippet: false
            },
            {
                _id: shortid_1.default.generate(),
                content: '{"blocks":[{"key":"bd82p","text":"This is the main note content.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"7a9d3","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"c45fn","text":"This is the second line of it.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":12,"length":6,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}',
                snippet: { code: 'var express = require(\'express\');\nvar app = express();\napp.get(\'/\', function (req, res) {\nres.send(\'Hello World!\');\n});\napp.listen(3000, function () {\nconsole.log(\'Example app listening on port 3000!\');\n})', language: 'javascript', createdAt: new Date() },
                createdAt: new Date(),
                header: 'Page 2 note 2 header',
                subheader: 'Note 2 subheader',
                hideContent: false,
                hideSnippet: false
            }
        ]
    },
    {
        _id: notebook2PageIDs[0],
        createdAt: new Date(),
        notebook: notebooks[0]._id,
        title: 'Page 3 title',
        tags: ['page', 'three', 'tags'],
        notes: [
            {
                _id: shortid_1.default.generate(),
                content: '{"blocks":[{"key":"bd82p","text":"This is the main note content.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"7a9d3","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"c45fn","text":"This is the second line of it.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":12,"length":6,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}',
                snippet: { code: 'var express = require(\'express\');\nvar app = express();\napp.get(\'/\', function (req, res) {\nres.send(\'Hello World!\');\n});\napp.listen(3000, function () {\nconsole.log(\'Example app listening on port 3000!\');\n})', language: 'javascript', createdAt: new Date() },
                createdAt: new Date(),
                header: 'Page 3 note 1 header',
                subheader: 'Note 1 subheader',
                hideContent: false,
                hideSnippet: false
            },
            {
                _id: shortid_1.default.generate(),
                content: '{"blocks":[{"key":"bd82p","text":"This is the main note content.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"7a9d3","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"c45fn","text":"This is the second line of it.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":12,"length":6,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}',
                snippet: { code: 'var express = require(\'express\');\nvar app = express();\napp.get(\'/\', function (req, res) {\nres.send(\'Hello World!\');\n});\napp.listen(3000, function () {\nconsole.log(\'Example app listening on port 3000!\');\n})', language: 'javascript', createdAt: new Date() },
                createdAt: new Date(),
                header: 'Page 3 note 2 header',
                subheader: 'Note 2 subheader',
                hideContent: false,
                hideSnippet: false
            }
        ]
    },
    {
        _id: notebook2PageIDs[1],
        createdAt: new Date(),
        notebook: notebooks[0]._id,
        title: 'Page 4 title',
        tags: ['page', 'four', 'tags'],
        notes: [
            {
                _id: shortid_1.default.generate(),
                content: '{"blocks":[{"key":"bd82p","text":"This is the main note content.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"7a9d3","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"c45fn","text":"This is the second line of it.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":12,"length":6,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}',
                snippet: { code: 'var express = require(\'express\');\nvar app = express();\napp.get(\'/\', function (req, res) {\nres.send(\'Hello World!\');\n});\napp.listen(3000, function () {\nconsole.log(\'Example app listening on port 3000!\');\n})', language: 'javascript', createdAt: new Date() },
                createdAt: new Date(),
                header: 'Page 4 note 1 header',
                subheader: 'Note 1 subheader',
                hideContent: false,
                hideSnippet: false
            },
            {
                _id: shortid_1.default.generate(),
                content: '{"blocks":[{"key":"bd82p","text":"This is the main note content.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"7a9d3","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"c45fn","text":"This is the second line of it.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":12,"length":6,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}',
                snippet: { code: 'var express = require(\'express\');\nvar app = express();\napp.get(\'/\', function (req, res) {\nres.send(\'Hello World!\');\n});\napp.listen(3000, function () {\nconsole.log(\'Example app listening on port 3000!\');\n})', language: 'javascript', createdAt: new Date() },
                createdAt: new Date(),
                header: 'Page 4 note 2 header',
                subheader: 'Note 2 subheader',
                hideContent: false,
                hideSnippet: false
            }
        ]
    }
];
exports.pages = pages;
//# sourceMappingURL=data.js.map