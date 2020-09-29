import React from "react";
import { Formik, Field } from "formik";

import { useLoginMutation, MeDocument, MeQuery } from "@tango/controllers";

import { withApollo } from "../utils/withApollo";
import Layout from "../components/Layout";
import { InputField } from "../components/fields/InputField";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  const [login] = useLoginMutation();
  return (
    <Layout title="Login page">
      <Formik
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={async (values, { setErrors }) => {
          const res = await login({
            variables: values,
            update: (cache, { data }) => {
              if (!data || !data.login) {
                return;
              }

              cache.writeQuery<MeQuery>({
                query: MeDocument,
                data: {
                  __typename: "Query",
                  me: data.login,
                },
              });
            },
          });

          if (res && res.data && !res.data.login) {
            setErrors({
              email: "invalid login",
            });
            return;
          }

          router.push("/");
        }}
        initialValues={{
          email: "",
          password: "",
        }}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field name="email" placeholder="Email" component={InputField} />
            <Field
              name="password"
              placeholder="Password"
              type="password"
              component={InputField}
            />
            <button type="submit">Submit</button>
          </form>
        )}
      </Formik>
    </Layout>
  );
};

export default withApollo({ ssr: false })(Login);
