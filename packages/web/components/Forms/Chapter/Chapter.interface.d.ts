export interface ChapterProps extends ChapterType {
  fieldName: string;
  index: number;
}

export interface ChapterType {
  title: string;
  description: string;
  questions: !Array<!QuestionType>;
}

export interface QuestionType {
  question: string;
  codeSample: string;
  options: QuestionOptions;
  correctAnswer: "a" | "b" | "c" | "d" | "";
}

type QuestionOptions = { a: string; b: string; c: string; d: string };
