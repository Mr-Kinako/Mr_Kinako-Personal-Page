import { useI18n } from "./I18nProvider";
import { projectsRu } from "./translations/projects/ru";
import { projectsEn } from "./translations/projects/en";
import type { ProjectTranslations } from "./types";

const projectTranslations = {
  ru: projectsRu,
  en: projectsEn,
};

export function useProjectTranslation() {
  const { locale } = useI18n();

  function getProject(projectKey: string): ProjectTranslations | undefined {
    return projectTranslations[locale][projectKey];
  }

  function getTask(projectKey: string, taskKey: string) {
    const project = getProject(projectKey);
    return project?.tasks[taskKey];
  }

  return { getProject, getTask, locale };
}
