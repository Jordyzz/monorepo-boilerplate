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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgramResolver = void 0;
const type_graphql_1 = require("type-graphql");
const Program_1 = require("../../entities/Program");
const isAuth_1 = require("../middleware/isAuth");
const User_1 = require("../../entities/User");
const typegoose_1 = require("@typegoose/typegoose");
let ProgramResolver = class ProgramResolver {
    program(programId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Program_1.ProgramModel.findOne({ _id: programId });
        });
    }
    programs() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Program_1.ProgramModel.find();
        });
    }
    deleteProgram(programId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Program_1.ProgramModel.deleteOne({ _id: programId });
            return true;
        });
    }
    createProgram(title, programDetails, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.UserModel.findOne({ _id: ctx.req.session.userId });
            return (yield Program_1.ProgramModel.create({
                title,
                programDetails,
                authorId: typegoose_1.mongoose.Types.ObjectId(user._id),
            })).save();
        });
    }
};
__decorate([
    type_graphql_1.Query(() => Program_1.Program),
    __param(0, type_graphql_1.Arg("programId", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProgramResolver.prototype, "program", null);
__decorate([
    type_graphql_1.Query(() => [Program_1.Program]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProgramResolver.prototype, "programs", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("programId", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProgramResolver.prototype, "deleteProgram", null);
__decorate([
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    type_graphql_1.Mutation(() => Program_1.Program),
    __param(0, type_graphql_1.Arg("title")),
    __param(1, type_graphql_1.Arg("programDetails", () => Program_1.ProgramDetails)),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Program_1.ProgramDetails, Object]),
    __metadata("design:returntype", Promise)
], ProgramResolver.prototype, "createProgram", null);
ProgramResolver = __decorate([
    type_graphql_1.Resolver(Program_1.Program)
], ProgramResolver);
exports.ProgramResolver = ProgramResolver;
//# sourceMappingURL=Program.js.map