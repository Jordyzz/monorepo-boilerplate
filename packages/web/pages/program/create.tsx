import React from "react";
import { withApollo } from "../../utils/withApollo";
import { useFormik } from "formik";

import Layout from "../../components/Layout";

const CreateProgram = () => {
  const formik = useFormik({});

  return (
    <Layout title="Create Program">
      <h1>Create Program 👋</h1>
    </Layout>
  );
};

export default withApollo({ ssr: true })(CreateProgram);
