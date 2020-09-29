import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import { useMeQuery } from "@tango/controllers";

import { isServer } from "../../utils/isServer";
import styles from "./Layout.module.scss";
import { LayoutProps } from "./Layout.interface";
import { menuItems } from "./menuItems";
import UserProfile from "./UserProfile";
import MenuItem from "./MenuItem";

const Layout: React.FunctionComponent<LayoutProps> = ({
  children,
  title = "CoderJam | Coding quizes",
}) => {
  const router = useRouter();
  const { data, loading } = useMeQuery({
    skip: isServer(),
  });

  return (
    <div className={styles.appContainer}>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header className={styles.navContainer}>
        <nav className={styles.navbar}>
          <div className={styles.logo} />
          {menuItems.map((item) => {
            const shouldRender = !item.authRequired
              ? true
              : data?.me
              ? true
              : false;
            return (
              shouldRender && (
                <MenuItem
                  key={item.label}
                  {...item}
                  active={router.pathname.includes(item.path)}
                />
              )
            );
          })}
        </nav>
      </header>
      <div className={styles.content}>{children}</div>
      <div className={styles.subContent}>
        {!loading && <UserProfile userData={data} />}
      </div>
    </div>
  );
};

export default Layout;
