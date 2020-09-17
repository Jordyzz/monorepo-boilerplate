"use strict";
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
require("reflect-metadata");
const apollo_server_express_1 = require("apollo-server-express");
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const mongoose_1 = require("mongoose");
const connect_redis_1 = __importDefault(require("connect-redis"));
const ioredis_1 = __importDefault(require("ioredis"));
const cors_1 = __importDefault(require("cors"));
const mongoURI_1 = require("./utils/mongoURI");
const type_graphql_1 = require("type-graphql");
const user_1 = require("./modules/user/user");
const Program_1 = require("./modules/program/Program");
const constants_1 = require("./constants");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const mongoose = yield mongoose_1.connect(mongoURI_1.uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    yield mongoose.connection;
    const app = express_1.default();
    app.use(cors_1.default({
        credentials: true,
        origin: "http://localhost:3000",
    }));
    const RedisStore = connect_redis_1.default(express_session_1.default);
    const redis = new ioredis_1.default();
    const sessionOption = {
        store: new RedisStore({
            client: redis,
            disableTouch: true,
        }),
        name: constants_1.COOKIE_NAME,
        secret: "1231easdsf",
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: constants_1.__prod__,
            sameSite: "lax",
            maxAge: 1000 * 60 * 60 * 24 * 7 * 365,
        },
    };
    app.use(express_session_1.default(sessionOption));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: yield type_graphql_1.buildSchema({
            resolvers: [user_1.UserResolver, Program_1.ProgramResolver],
            validate: false,
        }),
        context: ({ req, res }) => ({ req, res, redis }),
    });
    apolloServer.applyMiddleware({ app, cors: false });
    app.listen(4000, () => console.log("Server started on http://localhost:4000/graphql"));
});
main();
//# sourceMappingURL=index.js.map