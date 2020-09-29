import React from "react";
import { withApollo } from "../../utils/withApollo";
import { Formik } from "formik";

import Layout from "../../components/Layout";
import styles from "./create.module.scss";
import InputField from "../../components/Forms/InputField";
import Button from "../../components/Button";
import TextAreaField from "../../components/Forms/TextAreaField";
import RadioGroupInput from "../../components/Forms/RadioGroupInput/RadioGroupInput";
import { Item } from "../../components/Forms/RadioGroupInput/RadioGroupInput.interface";
import { SelectOption } from "../../components/Forms/Select/Select.interface";
import Select from "../../components/Forms/Select";
import Chapter from "../../components/Forms/Chapter";
import { ChapterType } from "../../components/Forms/Chapter/Chapter.interface";

const radioItems: Array<Item> = [
  { icon: undefined, label: "Javascript", value: "JS" },
  { icon: undefined, label: "Python", value: "PY" },
  { icon: undefined, label: "React", value: "REACT" },
];

const durations: Array<SelectOption> = [
  { value: 10, label: "10 Minutes" },
  { value: 20, label: "20 Minutes" },
  { value: 30, label: "30 Minutes" },
  { value: 45, label: "45 Minutes" },
  { value: 60, label: "1 Hour" },
  { value: 120, label: "2 Hours" },
  { value: 180, label: "3 Hours" },
];

const levels: Array<SelectOption> = [
  { value: 1, label: "Junior Developer" },
  { value: 2, label: "Mid Developer" },
  { value: 3, label: "Senior Developer" },
  { value: 4, label: "Team Lead" },
];

const initialChapterState: ChapterType = {
  title: "",
  description: "",
  questions: [],
  totalQuestions: 0,
};

const CreateProgram = () => {
  return (
    <Layout title="Create Program">
      <h1 className={styles.title}>Create Program</h1>
      <Formik
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={async (values, { setErrors }) => {
          console.log(values);
        }}
        initialValues={{
          title: "",
          description: "",
          language: "",
          duration: "",
          level: "",
          chapters: [] as ChapterType[],
        }}
      >
        {({ handleSubmit, values, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <InputField name="title" placeholder="Title" label="Title" />
            <TextAreaField
              name="description"
              placeholder="Description"
              label="Description"
              className={styles.description}
            />
            <RadioGroupInput
              name="language"
              label="Programming Language"
              items={radioItems}
            />
            <div className={styles.selectContainer}>
              <Select
                className={styles.select}
                options={durations}
                name="duration"
                label="Duration"
                placeholder="Duration"
              />
              <Select
                className={styles.select}
                options={levels}
                name="level"
                label="Level"
                placeholder="Level"
              />
            </div>
            <div className={styles.chapterList}>
              <div className={styles.chaptersHeader}>Chapters</div>
              {values.chapters.map((chapter: ChapterType, i) => (
                <Chapter
                  key={chapter.title + i}
                  {...chapter}
                  fieldName="chapters"
                  index={i}
                />
              ))}
              <div className={styles.emptyChapter}>
                <Button
                  className={styles.addChapter}
                  onClick={() =>
                    setFieldValue("chapters", [
                      ...values.chapters,
                      { ...initialChapterState },
                    ])
                  }
                >
                  Add Chapter
                </Button>
              </div>
            </div>
            <Button
              type="submit"
              onClick={handleSubmit}
              className={styles.submitBtn}
            >
              Submit
            </Button>
          </form>
        )}
      </Formik>
    </Layout>
  );
};

export default withApollo({ ssr: true })(CreateProgram);
