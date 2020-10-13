import { QuestionInput } from "@tango/controllers";

export interface QuestionProps extends QuestionInput {
  selectedAnswer: keyof typeof QuestionOptionsInput | null;
  setSelectedAnswer: (value) => void;
}
