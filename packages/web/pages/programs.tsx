import Layout from "../components/Layout";
import { withApollo } from "../utils/withApollo";
import { useProgramsQuery } from "@tango/controllers";

const Programs = () => {
  const { data, loading } = useProgramsQuery({
    variables: {
      limit: 5,
      cursor: null,
    },
  });

  return (
    <Layout title="Programs" isLoading={loading}>
      <h1>Programs 👋</h1>
    </Layout>
  );
};

export default withApollo({ ssr: true })(Programs);
