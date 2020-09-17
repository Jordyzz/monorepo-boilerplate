import React from "react";
import { Formik, Field } from "formik";

import Layout from "../components/Layout";
import { InputField } from "../components/fields/InputField";
import { useRouter } from "next/router";
import { useForgotPasswordMutation } from "@tango/controllers";

export default () => {
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
            <Field name="email" placeholder="Email" component={InputField} />
            <button type="submit">forgot password</button>
          </form>
        )}
      </Formik>
    </Layout>
  );
};
