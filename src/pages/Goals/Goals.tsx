import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CardContainer } from "@/components/UI-Kit/CardContainer";
import { Footer } from "@/components/Footer";
import { GoalsData } from "./GoalsData";
import { getGoalsStatsList, PRIORITY_CLASSES, STATUS_CLASSES } from "./GoalsUtils";

import s from "./Goals.module.scss";
import { Button } from "@/components/UI-Kit";
import { goalStatCategory } from "./GoalsTypes";

interface GoalsProps {
  stats?: goalStatCategory;
}

const BATCH_SIZE = 1;

export const Goals = ({ stats }: GoalsProps) => {
  const currentStats = stats || getGoalsStatsList();
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
      <div className={s.goalsPage}>
        {isPriorityModalOpen &&
          createPortal(
            <div className={s.modalOverlay} onClick={() => setIsPriorityModalOpen(false)}>
              <CardContainer customClass={s.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={s.modalHeader}>
                  <h3>Формула расчёта приоритета</h3>
                  <button className={s.closeBtn} onClick={() => setIsPriorityModalOpen(false)}>
                    ✕
                  </button>
                </div>

                <div className={s.modalBody}>
                  <p>
                    Приоритет находится в жёстком диапазоне от <strong>1.000</strong> (высокий) до{" "}
                    <strong>40.000</strong> (низкий).
                  </p>
                  <ul>
                    <li>
                      <strong>Backlog Score:</strong> Учитывает заброшенные и ожидающие задачи.
                    </li>
                    <li>
                      <strong>Critical Anomalies:</strong> Заброшенные задачи с высоким/средним
                      приоритетом сильно снижают число.
                    </li>
                    <li>
                      <strong>Abstraction parameters:</strong> longtime, deadline, moral и myself
                      price.
                    </li>
                  </ul>
                  <p className={s.modalNote}>Обновляется автоматически каждые 24 часа.</p>
                </div>
              </CardContainer>
            </div>,
            document.body,
          )}
        <CardContainer customClass={s.headerContainer}>
          <div className={s.headerInfo}>
            <h1 className={s.headerTitle}>Мои зафиксированные цели</h1>
            <div className={s.headerDesc}>
              Тут находится общий свод данных, в виде количества чего-то конкретного.
            </div>
          </div>

          <div className={s.headerStatsContainer}>
            <CardContainer customClass={s.editContainer}>
              {Object.values(currentStats).map((item) => {
                const isPriorityCard = item.id === "work-priority";

                return (
                  <div
                    key={item.id}
                    className={`${s.goalItem} ${isPriorityCard ? s.clickable : ""}`}
                    onClick={() => isPriorityCard && setIsPriorityModalOpen(true)}
                  >
                    <span className={s.count}>{item.count}</span>
                    <h5 className={s.title}>{item.title}</h5>
                  </div>
                );
              })}
            </CardContainer>
          </div>
        </CardContainer>
        {isLoading ? (
          <div className={s.loaderFallback}>Загрузка целей...</div>
        ) : (
          <div className={s.tasksContainer}>
            {visibleProjects.map(([projectKey, project]) => {
              const tasks = Object.entries(project.content || {});
              const goalsCount = tasks.length;

              return (
                <CardContainer key={projectKey} customClass={s.projectCard}>
                  <div className={s.projectHeaderTitle}>
                    <div className={s.projectInfoContainer}>
                      <h3 className={s.projectTitle}>{project.title}</h3>
                      <div className={s.projectGoals}>
                        <span>{goalsCount} целей</span>
                      </div>
                    </div>
                    {project.description && <p className={s.projectDesc}>{project.description}</p>}
                  </div>

                  {tasks.length > 0 ? (
                    <ul className={s.taskList}>
                      {tasks.map(([taskKey, task]) =>
                        task.title || task.description ? (
                          <CardContainer key={taskKey} customClass={s.contentContainer}>
                            <div className={s.taskInfoContainer}>
                              <h4 className={s.taskTitle}>{task.title}</h4>
                              <p className={s.taskDesc}>{task.description}</p>
                            </div>

                            <div className={s.taskMeta}>
                              {STATUS_CLASSES[task.status] && (
                                <span className={`${s.metaItem} ${STATUS_CLASSES[task.status]}`}>
                                  {task.status}
                                </span>
                              )}
                              {PRIORITY_CLASSES[task.priority] && (
                                <span
                                  className={`${s.metaItem} ${PRIORITY_CLASSES[task.priority] || ""}`}
                                >
                                  {task.priority}
                                </span>
                              )}
                            </div>
                          </CardContainer>
                        ) : (
                          <div key={taskKey} className={s.emptyContentFallback}>
                            <span>Существует задача, но её основные поля отсутствуют.</span>
                          </div>
                        ),
                      )}
                    </ul>
                  ) : (
                    <div className={s.emptyContentFallback}>
                      <span>Задачи для этого проекта пока не сформированы.</span>
                    </div>
                  )}
                </CardContainer>
              );
            })}

            {visibleCount < allProjects.length && (
              <Button customClass={s.loadMoreBtn} onClick={loadMore}>
                Показать ещё проекты ({allProjects.length - visibleCount})
              </Button>
            )}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};
