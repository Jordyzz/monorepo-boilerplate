import { MiddlewareFn } from "type-graphql";
import { AppContext } from "../../types/AppContext";

export const logger: MiddlewareFn<AppContext> = async ({ args }, next) => {
  console.log("args: ", args);

  return next();
};
