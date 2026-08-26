import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CardContainer } from "@/components/UI-Kit/CardContainer";
import { Footer } from "@/components/Footer";
import { GoalsData } from "./GoalsDataOriginal";
import { getGoalsStatsList, PRIORITY_CLASSES, STATUS_CLASSES } from "./GoalsUtils";
import { Button } from "@/components/UI-Kit";
import { goalStatCategory } from "./GoalsTypes";
import { useTranslation } from "@/i18n";
import { useProjectTranslation } from "@/i18n/useProjectTranslation";
import styles from "./Goals.module.scss";

interface GoalsProps {
  stats?: goalStatCategory;
}

const BATCH_SIZE = 1;

export const Goals = ({ stats }: GoalsProps) => {
  const { t } = useTranslation();
  const { getProject, getTask } = useProjectTranslation();

  const currentStats = stats || getGoalsStatsList(t);

  const [isPriorityModalOpen, setIsPriorityModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);

  const allProjects = Object.entries(GoalsData);
  const visibleProjects = allProjects.slice(0, visibleCount);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isPriorityModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isPriorityModalOpen]);

  const loadMore = () => {
    if (visibleCount < allProjects.length) {
      setVisibleCount((prev) => prev + BATCH_SIZE);
    }
  };

  return (
    <>
      <div className={styles.goalsPage}>
        {isPriorityModalOpen &&
          createPortal(
            <div className={styles.modalOverlay} onClick={() => setIsPriorityModalOpen(false)}>
              <CardContainer customClass={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                  <h3>{t("goals.priorityModalTitle")}</h3>
                  <button className={styles.closeBtn} onClick={() => setIsPriorityModalOpen(false)}>
                    ✕
                  </button>
                </div>

                <div className={styles.modalBody}>
                  <p>{t("goals.priorityModal.range")}</p>
                  <ul>
                    <li>{t("goals.priorityModal.backlogScore")}</li>
                    <li>{t("goals.priorityModal.criticalAnomalies")}</li>
                    <li>{t("goals.priorityModal.abstractionParams")}</li>
                  </ul>
                  <p className={styles.modalNote}>{t("goals.priorityModal.updateNote")}</p>
                </div>
              </CardContainer>
            </div>,
            document.body,
          )}

        <CardContainer customClass={styles.headerContainer}>
          <div className={styles.headerInfo}>
            <h1 className={styles.headerTitle}>{t("goals.title")}</h1>
            <div className={styles.headerDesc}>{t("goals.description")}</div>
          </div>

          <div className={styles.headerStatsContainer}>
            <CardContainer customClass={styles.editContainer}>
              {Object.values(currentStats).map((item) => {
                const isPriorityCard = item.id === "work-priority";

                return (
                  <div
                    key={item.id}
                    className={`${styles.goalItem} ${isPriorityCard ? styles.clickable : ""}`}
                    onClick={() => isPriorityCard && setIsPriorityModalOpen(true)}
                  >
                    <span className={styles.count}>{item.count}</span>
                    <h5 className={styles.title}>{item.title}</h5>
                  </div>
                );
              })}
            </CardContainer>
          </div>
        </CardContainer>

        {isLoading ? (
          <div className={styles.loaderFallback}>{t("goals.loading")}</div>
        ) : (
          <div className={styles.tasksContainer}>
            {visibleProjects.map(([projectKey, project]) => {
              const projectTranslation = getProject(projectKey);
              const tasks = Object.entries(project.content || {});
              const goalsCount = tasks.length;

              return (
                <CardContainer key={projectKey} customClass={styles.projectCard}>
                  <div className={styles.projectHeaderTitle}>
                    <div className={styles.projectInfoContainer}>
                      <h3 className={styles.projectTitle}>
                        {projectTranslation?.title || project.title}
                      </h3>
                      <div className={styles.projectGoals}>
                        <span>
                          {goalsCount} {t("goals.goalsCount")}
                        </span>
                      </div>
                    </div>
                    {project.description && (
                      <p className={styles.projectDesc}>
                        {projectTranslation?.description || project.description}
                      </p>
                    )}
                  </div>

                  {tasks.length > 0 ? (
                    <ul className={styles.taskList}>
                      {tasks.map(([taskKey, task]) => {
                        const taskTranslation = getTask(projectKey, taskKey);

                        return task.title || task.description ? (
                          <CardContainer key={taskKey} customClass={styles.contentContainer}>
                            <div className={styles.taskInfoContainer}>
                              <h4 className={styles.taskTitle}>
                                {taskTranslation?.title || task.title}
                              </h4>
                              <p className={styles.taskDesc}>
                                {taskTranslation?.description || task.description}
                              </p>
                            </div>

                            <div className={styles.taskMeta}>
                              {STATUS_CLASSES[task.status] && (
                                <span
                                  className={`${styles.metaItem} ${STATUS_CLASSES[task.status]}`}
                                >
                                  {t(`goals.status.${task.status}`)}
                                </span>
                              )}

                              {PRIORITY_CLASSES[task.priority] && (
                                <span
                                  className={`${styles.metaItem} ${PRIORITY_CLASSES[task.priority] || ""}`}
                                >
                                  {t(`goals.priority.${task.priority}`)}
                                </span>
                              )}
                            </div>
                          </CardContainer>
                        ) : (
                          <div key={taskKey} className={styles.emptyContentFallback}>
                            <span>{t("goals.emptyTask")}</span>
                          </div>
                        );
                      })}
                    </ul>
                  ) : (
                    <div className={styles.emptyContentFallback}>
                      <span>{t("goals.emptyProject")}</span>
                    </div>
                  )}
                </CardContainer>
              );
            })}

            {visibleCount < allProjects.length && (
              <Button customClass={styles.loadMoreBtn} onClick={loadMore}>
                {t("goals.loadMore", { count: allProjects.length - visibleCount })}
              </Button>
            )}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};
