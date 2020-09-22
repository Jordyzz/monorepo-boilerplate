import React, { useRef, ReactNode } from "react";
import { View, Text, StyleSheet, TextInput as RNTextInput } from "react-native";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useLoginMutation } from "@tango/controllers"; // TODO: install apollo finish login

import Footer from "../../components/Footer";
import Container from "../../components/Container";
import Button from "../../components/Button";
import { themeService } from "../../core/ThemeService";
import TextInput from "../../components/Forms/TextInput";
import Checkbox from "../../components/Forms/Checkbox";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProps, Routes } from "../../utils/Navigation";

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

const LoginSchema = Yup.object().shape({
  password: Yup.string()
    .min(5, "Too Short!")
    .max(15, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  remember: Yup.boolean().default(true),
});

const Login = ({ navigation }: StackNavigationProps<Routes, "Login">) => {
  const passwordRef = useRef<RNTextInput>(null);
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: { email: "", password: "", remember: true },
    onSubmit: (values) => console.log(values),
    validationSchema: LoginSchema,
  });

  return (
    <Container
      footer={
        <Footer
          title="Don't have an account?"
          action="Sign Up here"
          onPress={() => navigation.navigate("SignUp")}
        />
      }
    >
      <View style={styles.container}>
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>
          Use your credentials below to login to your account
        </Text>
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
            onSubmitEditing={() => passwordRef.current?.focus()}
          />
        </View>
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
          returnKeyLabel="go"
          returnKeyType="go"
          secureTextEntry
          onSubmitEditing={() => handleSubmit()}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Checkbox
            label="Remember me"
            checked={values.remember}
            onChange={() => setFieldValue("remember", !values.remember)}
          />
          <Button
            variant="transparent"
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <Text style={{ color: themeService.theme.colors.primary }}>
              Forgot password
            </Text>
          </Button>
        </View>
        <View style={styles.btnBox}>
          <Button
            variant="primary"
            onPress={() => handleSubmit()}
            label="Log into your account"
          />
        </View>
      </View>
    </Container>
  );
};

export default Login;
