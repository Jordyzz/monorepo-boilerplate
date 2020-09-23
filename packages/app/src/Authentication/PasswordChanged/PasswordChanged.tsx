import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { AuthNavigationProps } from "../../utils/Navigation";
import Container from "../../components/Container";
import { themeService } from "../../core/ThemeService";
import Button from "../../components/Button";
import RoundedIcon from "../../components/RoundedIcon";
import RoundedIconButton from "../../components/RoundedIconButton";

const styles = StyleSheet.create({
  container: {
    padding: 34,
    alignItems: "center",
  },
  title: {
    ...themeService.theme.textVariants.title1,
    marginBottom: themeService.theme.spacing.l,
    textAlign: "center",
  },
  subtitle: {
    ...themeService.theme.textVariants.body,
    textAlign: "center",
    marginBottom: 16,
  },
  btnBox: {
    alignItems: "center",
    marginTop: 16,
  },
  icon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: themeService.theme.spacing.xl,
  },
});

const PasswordChanged = ({ navigation }: AuthNavigationProps<"SignUp">) => {
  return (
    <Container
      pattern={0}
      footer={
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <RoundedIconButton
            backgroundColor={themeService.theme.colors.white}
            color={themeService.theme.colors.secondary}
            name="x"
            size={60}
            onPress={() => navigation.pop()}
          />
        </View>
      }
    >
      <View style={styles.container}>
        <View style={styles.icon}>
          <RoundedIcon
            name="check"
            size={80}
            backgroundColor={themeService.theme.colors.primaryLight}
            color={themeService.theme.colors.primary}
          />
        </View>
        <Text style={styles.title}>
          Your password has been successfully changed
        </Text>
        <Text style={styles.subtitle}>You can now login to your account</Text>
      </View>
      <View style={styles.btnBox}>
        <Button
          variant="primary"
          onPress={() => navigation.navigate("Login")}
          label="Log into your account"
        />
      </View>
    </Container>
  );
};

export default PasswordChanged;
