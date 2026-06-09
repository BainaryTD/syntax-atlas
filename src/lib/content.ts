import languagesData from "@/content/languages.json";
import topicsData from "@/content/topics.json";
import pythonExamples from "@/content/examples/python.json";
import javascriptExamples from "@/content/examples/javascript.json";
import typescriptExamples from "@/content/examples/typescript.json";
import goExamples from "@/content/examples/go.json";
import rustExamples from "@/content/examples/rust.json";
import javaExamples from "@/content/examples/java.json";
import type { Language, SyntaxExample, Topic } from "./types";

export const languages = languagesData as Language[];
export const topics = topicsData as Topic[];
export const examples = [
  ...pythonExamples,
  ...javascriptExamples,
  ...typescriptExamples,
  ...goExamples,
  ...rustExamples,
  ...javaExamples,
] as SyntaxExample[];

export function getLanguageBySlug(slug: string) {
  return languages.find((language) => language.slug === slug);
}

export function getLanguageById(id: string) {
  return languages.find((language) => language.id === id);
}

export function getTopicBySlug(slug: string) {
  return topics.find((topic) => topic.slug === slug);
}

export function getTopicById(id: string) {
  return topics.find((topic) => topic.id === id);
}

export function getExamplesByTopic(topicId: string) {
  return examples.filter((example) => example.topicId === topicId);
}

export function getExamplesByLanguage(languageId: string) {
  return examples.filter((example) => example.languageId === languageId);
}

export function getExample(languageId: string, topicId: string) {
  return examples.find(
    (example) => example.languageId === languageId && example.topicId === topicId,
  );
}

export function groupTopicsByCategory() {
  return topics.reduce<Record<string, Topic[]>>((groups, topic) => {
    groups[topic.category] ??= [];
    groups[topic.category].push(topic);
    return groups;
  }, {});
}

export function getSupportedLanguageCount(topicId: string) {
  return new Set(getExamplesByTopic(topicId).map((example) => example.languageId)).size;
}
