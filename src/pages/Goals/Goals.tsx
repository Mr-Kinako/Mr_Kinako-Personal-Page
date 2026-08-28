import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CardContainer } from "@/components/UI-Kit/CardContainer";
import { Footer } from "@/components/Footer";
import { GoalsData } from "./GoalsDataOriginal";
import { calculateAbandonedProjectsCount, calculateRawStats } from "./GoalsStats";
import { PRIORITY_CLASSES, STATUS_CLASSES } from "./GoalsClasses";
import { Button } from "@/components/UI-Kit";
import { goalStatCategory } from "./GoalsTypes";
import { useTranslation } from "@/i18n";
import { useProjectTranslation } from "@/i18n/useProjectTranslation";
import { usePriority } from "@/services/priority";
import styles from "./Goals.module.scss";

interface GoalsProps {
  stats?: goalStatCategory;
}

const BATCH_SIZE = 1;

function getGoalsStatsList(
  t: (key: string) => string,
  livePriority: number | null,
): goalStatCategory {
  const stats = calculateRawStats();
  const abandonedProjectsCount = calculateAbandonedProjectsCount(stats.allProjectsCount);

  return {
    "all-projects": {
      id: "all-projects",
      title: t("goals.stats.all-projects"),
      count: stats.allProjectsCount,
    },
    "abandoned-projects": {
      id: "abandoned-projects",
      title: t("goals.stats.abandoned-projects"),
      count: abandonedProjectsCount,
    },
    "work-priority": {
      id: "work-priority",
      title: t("goals.stats.work-priority"),
      count: livePriority ?? 0,
    },
    "all-goals": {
      id: "all-goals",
      title: t("goals.stats.all-goals"),
      count: stats.totalActiveGoals,
    },
    "in-process-goals": {
      id: "in-process-goals",
      title: t("goals.stats.in-process-goals"),
      count: stats.inProcessGoals,
    },
    "awaiting-goals": {
      id: "awaiting-goals",
      title: t("goals.stats.awaiting-goals"),
      count: stats.awaitingGoals,
    },
    "completed-goals": {
      id: "completed-goals",
      title: t("goals.stats.completed-goals"),
      count: stats.completedGoals,
    },
    "abandoned-goals": {
      id: "abandoned-goals",
      title: t("goals.stats.abandoned-goals"),
      count: stats.abandonedGoals,
    },
  };
}

export const Goals = ({ stats }: GoalsProps) => {
  const { t } = useTranslation();
  const { getProject, getTask } = useProjectTranslation();
  const {
    priority,
    // loading: priorityLoading
  } = usePriority();

  const currentStats = stats || getGoalsStatsList(t, priority);

  const [isPriorityModalOpen, setIsPriorityModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);

  const allProjects = Object.entries(GoalsData);
  const visibleProjects = allProjects.slice(0, visibleCount);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isPriorityModalOpen ? "hidden" : "";
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
                    <li>{t("goals.priorityModal.storage")}</li>
                    <li>{t("goals.priorityModal.autoUpdate")}</li>
                    <li>{t("goals.priorityModal.decay")}</li>
                    <li>{t("goals.priorityModal.versioning")}</li>
                    <li>{t("goals.priorityModal.i18n")}</li>
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
              const projectTrans = getProject(projectKey);
              const tasks = Object.entries(project.content || {});
              const goalsCount = tasks.length;

              return (
                <CardContainer key={projectKey} customClass={styles.projectCard}>
                  <div className={styles.projectHeaderTitle}>
                    <div className={styles.projectInfoContainer}>
                      <h3 className={styles.projectTitle}>
                        {projectTrans?.title || project.title}
                      </h3>
                      <div className={styles.projectGoals}>
                        <span>
                          {goalsCount} {t("goals.goalsCount")}
                        </span>
                      </div>
                    </div>
                    {project.description && (
                      <p className={styles.projectDesc}>
                        {projectTrans?.description || project.description}
                      </p>
                    )}
                  </div>

                  {tasks.length > 0 ? (
                    <ul className={styles.taskList}>
                      {tasks.map(([taskKey, task]) => {
                        const taskTrans = getTask(projectKey, taskKey);
                        return task.title || task.description ? (
                          <CardContainer key={taskKey} customClass={styles.contentContainer}>
                            <div className={styles.taskInfoContainer}>
                              <h4 className={styles.taskTitle}>{taskTrans?.title || task.title}</h4>
                              <p className={styles.taskDesc}>
                                {taskTrans?.description || task.description}
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
