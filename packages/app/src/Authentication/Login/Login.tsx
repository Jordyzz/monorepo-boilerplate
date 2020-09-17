import React from "react";
import { View } from "react-native";

import Container from "../../components/Container";
import SocialLogin from "../../components/SocialLogin";

const Login = () => {
  return (
    <Container footer={<SocialLogin />}>
      <View></View>
    </Container>
  );
};

export default Login;
