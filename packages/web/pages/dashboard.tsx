import Layout from "../components/Layout";
import { withApollo } from "../utils/withApollo";

const Dashboard = () => (
  <Layout title="Dashboard">
    <h1>Dashboard 👋</h1>
  </Layout>
);

export default withApollo({ ssr: true })(Dashboard);
