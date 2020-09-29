import Layout from "../components/Layout";
import { withApollo } from "../utils/withApollo";

const Programs = () => (
  <Layout title="Programs">
    <h1>Programs 👋</h1>
  </Layout>
);

export default withApollo({ ssr: true })(Programs);
