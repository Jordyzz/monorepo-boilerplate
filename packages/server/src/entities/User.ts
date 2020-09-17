import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { ObjectType, Field, ID, Root } from "type-graphql";
import { Program } from "./Program";
import { Ref } from "../types/Ref";

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  @Property()
  firstName: string;

  @Field()
  @Property()
  lastName: string;

  @Field()
  name(@Root() parent: User): string {
    return `${parent._doc.firstName} ${parent._doc.lastName}`;
  }

  @Field()
  @Property({ unique: true })
  email: string;

  @Property()
  password: string;

  @Property({ default: false })
  confirmed: Boolean;

  @Property({ ref: "Program" })
  programs: Ref<Program>[];
  _doc: any;
}

export const UserModel = getModelForClass(User);
