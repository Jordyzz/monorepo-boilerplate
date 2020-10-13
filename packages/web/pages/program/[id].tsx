import { useRouter } from "next/router";
import { withApollo } from "../../utils/withApollo";

import { useProgramQuery, QuestionOptionsInput } from "@tango/controllers";

import styles from "./program.module.scss";
import Layout from "../../components/Layout";
import { useState } from "react";
import Question from "../../components/Question";
import Button from "../../components/Button";

const AboutPage = () => {
  const router = useRouter();
  const { data, loading } = useProgramQuery({
    variables: {
      programId: router.query.id as string,
    },
  });
  const [chapterCount, setChapterCount] = useState(
    parseInt(router.query.chapter as string) | 0
  );
  const [questionCount, setQuestionCount] = useState(0);

  const currentChapter = data?.program.chapters[chapterCount];
  const currentQuestion =
    data?.program.chapters[chapterCount].questions[questionCount];

  const isDone =
    data!.program.chapters.length - 1 === chapterCount &&
    currentChapter!.questions.length - 1 === questionCount;

  const [selectedAnswer, setSelectedAnswer] = useState<
    keyof QuestionOptionsInput | null
  >(null);
  const handleNext = () => {
    if (currentChapter!.questions.length - 1 > questionCount) {
      setQuestionCount((q) => q + 1);
    } else {
      if (data!.program.chapters.length - 1 > chapterCount) {
        setQuestionCount(0);
        setChapterCount((c) => c + 1);
      }
    }

    setSelectedAnswer(null);
  };

  const handleBack = () => {
    if (questionCount > 0) {
      setQuestionCount((q) => q - 1);
    } else {
      if (chapterCount > 0) {
        setQuestionCount(
          data!.program.chapters[chapterCount - 1].questions.length - 1
        );
        setChapterCount((c) => c - 1);
      }
    }

    setSelectedAnswer(null);
  };

  return (
    <Layout title={`Program | ${data?.program.title}`} isLoading={loading}>
      {data && data.program && (
        <div className={styles.container}>
          <div className={styles.header}>{data?.program.title}</div>
          <div className={styles.chapterTitle}>
            {`Chapter ${chapterCount + 1} | ${currentChapter?.title}`}
          </div>
          <Question
            {...currentQuestion!}
            {...{ selectedAnswer, setSelectedAnswer }}
          />
          <div className={styles.btnContainer}>
            <Button
              className={styles.btn}
              onClick={() => handleBack()}
              disabled={questionCount === 0 && chapterCount === 0}
            >
              Back
            </Button>

            <Button
              className={styles.btn}
              onClick={() =>
                !isDone ? handleNext() : router.push("/programs")
              }
              disabled={currentQuestion?.correctAnswer !== selectedAnswer}
            >
              {!isDone ? "Next" : "Finish"}
            </Button>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default withApollo({ ssr: true })(AboutPage);
