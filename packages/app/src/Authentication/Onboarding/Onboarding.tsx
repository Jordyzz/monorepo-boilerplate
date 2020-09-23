import React, { useRef } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Animated, { multiply, divide } from "react-native-reanimated";
import { interpolateColor, useScrollHandler } from "react-native-redash";

import Slide, { SLIDE_HEIGHT } from "./Slide";
import SubSlide from "./SubSlide";
import PaginationDot from "./PaginationDot";
import { AuthNavigationProps } from "../../utils/Navigation";
import { themeService } from "../../core/ThemeService";

const BORDER_RADIUS = 75;
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeService.theme.colors.white,
  },
  slider: {
    height: SLIDE_HEIGHT,
    borderBottomRightRadius: BORDER_RADIUS,
  },
  footer: {
    flex: 1,
  },
  footerContent: {
    flex: 1,
    backgroundColor: themeService.theme.colors.white,
    borderTopLeftRadius: BORDER_RADIUS,
  },
  pagination: {
    ...StyleSheet.absoluteFillObject,
    height: BORDER_RADIUS,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

const slides = [
  {
    title: "Yoga",
    color: "#bfeaf5",
    subtitle: "Yoga Mornings",
    description: "Yoga excercises for the soul, for every level",
  },
  {
    title: "Calisthenics",
    color: "#beecc4",
    subtitle: "Calisthenics Power",
    description: "Human flag? No problem! wide range of body weight workouts",
  },
  {
    title: "HIIT",
    color: "#ffe4d9",
    subtitle: "Intensive HIIT",
    description:
      "Lose fat in an incredible speed whilst strenghtening your mussles",
  },
  {
    title: "Aerobic",
    color: "#ffdddd",
    subtitle: "Running Body",
    description: "Hard to find motivation for Aerobics? not anymore!",
  },
];

const Onboarding = ({ navigation }: AuthNavigationProps<"Onboarding">) => {
  const scrollRef = useRef<Animated.ScrollView>(null);
  const { scrollHandler, x } = useScrollHandler();
  const backgroundColor = interpolateColor(x, {
    inputRange: slides.map((_, i) => i * width),
    outputRange: slides.map((slide) => slide.color),
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.slider, { backgroundColor }]}>
        <Animated.ScrollView
          ref={scrollRef}
          horizontal
          snapToInterval={width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          bounces={false}
          {...scrollHandler}
        >
          {slides.map(({ title }, i) => (
            <Slide key={i} {...{ title }} right={!!(i % 2)} />
          ))}
        </Animated.ScrollView>
      </Animated.View>
      <View style={styles.footer}>
        <Animated.View
          style={{ ...StyleSheet.absoluteFillObject, backgroundColor }}
        />
        <View style={styles.footerContent}>
          <View style={styles.pagination}>
            {slides.map((_, index) => (
              <PaginationDot
                key={index}
                currentIndex={divide(x, width)}
                {...{ index }}
              />
            ))}
          </View>
          <Animated.View
            style={{
              flex: 1,
              flexDirection: "row",
              width: width * slides.length,
              transform: [{ translateX: multiply(x, -1) }],
            }}
          >
            {slides.map(({ subtitle, description }, i) => {
              const last = i === slides.length - 1;
              return (
                <SubSlide
                  key={i}
                  {...{ subtitle, description, last }}
                  onPress={() => {
                    if (last) navigation.navigate("Welcome");
                    else {
                      scrollRef.current
                        ?.getNode()
                        .scrollTo({ x: width * (i + 1), animated: true });
                    }
                  }}
                />
              );
            })}
          </Animated.View>
        </View>
      </View>
    </View>
  );
};

export default Onboarding;
