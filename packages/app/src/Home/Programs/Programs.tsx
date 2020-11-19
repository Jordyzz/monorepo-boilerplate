import React from "react";
import { View } from "react-native";
import Header from "../../components/Header";
import { themeService } from "../../core/ThemeService";
import { HomeNavigationProps } from "../../utils/Navigation";
import { useProgramsQuery } from "@tango/controllers";
import ProgramThumbnail from "./ProgramThumbnail";
import { FlatList } from "react-native-gesture-handler";
import Footer from "./Footer";
import TopCurve from "./Footer/TopCurve";

const FOOTER_HEIGHT = 85;

const Programs = ({ navigation }: HomeNavigationProps<"Programs">) => {
  const { data, loading } = useProgramsQuery({
    variables: {
      limit: 5,
      cursor: null,
    },
  });

  return (
    <View style={{ flex: 1, backgroundColor: themeService.theme.colors.white }}>
      <Header
        title="PROGRAMS"
        left={{ icon: "menu", onPress: () => navigation.openDrawer() }}
      />
      <FlatList
        style={{ marginHorizontal: 30 }}
        data={data?.programs.programs}
        showsVerticalScrollIndicator={false}
        renderItem={({
          item: { id, title, description, upVotes, updatedAt, language },
        }) => (
          <ProgramThumbnail
            {...{ id, title, description, updatedAt, upVotes, language }}
          />
        )}
      />
      <TopCurve footerHeight={FOOTER_HEIGHT} />
      <Footer onPress={() => {}} label="details" height={FOOTER_HEIGHT} />
    </View>
  );
};

export default Programs;
