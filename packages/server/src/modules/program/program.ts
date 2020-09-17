import {
  Resolver,
  Query,
  Arg,
  Int,
  Mutation,
  UseMiddleware,
  Ctx,
} from "type-graphql";

import { Program, ProgramModel, ProgramDetails } from "../../entities/Program";
import { isAuth } from "../middleware/isAuth";
import { AppContext } from "../../types/AppContext";
import { UserModel } from "../../entities/User";
import { mongoose } from "@typegoose/typegoose";

@Resolver(Program)
export class ProgramResolver {
  @Query(() => Program)
  async program(@Arg("programId", () => Int) programId: number) {
    return await ProgramModel.findOne({ _id: programId });
  }

  @Query(() => [Program])
  async programs() {
    return await ProgramModel.find();
  }

  @Mutation(() => Boolean)
  async deleteProgram(@Arg("programId", () => Int) programId: number) {
    await ProgramModel.deleteOne({ _id: programId });
    return true;
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Program)
  async createProgram(
    @Arg("title") title: string,
    @Arg("programDetails", () => ProgramDetails) programDetails: ProgramDetails,
    @Ctx() ctx: AppContext
  ): Promise<Program> {
    const user = await UserModel.findOne({ _id: ctx.req.session!.userId });

    return (
      await ProgramModel.create({
        title,
        programDetails,
        authorId: mongoose.Types.ObjectId(user!._id),
      } as Program)
    ).save();
  }
}
