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
exports.ProgramModel = exports.Program = exports.ProgramDetails = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const type_graphql_1 = require("type-graphql");
let ProgramDetails = class ProgramDetails {
};
__decorate([
    type_graphql_1.Field(),
    typegoose_1.prop(),
    __metadata("design:type", String)
], ProgramDetails.prototype, "type", void 0);
__decorate([
    type_graphql_1.Field(),
    typegoose_1.prop(),
    __metadata("design:type", String)
], ProgramDetails.prototype, "description", void 0);
ProgramDetails = __decorate([
    type_graphql_1.ObjectType("ProgramType"),
    type_graphql_1.InputType("ProgramInput")
], ProgramDetails);
exports.ProgramDetails = ProgramDetails;
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
    type_graphql_1.Field(() => ProgramDetails),
    typegoose_1.prop({ ref: ProgramDetails, required: false }),
    __metadata("design:type", Object)
], Program.prototype, "programDetails", void 0);
Program = __decorate([
    typegoose_1.post("save", function (program) {
        program.updatedAt = new Date();
    }),
    type_graphql_1.ObjectType()
], Program);
exports.Program = Program;
exports.ProgramModel = typegoose_1.getModelForClass(Program);
//# sourceMappingURL=Program.js.map