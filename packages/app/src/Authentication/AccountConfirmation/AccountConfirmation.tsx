import React from "react";
import { View, StyleSheet, Text, Linking } from "react-native";
import * as Yup from "yup";
import { useFormik } from "formik";

import { useConfirmUserMutation } from "@tango/controllers";

import { themeService } from "../../core/ThemeService";
import Button from "../../components/Button";
import Container from "../../components/Container";
import TextInput from "../../components/Forms/TextInput";
import Footer from "../../components/Footer";
import { AuthNavigationProps } from "../../utils/Navigation";

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

const AccountConfirmation = ({
  navigation,
}: AuthNavigationProps<"AccountConfirmation">) => {
  const [confirmUser] = useConfirmUserMutation();
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    setErrors,
  } = useFormik({
    initialValues: { token: "" },
    onSubmit: async (variables) => {
      try {
        const confirmed = await confirmUser({
          variables,
        });

        confirmed
          ? navigation.navigate("Login")
          : setErrors({ token: "Invalid Token" });
      } catch (err) {
        setErrors(err);
      }
    },
  });

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
        <Text style={styles.title}>Confirmation</Text>
        <Text style={styles.subtitle}>
          An email has been sent to your with a key, paste it here to complete
          the registration
        </Text>
        <View style={{ marginBottom: 15 }}>
          <TextInput
            icon="key"
            placeholder="Enter the secret key"
            onChangeText={handleChange("token")}
            onBlur={handleBlur("token")}
            error={errors.token}
            touched={touched.token}
            autoCompleteType="off"
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
            label="Confirm my Account"
          />
        </View>
      </View>
    </Container>
  );
};

export default AccountConfirmation;
