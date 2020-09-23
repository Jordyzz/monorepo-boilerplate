import React, { useRef } from "react";
import { View, StyleSheet, Text, TextInput as RNTextInput } from "react-native";
import * as Yup from "yup";

import { AuthNavigationProps } from "../../utils/Navigation";
import { useFormik } from "formik";
import Container from "../../components/Container";
import Footer from "../../components/Footer";
import TextInput from "../../components/Forms/TextInput";
import Button from "../../components/Button";
import { themeService } from "../../core/ThemeService";

const styles = StyleSheet.create({
  container: {
    padding: 34,
  },
  title: {
    ...themeService.theme.textVariants.title1,
    marginBottom: themeService.theme.spacing.l,
    textAlign: "center",
  },
  subtitle: {
    ...themeService.theme.textVariants.body,
    textAlign: "center",
    marginBottom: 24,
  },
  btnBox: {
    alignItems: "center",
    marginTop: 25,
  },
});

const SignUpSchema = Yup.object().shape({
  password: Yup.string()
    .min(5, "Too Short!")
    .max(15, "Too Long!")
    .required("Required"),
  confirmPassword: Yup.string()
    .equals([Yup.ref("password")], "Passwords don't match")

    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  firstName: Yup.string().min(2).max(15).required(),
  lastName: Yup.string().min(2).max(15).required(),
});

const SignUp = ({ navigation }: AuthNavigationProps<"SignUp">) => {
  const firstRef = useRef<RNTextInput>(null);
  const lastRef = useRef<RNTextInput>(null);
  const passwordRef = useRef<RNTextInput>(null);
  const confirmRef = useRef<RNTextInput>(null);

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: (values) => console.log(values),
    validationSchema: SignUpSchema,
  });

  return (
    <Container
      pattern={0}
      footer={
        <Footer
          title="Already have an account? "
          action="Login here"
          onPress={() => navigation.navigate("Login")}
        />
      }
    >
      <View style={styles.container}>
        <Text style={styles.title}>Create an account</Text>
        <View style={{ marginBottom: 15 }}>
          <TextInput
            icon="mail"
            placeholder="Enter your Email"
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            error={errors.email}
            touched={touched.email}
            autoCompleteType="email"
            autoCapitalize="none"
            returnKeyLabel="next"
            returnKeyType="next"
            onSubmitEditing={() => firstRef.current?.focus()}
          />
        </View>
        <View style={{ marginBottom: 15 }}>
          <TextInput
            icon="user"
            placeholder="Enter your First name"
            onChangeText={handleChange("firstName")}
            onBlur={handleBlur("firstName")}
            error={errors.firstName}
            touched={touched.firstName}
            autoCompleteType="name"
            autoCapitalize="none"
            returnKeyLabel="next"
            returnKeyType="next"
            onSubmitEditing={() => lastRef.current?.focus()}
            ref={firstRef}
          />
        </View>
        <View style={{ marginBottom: 15 }}>
          <TextInput
            icon="user"
            placeholder="Enter your Last name"
            onChangeText={handleChange("lastName")}
            onBlur={handleBlur("lastName")}
            error={errors.lastName}
            touched={touched.lastName}
            autoCompleteType="name"
            autoCapitalize="none"
            returnKeyLabel="next"
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current?.focus()}
            ref={lastRef}
          />
        </View>
        <View style={{ marginBottom: 15 }}>
          <TextInput
            ref={passwordRef}
            icon="lock"
            placeholder="Enter your Password"
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            error={errors.password}
            touched={touched.password}
            autoCompleteType="password"
            autoCapitalize="none"
            returnKeyLabel="next"
            returnKeyType="next"
            secureTextEntry
            onSubmitEditing={() => confirmRef.current?.focus()}
          />
        </View>
        <TextInput
          ref={confirmRef}
          icon="lock"
          placeholder="Confirm your Password"
          onChangeText={handleChange("confirmPassword")}
          onBlur={handleBlur("confirmPassword")}
          error={errors.confirmPassword}
          touched={touched.confirmPassword}
          autoCompleteType="password"
          autoCapitalize="none"
          returnKeyLabel="go"
          returnKeyType="go"
          secureTextEntry
          onSubmitEditing={() => handleSubmit()}
        />

        <View style={styles.btnBox}>
          <Button
            variant="primary"
            onPress={() => handleSubmit()}
            label="Create your account"
          />
        </View>
      </View>
    </Container>
  );
};

export default SignUp;
