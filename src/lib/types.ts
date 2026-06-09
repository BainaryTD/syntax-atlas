export type Language = {
  id: string;
  name: string;
  slug: string;
  fileExtension: string;
  version: string;
  color: string;
  description: string;
};

export type Topic = {
  id: string;
  slug: string;
  title: string;
  titleTh: string;
  category: string;
  description: string;
  tags: string[];
};

export type SyntaxExample = {
  id: string;
  languageId: string;
  topicId: string;
  code: string;
  explanation: string;
  notes: string[];
  version: string;
};
