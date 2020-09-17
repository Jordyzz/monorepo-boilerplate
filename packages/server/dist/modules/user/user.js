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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
const type_graphql_1 = require("type-graphql");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = require("../../entities/User");
const RegisterInput_1 = require("./register/RegisterInput");
const isAuth_1 = require("../middleware/isAuth");
const logger_1 = require("../middleware/logger");
const sendEmail_1 = require("../utils/sendEmail");
const createConfirmationUrl_1 = require("../utils/createConfirmationUrl");
const redisPrefixes_1 = require("../constants/redisPrefixes");
const uuid_1 = require("uuid");
const changePasswordInput_1 = require("./changePassword/changePasswordInput");
const constants_1 = require("../../constants");
let UserResolver = class UserResolver {
    hello() {
        return __awaiter(this, void 0, void 0, function* () {
            return "Hello world";
        });
    }
    register({ email, firstName, lastName, password }, { redis }) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield bcryptjs_1.default.hash(password, 12);
            console.log(email, password);
            const user = yield (yield User_1.UserModel.create({
                firstName,
                lastName,
                email,
                password: hashedPassword,
            })).save();
            yield sendEmail_1.sendEmail(email, yield createConfirmationUrl_1.createConfirmationUrl(user._id, redis));
            return user;
        });
    }
    login(email, password, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.UserModel.findOne({ email });
            if (!user) {
                return null;
            }
            const isValid = yield bcryptjs_1.default.compare(password, user.password);
            if (!isValid) {
                return null;
            }
            if (!user.confirmed) {
                return null;
            }
            ctx.req.session.userId = user.id;
            return user;
        });
    }
    logout(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((res, rej) => ctx.req.session.destroy((err) => {
                if (err) {
                    console.log(err);
                    return rej(false);
                }
                ctx.res.clearCookie(constants_1.COOKIE_NAME);
                return res(true);
            }));
        });
    }
    forgotPassword(email, { redis }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.UserModel.findOne({ where: { email } });
            if (!user) {
                return false;
            }
            const token = uuid_1.v4();
            yield redis.set(redisPrefixes_1.forgotPasswordPrefix + token, user.id, "ex", 60 * 60 * 24);
            yield sendEmail_1.sendEmail(email, `http://localhost:3000/user/change-password/${token}`);
            return true;
        });
    }
    confirmUser(token, { redis }) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = yield redis.get(redisPrefixes_1.confirmationPrefix + token);
            if (!userId) {
                return false;
            }
            yield User_1.UserModel.updateOne({ _id: userId }, { confirmed: true });
            redis.del(token);
            return true;
        });
    }
    changePassword({ token, password }, { req, redis }) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = yield redis.get(redisPrefixes_1.forgotPasswordPrefix + token);
            if (!userId)
                return null;
            const user = yield User_1.UserModel.findOne({ userId });
            if (!user)
                return null;
            yield redis.del(redisPrefixes_1.forgotPasswordPrefix + token);
            user.password = yield bcryptjs_1.default.hash(password, 12);
            user.save();
            req.session.userId = user.id;
            return user;
        });
    }
    me(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!ctx.req.session.userId) {
                return null;
            }
            return User_1.UserModel.findOne({ _id: ctx.req.session.userId });
        });
    }
};
__decorate([
    type_graphql_1.UseMiddleware(isAuth_1.isAuth, logger_1.logger),
    type_graphql_1.Query(() => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "hello", null);
__decorate([
    type_graphql_1.Mutation(() => User_1.User),
    __param(0, type_graphql_1.Arg("data")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RegisterInput_1.RegisterInput, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "register", null);
__decorate([
    type_graphql_1.Mutation(() => User_1.User, { nullable: true }),
    __param(0, type_graphql_1.Arg("email")),
    __param(1, type_graphql_1.Arg("password")),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "logout", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("email")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "forgotPassword", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("token")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "confirmUser", null);
__decorate([
    type_graphql_1.Mutation(() => User_1.User, { nullable: true }),
    __param(0, type_graphql_1.Arg("data")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [changePasswordInput_1.ChangePasswordInput, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "changePassword", null);
__decorate([
    type_graphql_1.Query(() => User_1.User, { nullable: true, complexity: 5 }),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "me", null);
UserResolver = __decorate([
    type_graphql_1.Resolver(User_1.User)
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.js.map