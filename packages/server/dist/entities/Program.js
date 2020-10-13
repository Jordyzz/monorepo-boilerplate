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
exports.ProgramModel = exports.Program = exports.Question = exports.Chapter = exports.QuestionOptions = exports.UpVotes = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const type_graphql_1 = require("type-graphql");
let UpVotes = class UpVotes {
};
__decorate([
    type_graphql_1.Field(() => String),
    typegoose_1.prop({ ref: "User", required: true }),
    __metadata("design:type", Object)
], UpVotes.prototype, "userId", void 0);
__decorate([
    type_graphql_1.Field(),
    typegoose_1.prop(),
    __metadata("design:type", Number)
], UpVotes.prototype, "value", void 0);
UpVotes = __decorate([
    type_graphql_1.ObjectType("UpVotesType"),
    type_graphql_1.InputType("UpVotesInput")
], UpVotes);
exports.UpVotes = UpVotes;
let QuestionOptions = class QuestionOptions {
};
__decorate([
    type_graphql_1.Field(),
    typegoose_1.prop(),
    __metadata("design:type", String)
], QuestionOptions.prototype, "a", void 0);
__decorate([
    type_graphql_1.Field(),
    typegoose_1.prop(),
    __metadata("design:type", String)
], QuestionOptions.prototype, "b", void 0);
__decorate([
    type_graphql_1.Field(),
    typegoose_1.prop(),
    __metadata("design:type", String)
], QuestionOptions.prototype, "c", void 0);
__decorate([
    type_graphql_1.Field(),
    typegoose_1.prop(),
    __metadata("design:type", String)
], QuestionOptions.prototype, "d", void 0);
QuestionOptions = __decorate([
    type_graphql_1.ObjectType("QuestionOptionsType"),
    type_graphql_1.InputType("QuestionOptionsInput")
], QuestionOptions);
exports.QuestionOptions = QuestionOptions;
let Chapter = class Chapter {
};
__decorate([
    type_graphql_1.Field(),
    typegoose_1.prop(),
    __metadata("design:type", String)
], Chapter.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(),
    typegoose_1.prop(),
    __metadata("design:type", String)
], Chapter.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field(() => [Question]),
    typegoose_1.prop({ type: () => [Question] }),
    __metadata("design:type", Array)
], Chapter.prototype, "questions", void 0);
Chapter = __decorate([
    type_graphql_1.ObjectType("ChapterType"),
    type_graphql_1.InputType("ChapterInput")
], Chapter);
exports.Chapter = Chapter;
let Question = class Question {
};
__decorate([
    type_graphql_1.Field(),
    typegoose_1.prop(),
    __metadata("design:type", String)
], Question.prototype, "question", void 0);
__decorate([
    type_graphql_1.Field(),
    typegoose_1.prop(),
    __metadata("design:type", String)
], Question.prototype, "correctAnswer", void 0);
__decorate([
    type_graphql_1.Field(),
    typegoose_1.prop(),
    __metadata("design:type", String)
], Question.prototype, "codeSample", void 0);
__decorate([
    type_graphql_1.Field(() => QuestionOptions),
    typegoose_1.prop({ type: () => QuestionOptions }),
    __metadata("design:type", QuestionOptions)
], Question.prototype, "options", void 0);
Question = __decorate([
    type_graphql_1.ObjectType("QuestionType"),
    type_graphql_1.InputType("QuestionInput")
], Question);
exports.Question = Question;
let Program = class Program {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.ID),
    __metadata("design:type", String)
], Program.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typegoose_1.prop({ ref: "User", required: true }),
    __metadata("design:type", Object)
], Program.prototype, "authorId", void 0);
__decorate([
    type_graphql_1.Field(),
    typegoose_1.prop(),
    __metadata("design:type", String)
], Program.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(),
    typegoose_1.prop(),
    __metadata("design:type", String)
], Program.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field(),
    typegoose_1.prop(),
    __metadata("design:type", String)
], Program.prototype, "duration", void 0);
__decorate([
    type_graphql_1.Field(),
    typegoose_1.prop(),
    __metadata("design:type", String)
], Program.prototype, "language", void 0);
__decorate([
    type_graphql_1.Field(),
    typegoose_1.prop(),
    __metadata("design:type", String)
], Program.prototype, "level", void 0);
__decorate([
    type_graphql_1.Field(() => Date),
    typegoose_1.prop({
        type: typegoose_1.mongoose.Schema.Types.Date,
        default: new Date(),
        required: false,
    }),
    __metadata("design:type", Date)
], Program.prototype, "createdAt", void 0);
__decorate([
    type_graphql_1.Field(() => Date),
    typegoose_1.prop({
        type: typegoose_1.mongoose.Schema.Types.Date,
        default: new Date(),
        required: false,
    }),
    __metadata("design:type", Date)
], Program.prototype, "updatedAt", void 0);
__decorate([
    type_graphql_1.Field(() => [Chapter]),
    typegoose_1.prop({ type: () => [Chapter] }),
    __metadata("design:type", Array)
], Program.prototype, "chapters", void 0);
__decorate([
    type_graphql_1.Field(() => [UpVotes]),
    typegoose_1.prop({ type: () => [UpVotes] }),
    __metadata("design:type", Array)
], Program.prototype, "upVotes", void 0);
Program = __decorate([
    typegoose_1.post("save", function (program) {
        program.updatedAt = new Date();
    }),
    type_graphql_1.ObjectType()
], Program);
exports.Program = Program;
exports.ProgramModel = typegoose_1.getModelForClass(Program);
//# sourceMappingURL=Program.js.map