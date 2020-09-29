import Layout from "../components/Layout";
import { withApollo } from "../utils/withApollo";

const Categories = () => (
  <Layout title="Categories">
    <h1>Categories 👋</h1>
  </Layout>
);

export default withApollo({ ssr: true })(Categories);
