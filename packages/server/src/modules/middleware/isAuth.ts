import { MiddlewareFn } from "type-graphql";
import { AppContext } from "../../types/AppContext";

export const isAuth: MiddlewareFn<AppContext> = async ({ context }, next) => {
  if (!context.req.session!.userId) {
    throw new Error("not authenticated");
  }

  return next();
};
