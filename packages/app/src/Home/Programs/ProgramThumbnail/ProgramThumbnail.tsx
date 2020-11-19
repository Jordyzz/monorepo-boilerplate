import React from "react";
import { View, Text } from "react-native";
import { themeService } from "../../../core/ThemeService";
import { ProgramThumbnailProps } from "./ProgramThumbnail.interface";

const ProgramThumbnail = ({
  id,
  title,
  description,
  updatedAt,
  upVotes,
  language,
}: ProgramThumbnailProps) => {
  return (
    <View
      style={{
        marginVertical: themeService.theme.spacing.m,
        padding: themeService.theme.spacing.m,
        backgroundColor: themeService.theme.colors.primaryLight,
        borderRadius: 15,
      }}
    >
      <Text style={{ ...themeService.theme.textVariants.title2 }}>{title}</Text>
      <Text style={{ ...themeService.theme.textVariants.body }}>
        {description}
      </Text>
      <Text>{language}</Text>
      <Text>{new Date(updatedAt).toDateString()}</Text>
    </View>
  );
};

export default ProgramThumbnail;
