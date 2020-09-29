import {
  Resolver,
  Query,
  Mutation,
  Arg,
  UseMiddleware,
  Ctx,
} from "type-graphql";
import bcrypt from "bcryptjs";

import { User, UserModel } from "../../entities/User";
import { RegisterInput } from "./register/RegisterInput";
import { isAuth } from "../middleware/isAuth";
import { logger } from "../middleware/logger";
import { sendEmail } from "../utils/sendEmail";
import { createConfirmationToken } from "../utils/createConfirmationToken";
import { AppContext } from "../../types/AppContext";
import {
  forgotPasswordPrefix,
  confirmationPrefix,
} from "../constants/redisPrefixes";
import { v4 } from "uuid";
import { ChangePasswordInput } from "./changePassword/changePasswordInput";
import { COOKIE_NAME } from "../../constants";

@Resolver(User)
export class UserResolver {
  @UseMiddleware(isAuth, logger)
  @Query(() => String)
  async hello() {
    return "Hello world";
  }

  @Mutation(() => User)
  async register(
    @Arg("data") { email, firstName, lastName, password }: RegisterInput,
    @Ctx() { redis }: AppContext
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12);
    console.log(email, password);
    const user = await (
      await UserModel.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      } as User)
    ).save();

    await sendEmail(email, await createConfirmationToken(user._id, redis));

    return user;
  }

  @Mutation(() => User, { nullable: true })
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() ctx: AppContext
  ): Promise<User | null> {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return null;
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return null;
    }

    if (!user.confirmed) {
      return null;
    }

    ctx.req.session!.userId = user.id;

    return user;
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: AppContext) {
    return new Promise((res, rej) =>
      ctx.req.session!.destroy((err) => {
        if (err) {
          console.log(err);
          return rej(false);
        }

        ctx.res.clearCookie(COOKIE_NAME);
        return res(true);
      })
    );
  }

  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg("email") email: string,
    @Ctx() { redis }: AppContext
  ): Promise<boolean> {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return false;
    }

    const token = v4();
    await redis.set(forgotPasswordPrefix + token, user.id, "ex", 60 * 60 * 24); // 1 day expiration

    await sendEmail(email, token);

    return true;
  }

  @Mutation(() => Boolean)
  async confirmUser(
    @Arg("token") token: string,
    @Ctx() { redis }: AppContext
  ): Promise<boolean> {
    const userId = await redis.get(confirmationPrefix + token);

    if (!userId) {
      return false;
    }

    await UserModel.updateOne({ _id: userId }, { confirmed: true });
    redis.del(token);

    return true;
  }

  @Mutation(() => User, { nullable: true })
  async changePassword(
    @Arg("data") { token, password }: ChangePasswordInput,
    @Ctx() { req, redis }: AppContext
  ): Promise<User | null> {
    const userId = await redis.get(forgotPasswordPrefix + token);
    if (!userId) return null;

    const user = await UserModel.findById(userId);

    if (!user) return null;

    await redis.del(forgotPasswordPrefix + token);

    user.password = await bcrypt.hash(password, 12);
    user.save();

    req.session!.userId = user.id;

    return user;
  }

  @Query(() => User, { nullable: true, complexity: 5 })
  async me(@Ctx() ctx: AppContext) {
    if (!ctx.req.session!.userId) {
      return null;
    }

    return UserModel.findOne({ _id: ctx.req.session!.userId });
  }
}
