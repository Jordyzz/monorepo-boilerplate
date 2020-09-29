import React from "react";
import { withApollo } from "../../utils/withApollo";
import { useFormik } from "formik";

import Layout from "../../components/Layout";

const CreateProgram = () => {
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      language: "",
      duration: "",
      level: "",
      chapters: [],
    },
    onSubmit: (values) => console.log(values),
  });

  return (
    <Layout title="Create Program">
      <h1>Create Program 👋</h1>
    </Layout>
  );
};

export default withApollo({ ssr: true })(CreateProgram);
