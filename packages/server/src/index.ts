import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import session from "express-session";
import { connect } from "mongoose";
import connectRedis from "connect-redis";
import Redis from "ioredis";

import cors from "cors";

import { uri } from "./utils/mongoURI";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./modules/user/user";
import { ProgramResolver } from "./modules/program/Program";
import { __prod__, COOKIE_NAME } from "./constants";
import { AppContext } from "./types/AppContext";

const main = async () => {
  const mongoose = await connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await mongoose.connection;

  const app = express();

  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000",
    })
  );

  const RedisStore = connectRedis(session);
  const redis = new Redis();
  const sessionOption: session.SessionOptions = {
    store: new RedisStore({
      client: redis,
      disableTouch: true,
    }),
    name: COOKIE_NAME,
    secret: "1231easdsf", // TODO: Should move to .ENV file
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: __prod__,
      sameSite: "lax", // csrf
      maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
    },
  };

  app.use(session(sessionOption));

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, ProgramResolver],
      validate: false,
    }),
    context: ({ req, res }): AppContext => ({ req, res, redis }),
  });

  apolloServer.applyMiddleware({ app, cors: false });
  app.listen(4000, () =>
    console.log("Server started on http://localhost:4000/graphql")
  );
};

main();
