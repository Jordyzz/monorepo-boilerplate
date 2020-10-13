import {
  prop as Property,
  getModelForClass,
  mongoose,
  post,
} from "@typegoose/typegoose";
import { ObjectType, Field, ID, InputType } from "type-graphql";

import { Ref } from "../types/Ref";
import { User } from "./User";

@ObjectType("UpVotesType")
@InputType("UpVotesInput")
export class UpVotes {
  @Field(() => String)
  @Property({ ref: "User", required: true })
  userId: Ref<User>;

  @Field()
  @Property()
  value: number;
}

@ObjectType("QuestionOptionsType")
@InputType("QuestionOptionsInput")
export class QuestionOptions {
  @Field()
  @Property()
  a: string;

  @Field()
  @Property()
  b: string;

  @Field()
  @Property()
  c: string;

  @Field()
  @Property()
  d: string;
}

@ObjectType("ChapterType")
@InputType("ChapterInput")
export class Chapter {
  @Field()
  @Property()
  title: string;

  @Field()
  @Property()
  description: string;

  @Field(() => [Question])
  @Property({ type: () => [Question] })
  questions: Question[];
}

@ObjectType("QuestionType")
@InputType("QuestionInput")
export class Question {
  @Field()
  @Property()
  question: string;

  @Field()
  @Property()
  correctAnswer: string;

  @Field()
  @Property()
  codeSample: string;

  @Field(() => QuestionOptions)
  @Property({ type: () => QuestionOptions })
  options: QuestionOptions;
}

@post<Program>("save", function (program) {
  program.updatedAt = new Date();
})
@ObjectType()
export class Program {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  @Property({ ref: "User", required: true })
  authorId: Ref<User>;

  @Field()
  @Property()
  title: string;

  @Field()
  @Property()
  description: string;

  @Field()
  @Property()
  duration: string;

  @Field()
  @Property()
  language: string;

  @Field()
  @Property()
  level: string;

  @Field(() => Date)
  @Property({
    type: mongoose.Schema.Types.Date,
    default: new Date(),
    required: false,
  })
  createdAt: Date;

  @Field(() => Date)
  @Property({
    type: mongoose.Schema.Types.Date,
    default: new Date(),
    required: false,
  })
  updatedAt: Date;

  @Field(() => [Chapter])
  @Property({ type: () => [Chapter] })
  chapters: Chapter[];

  @Field(() => [UpVotes])
  @Property({ type: () => [UpVotes] })
  upVotes: UpVotes[];

  _doc: any;
}

export const ProgramModel = getModelForClass(Program);
