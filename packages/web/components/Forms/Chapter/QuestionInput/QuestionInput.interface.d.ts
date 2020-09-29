import { QuestionType } from "../Chapter.interface";

export interface QuestionInputProps extends QuestionType {
  index: number;
  setQuestions: (val) => void;
}
