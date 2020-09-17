import React from "react";
import { View, StyleSheet } from "react-native";
// import Svg, { Path } from "react-native-svg";
import { themeService } from "../../core/ThemeService";

// const Google = () => (
//   <Svg width={20} height={20} viewBox="0 0 512 512">
//     <Path
//       d="M113.47 309.408L95.648 375.94l-65.139 1.378C11.042 341.211 0 299.9 0 256c0-42.451 10.324-82.483 28.624-117.732h.014L86.63 148.9l25.404 57.644c-5.317 15.501-8.215 32.141-8.215 49.456.002 18.792 3.406 36.797 9.651 53.408z"
//       fill="#fbbb00"
//     />
//     <Path
//       d="M507.527 208.176C510.467 223.662 512 239.655 512 256c0 18.328-1.927 36.206-5.598 53.451-12.462 58.683-45.025 109.925-90.134 146.187l-.014-.014-73.044-3.727-10.338-64.535c29.932-17.554 53.324-45.025 65.646-77.911h-136.89V208.176h245.899z"
//       fill="#518ef8"
//     />
//     <Path
//       d="M416.253 455.624l.014.014C372.396 490.901 316.666 512 256 512c-97.491 0-182.252-54.491-225.491-134.681l82.961-67.91c21.619 57.698 77.278 98.771 142.53 98.771 28.047 0 54.323-7.582 76.87-20.818l83.383 68.262z"
//       fill="#28b446"
//     />
//     <Path
//       d="M419.404 58.936l-82.933 67.896C313.136 112.246 285.552 103.82 256 103.82c-66.729 0-123.429 42.957-143.965 102.724l-83.397-68.276h-.014C71.23 56.123 157.06 0 256 0c62.115 0 119.068 22.126 163.404 58.936z"
//       fill="#f14336"
//     />
//   </Svg>
// );

// const Apple = () => (
//   <Svg width={20} height={20} viewBox="0 0 511.997 511.997">
//     <Path d="M476.729 360.211c-.081-.539-.198-1.033-.198-1.536v-8.812l-4.761-2.542c-39.622-21.127-58.88-51.586-58.88-93.103 0-34.897 15.324-64.817 43.152-84.318l10.941-5.407-7.168-8.74c-18.576-22.645-48.784-52.745-96.472-52.745-8.884 0-17.103 2.138-25.178 5.219 19.402-21.136 29.912-47.903 29.912-78.632 0-4.779-.566-10.303-1.222-16.689l-.216-2.084a10.357 10.357 0 00-.225-1.284l-.692-2.749A8.987 8.987 0 00354.664.313c-47.499 12.827-98.25 50.374-98.25 117.248 0 3.575.35 7.725.871 12.081-7.869-2.048-14.749-5.928-22.321-10.267-12.297-7.024-26.229-15.001-46.466-15.001-90.606 0-153.744 82.234-153.744 156.043 0 40.583 12.755 110.888 48.667 175.454 27.361 49.808 59.832 76.126 93.903 76.126 12.513 0 25.151-4.788 38.526-9.854 14.848-5.632 30.199-11.444 46.799-11.444 13.537 0 27.37 4.824 40.744 9.485 13.761 4.806 27.998 9.773 42.469 9.773 71.249 0 131.377-88.666 131.377-144.348.002-2.029-.25-3.781-.51-5.398z" />
//   </Svg>
// );

// const Facebook = () => (
//   <Svg height={20} viewBox="0 0 24 24" width={20}>
//     <Path
//       d="M15.997 3.985h2.191V.169C17.81.117 16.51 0 14.996 0 8.064 0 9.95 7.85 9.674 9H6.187v4.266h3.486V24h4.274V13.267h3.345l.531-4.266h-3.877c.188-2.824-.761-5.016 2.051-5.016z"
//       fill="#3b5999"
//     />
//   </Svg>
// );

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "red",
    justifyContent: "center",
  },
  iconBox: {
    backgroundColor: themeService.theme.colors.white,
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
  },
});

const SocialLogin = () => {
  return (
    <View style={styles.container}>
      <View style={styles.iconBox}>{/* <Facebook /> */}</View>
      <View style={styles.iconBox}>{/* <Google /> */}</View>
      <View style={styles.iconBox}>{/* <Apple /> */}</View>
    </View>
  );
};

export default SocialLogin;
