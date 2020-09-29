import React from "react";
import { Formik, Field } from "formik";

import Layout from "../components/Layout";
import InputField from "../components/Forms/InputField";
import { useRouter } from "next/router";
import { useForgotPasswordMutation } from "@tango/controllers";
import { withApollo } from "../utils/withApollo";
import Button from "../components/Button";

const ForgotPassword = () => {
  const router = useRouter();
  const [forgotPassword] = useForgotPasswordMutation();

  return (
    <Layout title="Forgot password">
      <Formik
        onSubmit={async (values) => {
          const res = await forgotPassword({
            variables: values,
          });

          console.log(res);
          router.push("/check-email");
        }}
        initialValues={{
          email: "",
        }}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <InputField name="email" placeholder="Email" label="Email" />
            <Button type="submit">Reset Password</Button>
          </form>
        )}
      </Formik>
    </Layout>
  );
};

export default withApollo({ ssr: false })(ForgotPassword);
