import Link from "next/link";

import Layout from "../components/Layout";
import { withApollo } from "../utils/withApollo";

const IndexPage = () => (
  <Layout title="CoderJam">
    <h1>Hello Next.js 👋</h1>
    <p>
      <Link href="/about">
        <a>About</a>
      </Link>
    </p>
  </Layout>
);

export default withApollo({ ssr: true })(IndexPage);
