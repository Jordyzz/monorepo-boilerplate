export interface ProgramThumbnailProps {
  id: string;
  index: number;
  title: string;
  description: string;
  upVotes: any;
  updatedAt: string;
  language: string;
  onClick: (program) => void;
  isSelected: boolean;
}
