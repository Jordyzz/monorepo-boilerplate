import { AppContext } from "../interfaces/AppContext";
import { LogoutDocument } from "@tango/controllers";
import redirect from "../lib/redirect";

const Logout = () => {
  return null;
};

Logout.getInitialProps = async ({ apolloClient, ...ctx }: AppContext) => {
  await apolloClient.mutate({ mutation: LogoutDocument });
  await apolloClient.resetStore();
  redirect(ctx, "/login");

  return {};
};

export default Logout;
