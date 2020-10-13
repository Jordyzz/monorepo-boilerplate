import { useCallback, useState } from "react";
import { useRouter } from "next/router";

import { useProgramsQuery, Program } from "@tango/controllers";

import { withApollo } from "../utils/withApollo";
import styles from "./dashboard.module.scss";
import Layout from "../components/Layout";
import Button from "../components/Button";
import Icon from "../components/Icon";
import ProgramThumbnail from "../components/Programs/ProgramThumbnail";
import ProgramDetails from "../components/Programs/ProgramDetails";

const Dashboard = () => {
  const [selectedProgram, setSelectedProgram] = useState<Program | undefined>(
    undefined
  );
  const router = useRouter();
  const { data, loading } = useProgramsQuery({
    variables: {
      limit: 5,
      cursor: null,
    },
  });

  const onSelectProgram = useCallback(
    (programId) => {
      setSelectedProgram(
        data?.programs.programs.find((p) => p.id === programId)
      );
    },
    [data]
  );

  return (
    <Layout
      title="Dashboard"
      isLoading={loading}
      subContent={selectedProgram && <ProgramDetails {...selectedProgram} />}
    >
      <div className={styles.container}>
        <div className={styles.header}>Browse Hundreds Premium Programs.</div>
        <div className={styles.subHeader}>
          Different coding languages and level based programs awaits to be
          completed, start now!
        </div>
        <Button
          className={styles.browseButton}
          onClick={() => router.push("/programs")}
        >
          <div className={styles.btntext}>Browse Now</div>
          <Icon type="rightArrow" />
        </Button>
        <div className={styles.programHeader}>Continue solving...</div>
        <div className={styles.programContainer}>
          {data &&
            data.programs.programs.map(
              (
                { id, title, description, upVotes, updatedAt, language },
                index
              ) => (
                <ProgramThumbnail
                  key={id}
                  {...{ id, title, description, updatedAt, upVotes, language }}
                  {...{ index }}
                  onClick={onSelectProgram}
                  isSelected={selectedProgram?.id === id}
                />
              )
            )}
        </div>
      </div>
    </Layout>
  );
};

export default withApollo({ ssr: true })(Dashboard);
