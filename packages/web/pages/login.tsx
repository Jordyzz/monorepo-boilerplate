import React from "react";
import { Formik } from "formik";
import { useRouter } from "next/router";

import { useLoginMutation, MeDocument, MeQuery } from "@tango/controllers";

import { withApollo } from "../utils/withApollo";
import Layout from "../components/Layout";
import InputField from "../components/Forms/InputField";
import Button from "../components/Button";

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
            <InputField name="email" placeholder="Email" label="Email" />
            <InputField
              name="password"
              placeholder="Password"
              label="Password"
              type="password"
            />
            <Button type="submit">Login</Button>
          </form>
        )}
      </Formik>
    </Layout>
  );
};

export default withApollo({ ssr: false })(Login);
