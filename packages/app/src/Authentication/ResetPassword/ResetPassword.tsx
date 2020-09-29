import React, { useRef } from "react";
import {
  View,
  StyleSheet,
  TextInput as RNTextInput,
  Linking,
  Text,
} from "react-native";
import * as Yup from "yup";

import { themeService } from "../../core/ThemeService";
import Container from "../../components/Container";
import Button from "../../components/Button";
import TextInput from "../../components/Forms/TextInput";
import { useChangePasswordMutation } from "@tango/controllers";
import { AuthNavigationProps } from "../../utils/Navigation";
import { useFormik } from "formik";
import Footer from "../../components/Footer";

const styles = StyleSheet.create({
  container: {
    padding: 34,
    flex: 1,
    justifyContent: "center",
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

const ResetSchema = Yup.object().shape({
  password: Yup.string()
    .min(5, "Too Short!")
    .max(15, "Too Long!")
    .required("Required"),
  confirmPassword: Yup.string()
    .equals([Yup.ref("password")], "Passwords don't match")

    .required("Required"),
  token: Yup.string().required(),
});

const ResetPassword = ({
  navigation,
}: AuthNavigationProps<"ResetPassword">) => {
  const [changePassword] = useChangePasswordMutation();
  const passwordRef = useRef<RNTextInput>(null);
  const confirmRef = useRef<RNTextInput>(null);

  const { handleChange, handleBlur, handleSubmit, errors, touched } = useFormik(
    {
      initialValues: {
        token: "",
        password: "",
        confirmPassword: "",
      },
      onSubmit: async ({ ["confirmPassword"]: _, ...data }) => {
        await changePassword({
          variables: {
            data,
          },
        });

        navigation.navigate("PasswordChanged");
      },
      validationSchema: ResetSchema,
    }
  );

  return (
    <Container
      pattern={0}
      footer={
        <Footer
          title="Doesn't work? "
          action="Try this"
          onPress={() => Linking.openURL("mailto:help@codechamp.com")}
        />
      }
    >
      <View style={styles.container}>
        <Text style={styles.title}>Password Reset</Text>
        <Text style={styles.subtitle}>
          An email has been sent to you with a key, paste it here along with
          your new Password
        </Text>
        <View style={{ marginBottom: 15 }}>
          <TextInput
            icon="key"
            placeholder="Enter your secret key"
            onChangeText={handleChange("token")}
            onBlur={handleBlur("token")}
            error={errors.token}
            touched={touched.token}
            autoCompleteType="off"
            autoCapitalize="none"
            returnKeyLabel="next"
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current?.focus()}
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
            label="Reset Password"
          />
        </View>
      </View>
    </Container>
  );
};

export default ResetPassword;
