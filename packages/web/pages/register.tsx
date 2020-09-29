import React from "react";
import { Formik, Field } from "formik";

import Layout from "../components/Layout";
import { InputField } from "../components/fields/InputField";
import { useRegisterMutation } from "@tango/controllers";
import { useRouter } from "next/router";
import { withApollo } from "../utils/withApollo";

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
            <Field
              name="firstName"
              placeholder="First name"
              component={InputField}
            />
            <Field
              name="lastName"
              placeholder="Last name"
              component={InputField}
            />
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

export default withApollo({ ssr: false })(Register);
