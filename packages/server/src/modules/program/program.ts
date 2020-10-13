import {
  Resolver,
  Query,
  Arg,
  Int,
  Mutation,
  UseMiddleware,
  Ctx,
  ObjectType,
  Field,
} from "type-graphql";

import {
  Program,
  ProgramModel,
  Chapter,
  UpVotes,
} from "../../entities/Program";
import { isAuth } from "../middleware/isAuth";
import { AppContext } from "../../types/AppContext";
import { UserModel } from "../../entities/User";
import { mongoose } from "@typegoose/typegoose";

@ObjectType()
class PaginatedPrograms {
  @Field(() => [Program])
  programs: Program[];
  @Field()
  hasMore: boolean;
}

@Resolver(Program)
export class ProgramResolver {
  @Query(() => Program)
  async program(@Arg("programId", () => String) programId: string) {
    return await ProgramModel.findOne({ _id: programId });
  }

  @Query(() => PaginatedPrograms)
  async programs(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null
  ): Promise<PaginatedPrograms> {
    const realLimit = Math.min(50, limit);
    const query = ProgramModel.find();

    query.sort({ createdAt: "desc" }).limit(realLimit);
    if (cursor) query.where("createdAt").gt(cursor);

    const programs = await query.exec();
    return {
      programs,
      hasMore: programs.length === realLimit,
    };
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Boolean)
  async vote(
    @Arg("programId", () => String) programId: string,
    @Arg("value", () => Int) value: number,
    @Ctx() { req }: AppContext
  ) {
    const realValue = value !== -1 ? 1 : -1;
    const { userId } = req.session!;
    const program = await ProgramModel.findById(programId);

    if (!program) return false;

    const upVoteEntry = program?.upVotes.find((upVote) =>
      mongoose.Types.ObjectId(upVote.userId as any).equals(userId)
    );

    if (upVoteEntry) {
      if (upVoteEntry.value === realValue) {
        program.upVotes = program.upVotes.filter(
          (upVote) =>
            !mongoose.Types.ObjectId(upVote.userId as any).equals(userId)
        );
      } else {
        upVoteEntry.value = realValue;
      }
    } else {
      program.upVotes = [
        ...program.upVotes,
        {
          userId: mongoose.Types.ObjectId(userId),
          value: realValue,
        } as UpVotes,
      ];
    }

    program.save();

    return true;
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Boolean)
  async deleteProgram(@Arg("programId", () => String) programId: string) {
    await ProgramModel.deleteOne({ _id: programId });
    return true;
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Program)
  async createProgram(
    @Arg("title") title: string,
    @Arg("description") description: string,
    @Arg("language") language: string,
    @Arg("duration") duration: string,
    @Arg("level") level: string,
    @Arg("chapters", () => [Chapter]) chapters: Array<Chapter>,
    @Ctx() ctx: AppContext
  ): Promise<Program> {
    const user = await UserModel.findOne({ _id: ctx.req.session!.userId });

    return (
      await ProgramModel.create({
        title,
        description,
        language,
        duration,
        level,
        chapters,
        authorId: mongoose.Types.ObjectId(user!._id),
      } as any)
    ).save();
  }
}
