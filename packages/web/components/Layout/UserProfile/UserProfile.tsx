import React from "react";
import Link from "next/link";
import classNames from "classnames";
import { useApolloClient } from "@apollo/client";
import { useRouter } from "next/router";

import { useLogoutMutation } from "@tango/controllers";

import { UserProfileProps } from "./UserProfile.interface";
import styles from "./UserProfile.module.scss";

const UserProfile = ({ userData }: UserProfileProps) => {
  const router = useRouter();
  const [logout] = useLogoutMutation();
  const apolloClient = useApolloClient();

  const onLogout = async () => {
    await logout();
    await apolloClient.resetStore();
    router.reload();
  };

  return (
    <div className={styles.container}>
      {!userData || !userData.me ? (
        <Link href="/login">
          <a>Login</a>
        </Link>
      ) : (
        <>
          <div className={styles.userDetails}>
            <div className={classNames(styles.profilePicture)} />
            <div className={styles.userName}>{userData.me.name}</div>
          </div>
          <a onClick={onLogout} style={{ cursor: "pointer" }}>
            Logout
          </a>
        </>
      )}
    </div>
  );
};

export default UserProfile;
