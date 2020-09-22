import React from "react";
import { View, Linking, Text, StyleSheet } from "react-native";
import { useFormik } from "formik";
import * as Yup from "yup";

import { StackNavigationProps, Routes } from "../../utils/Navigation";
import Container from "../../components/Container";
import Footer from "../../components/Footer";
import Button from "../../components/Button";
import TextInput from "../../components/Forms/TextInput";
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

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
});

const ForgotPassword = ({
  navigation,
}: StackNavigationProps<Routes, "ForgotPassword">) => {
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: { email: "" },
    onSubmit: (values) => console.log(values),
    validationSchema: ForgotPasswordSchema,
  });

  return (
    <Container
      footer={
        <Footer
          title="Doesn't work? "
          action="Try this"
          onPress={() => Linking.openURL("help@codechamp@.com")}
        />
      }
    >
      <View style={styles.container}>
        <Text style={styles.title}>Forgot Password?</Text>
        <Text style={styles.subtitle}>
          Enter the email address associated with your account
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
            returnKeyLabel="go"
            returnKeyType="go"
            onSubmitEditing={() => handleSubmit()}
          />
        </View>

        <View style={styles.btnBox}>
          <Button
            variant="primary"
            onPress={() => handleSubmit()}
            label="Reset Password"
          />
        </View>
      </View>
    </Container>
  );
};

export default ForgotPassword;
