import React from "react";
import { Formik } from "formik";

import Layout from "../components/Layout";
import InputField from "../components/Forms/InputField";
import { useRegisterMutation } from "@tango/controllers";
import { useRouter } from "next/router";
import { withApollo } from "../utils/withApollo";
import Button from "../components/Button";

const Register = () => {
  const router = useRouter();
  const [register] = useRegisterMutation();
  console.log(register);

  return (
    <Layout title="Register">
      <Formik
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={async (values, { setErrors }) => {
          try {
            await register({
              variables: {
                data: values,
              },
            });

            router.push("/check-email");
          } catch (err) {
            const errors = {};
            // err.graphQLErrors[0].extensions.exception.validationErrors.forEach(
            //   (validationErr: { constraints: Array<any>, property: string}) => {
            //     Object.values(validationErr.constraints).forEach((message) => {
            //       // errors[validationErr.property] = message;
            //     });
            //   }
            // );
            setErrors(errors);
          }
        }}
        initialValues={{
          email: "",
          firstName: "",
          lastName: "",
          password: "",
        }}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <InputField
              name="firstName"
              placeholder="First name"
              label="First name"
            />
            <InputField
              name="lastName"
              placeholder="Last name"
              label="Last name"
            />
            <InputField
              name="email"
              placeholder="Email"
              label="Email"
              type="email"
            />
            <InputField
              name="password"
              placeholder="Password"
              label="Password"
              type="password"
            />
            <Button type="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </form>
        )}
      </Formik>
    </Layout>
  );
};

export default withApollo({ ssr: false })(Register);
