import { createWithApollo } from "./createWithApollo";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import { NextPageContext } from "next";
import { isServer } from "./isServer";

const createClient = (ctx: NextPageContext) =>
  new ApolloClient({
    uri: "http://localhost:4000/graphql",
    credentials: "include",
    headers: {
      cookie: isServer() ? ctx.req?.headers.cookie : undefined,
    },
    cache: new InMemoryCache(),
  });

export const withApollo = createWithApollo(createClient);
