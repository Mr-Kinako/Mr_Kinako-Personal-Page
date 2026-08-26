import type { TranslationSchema } from "../types";

export const ru = {
   nav: {
      home: "Главная",
      media: "Медиа",
      goals: "Цели",
   },
   home: {
      welcome: "Добро пожаловать в моё личное пространство.",
      aboutMeButton: "Обо мне",
   },
   aboutMe: {
      header: "Немного информации обо мне",
      hello: "Я Мистер Кинако, или же просто Кинако.",
      names: "Ко мне также можно обращаться как к: Кино, Кина, Кинак, Лисёнок.",
      moreInfo: "В основном люблю играть в игры и смотреть ютуб. Ну и также слушать музыку, скорее даже обожаю. По жизни особо ничем не занимаюсь пока, только вот программированием интересуюсь немного, уже даже есть некоторое понимание в этом.",
      spoiler: "Моё сердце пока занято только одним человеком.",
   },
   media: {
    title: "Галерея Медиа",
   },
   goals: {
      title: "Мои зафиксированные цели",
      description: "Тут находится общий свод данных, в виде количества чего-то конкретного.",
      loading: "Загрузка целей...",
      goalsCount: "целей",
      emptyTask: "Существует задача, но её основные поля отсутствуют.",
      emptyProject: "Задачи для этого проекта пока не сформированы.",
      loadMore: "Показать ещё проекты [{{count}}]",
      priorityModalTitle: "Формула расчёта приоритета",
      priorityModal: {
         range: "Приоритет находится в жёстком диапазоне от 1.000 (высокий) до 40.000 (низкий).",
         backlogScore: "Backlog Score: Учитывает заброшенные и ожидающие задачи.",
         criticalAnomalies: "Critical Anomalies: Заброшенные задачи с высоким/средним приоритетом сильно снижают число.",
         abstractionParams: "Abstraction parameters: longtime, deadline, moral и myself price.",
         updateNote: "Обновляется автоматически каждые 24 часа.",
      },
      stats: {
        "all-projects": "Всего кол-во проектов",
        "abandoned-projects": "Временно заброшенные проекты",
        "work-priority": "Приоритет работы (повышается в случае простоя)",
        "all-goals": "Всего целей (за исключением выполненных)",
        "in-process-goals": "Цели в процессе",
        "awaiting-goals": "Ожидают цели",
        "completed-goals": "Выполненные цели",
        "abandoned-goals": "Заброшенные цели",
      },
      status: {
         completed: "Выполнено",
         inProcess: "В процессе",
         awaiting: "Ожидает",
         frozen: "Заморожено",
         abandoned: "Заброшено",
      },
      priority: {
         high: "Высокий",
         medium: "Средний",
         low: "Низкий",
      },
   },
   commandLine: {
      placeholder: "Введите команду (-help)...",
      expand: "Развернуть",
      minimize: "Свернуть",
      fullscreenUnavailable: "Полноэкранный режим недоступен (ожидает реализации перемещения)",
      close: "Закрыть",
      unknown: 'Команда "{{command}}" не найдена. Введите -help для списка доступных команд.',
      systemError: '[System Error] Произошел внутренний сбой при выполнении команды "{{command}}".',
   },
   commands: {
      help: { description: "Вывод информации о командах и описание" },
      info: { description: "Информация о консоли kinako.sh и версия" },
      clear: { description: "Очистка буфера вывода консоли" },
      update: { description: "Информация о последнем обновлении" },
      theme: { description: "Переключение и настройка цветовых тем" },
   },
   footer: {
      license: "Лицензия MIT",
      sourceCode: "Исходный код",
      madeWith: "Сделано с лисьей любовью и манго🥭",
   },
   language: {
      ru: "Русский",
      en: "English",
   },
} satisfies TranslationSchema;

