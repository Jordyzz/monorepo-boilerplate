import React, { useState, useEffect } from "react";

//@ts-ignore
import styles from "../styles.scss";
import { themeService } from "../core/ThemeService";

function MyApp({ Component, pageProps }: any) {
  const [showApp, setShowApp] = useState(false);

  useEffect(() => {
    Promise.all([themeService.init()]).then(() => setShowApp(true));
  }, []);

  return showApp && <Component {...pageProps} style={styles} />;
}

export default MyApp;
