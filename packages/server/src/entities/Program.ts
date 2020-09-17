import {
  prop as Property,
  getModelForClass,
  mongoose,
  post,
} from "@typegoose/typegoose";
import { ObjectType, Field, ID, InputType } from "type-graphql";

import { Ref } from "../types/Ref";
import { User } from "./User";

@ObjectType("ProgramType")
@InputType("ProgramInput")
export class ProgramDetails {
  @Field()
  @Property()
  type: string;

  @Field()
  @Property()
  description: string;
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

  @Field(() => ProgramDetails)
  @Property({ ref: ProgramDetails, required: false })
  programDetails: Ref<ProgramDetails | null>;
  _doc: any;
}

export const ProgramModel = getModelForClass(Program);
