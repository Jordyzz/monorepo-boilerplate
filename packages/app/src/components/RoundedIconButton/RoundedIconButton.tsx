import React from "react";
import { RectButton } from "react-native-gesture-handler";

import { RoundedIconButtonProps } from "./RoundedIconButton.interface";
import RoundedIcon from "../RoundedIcon/RoundedIcon";

const RoundedIconButton = ({ onPress, ...props }: RoundedIconButtonProps) => {
  return (
    <RectButton {...{ onPress }}>
      <RoundedIcon {...props} />
    </RectButton>
  );
};

export default RoundedIconButton;
