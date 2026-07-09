import { AnimatePresence, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

type PortfolioProject = {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  cardImage: string;
  screen1Text: string;
  screen2Text: string;
  gallery: string[];
  detailsLink?: { url: string; label: string };
};

const normalizeAssetUrl = (value: unknown) => {
  if (typeof value === "string") {
    const normalized = value.trim();
    if (!normalized) return "";
    if (/^(https?:|data:|blob:|mailto:)/i.test(normalized)) return normalized;

    const base = import.meta.env.BASE_URL.endsWith("/")
      ? import.meta.env.BASE_URL
      : `${import.meta.env.BASE_URL}/`;

    if (typeof normalized === "string" && normalized.startsWith(base)) return normalized;
    if (typeof normalized === "string" && normalized.startsWith("/")) return `${base}${normalized.replace(/^\//, "")}`;
    return `${base}${normalized}`;
  }

  if (value && typeof value === "object" && "default" in value) {
    const defaultValue = (value as { default?: unknown }).default;
    return normalizeAssetUrl(defaultValue);
  }

  return "";
};

const cardFiles = import.meta.glob("../../portfolio-images/cards/*.{png,jpg,jpeg}", {
  eager: true,
  as: "url",
}) as Record<string, string>;

const portfolioFiles = import.meta.glob("../../portfolio-images/*/*.{png,jpg,jpeg}", {
  eager: true,
  as: "url",
}) as Record<string, string>;

const cardImages = Object.fromEntries(
  Object.entries(cardFiles).map(([file, url]) => {
    const parts = file.split("/");
    return [parts[parts.length - 1], normalizeAssetUrl(url)];
  }),
) as Record<string, string>;

const galleryByFolder = Object.entries(portfolioFiles).reduce(
  (acc, [file, url]) => {
    const parts = file.split("/");
    const folder = parts[parts.length - 2];
    if (folder === "Карточки для экрана" || folder === "cards") return acc;
    const fileName = parts[parts.length - 1];
    if (fileName.startsWith(".")) return acc;
    if (!acc[folder]) acc[folder] = [];
    acc[folder].push({ url, fileName });
    return acc;
  },
  {} as Record<string, { url: string; fileName: string }[]>,
);

const galleryByFolderUrls = Object.fromEntries(
  Object.entries(galleryByFolder).map(([folder, images]) => [
    folder,
    images
      .sort((a, b) =>
        a.fileName.localeCompare(b.fileName, undefined, {
          numeric: true,
          sensitivity: "base",
        }),
      )
      .map((item) => normalizeAssetUrl(item.url)),
  ]),
) as Record<string, string[]>;

const normalize = (value: string) =>
  value
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();

const normalizeSearch = (value: string) =>
  normalize(value)
    .replace(/[.]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const cardImageNameAliases: Record<string, string> = {
  "профориентация": "file.png",
  "профориентация для подростков": "file.png",
  "субсидирование": "subsidirovanie.png",
  "субсидирование бизнеса": "subsidirovanie.png",
  "управление проектами": "file.png",
  "управление образовательными проектами": "file.png",
  "коучинг": "koching_sostoyaniya.png",
  "курс по самокоучингу состояния": "koching_sostoyaniya.png",
  "нейромотивация": "neyromotivaciya.png",
  "нейромотивация": "neyromotivaciya.png",
  "atlas education": "atlas.png",
  "атлас": "atlas.png",
  "vikingwood": "Vikingwood.png",
  "викингвуд": "Vikingwood.png",
  "андрагогика": "andragogika.png",
  "андрагогика основы": "andragogika.png",
  "задача опыт результат": "file.png",
  "задача. опыт. результат": "file.png",
};

const normalizedCardImageNameAliases = Object.fromEntries(
  Object.entries(cardImageNameAliases).map(([key, value]) => [normalizeSearch(key), value]),
);

const galleryFolderAliases: Record<string, string> = {
  "Профориентация для подростков": "proforient",
  "Субсидирование бизнеса": "_",
  "Управление образовательными проектами": "uprav_proektami",
  "Курс по самокоучингу состояния": "___",
  "Нейромотивация": "dir",
  "Нейромотивация": "dir",
  "Atlas Education": "atlas",
  "Атлас": "atlas",
  "Vikingwood": "vikingwood",
  "Викингвуд": "vikingwood",
  "Андрагогика: основы": "andragogika",
  "Андрагогика": "andragogika",
  "Задача. Опыт. Результат.": "__",
  "Задача опыт результат": "__",
};

const galleryAliasMap = Object.fromEntries(
  Object.entries(galleryFolderAliases).map(([key, value]) => [
    normalizeSearch(key),
    value,
  ]),
);

const resolveCard = (needle: string) => {
  const normalizedNeedle = normalizeSearch(needle);
  const alias = normalizedCardImageNameAliases[normalizedNeedle] ?? cardImageNameAliases[normalizedNeedle];
  if (alias && cardImages[alias]) {
    return cardImages[alias];
  }

  const match = Object.entries(cardImages).find(([name]) => {
    const normalizedName = normalizeSearch(name);
    return (
      normalizedName.includes(normalizedNeedle) ||
      normalizedNeedle.includes(normalizedName)
    );
  });
  return match?.[1] ?? "";
};

const resolveGallery = (needle: string) => {
  const normalizedNeedle = normalizeSearch(needle);
  const alias = galleryAliasMap[normalizedNeedle] ?? needle;
  if (galleryByFolderUrls[alias]) {
    return galleryByFolderUrls[alias];
  }
  const normalizedAlias = normalizeSearch(alias);
  const entries = Object.entries(galleryByFolderUrls);
  const exactMatch = entries.find(
    ([folder]) => normalizeSearch(folder) === normalizedAlias,
  );
  if (exactMatch) {
    return exactMatch[1];
  }
  const fuzzyMatch = entries.find(([folder]) =>
    normalizeSearch(folder).includes(normalizedAlias),
  );
  return fuzzyMatch ? fuzzyMatch[1] : [];
};


const projects: PortfolioProject[] = [
  {
    id: "01",
    title: "Профориентация для подростков",
    subtitle: "онлайн-курс для подростков 14–18 лет",
    tag: "Методолог",
    cardImage: resolveCard("профориентация"),
    screen1Text: `Учебный проект для Нетологии.
Курс, который не даёт готовый ответ «кем быть», а учит самостоятельно принимать решения о профессиональном будущем. Формат перевёрнутого класса: между занятиями подросток смотрит короткие видео и следит за развитием истории персонажа курса. На вебинаре преобладает практика, дискуссии и работа с собственными артефактами. Никаких обязательных домашек: к концу каждого занятия артефакт модуля уже готов.
Курс опирается на исследование Стэнфорда (O'Keefe, Dweck, Walton, 2018): не «найди свою страсть», а «развивай интерес через действие», и на концепцию маленьких экспериментов (Le Cunff, 2025): вместо выбора «на всю жизнь» подросток формулирует гипотезы и проверяет их через небольшие эксперименты.
Финальный продукт ученика: «Карта профессионального маршрута» с картой навыков, ресурсов, ценностным разбором профессии и карьерным экспериментом на 90 дней.
После курса: индивидуальная консультация с профориентологом и выжимка для родителя.`,
    screen2Text: `Разработана концепция синхронного курса на 7 модулей с образовательными результатами и артефактами.
Описаны четыре персоны учеников и психолого-педагогический портрет группы.
Спроектирован сторителлинг: герой, мир, арка персонажа, драматургия. Написан детальный сценарий одного из уроков со скриптом для педагога.
Составлена карта учебной коммуникации по всему курсу: каналы, субъекты, этапы. Подготовлена памятка для родителей.
Разработан мотивационный дизайн.
Продуманы инструменты для работы на курсе.
Определены цели и метрики стейкхолдеров: CSI, NPS, COR, рост навыка до/после.
Собран раздел с исследованиями и источниками, на которые опирается курс.`,
    gallery: resolveGallery("Профориентация для подростков"),
    detailsLink: { url: "https://drive.google.com/file/d/1hBuFN8MZ3BteHhq3vXJEJrgPB8nYy94m/view?usp=sharing", label: "Презентация курса" },
  },
  {
    id: "02",
    title: "Субсидирование бизнеса",
    subtitle: "курс о том, как разобраться в господдержке",
    tag: "Методолог",
    cardImage: resolveCard("субсидирование"),
    screen1Text: `Курс создан для конкурса разработчиков обучения Лампа.Рейв
Владелец бизнеса слышит про субсидии, но не понимает, с чего начать: какие программы существуют, подходит ли его бизнес под них, как не получить отказ. Курс даёт пошаговый алгоритм от выбора программы до подачи заявки на получения господдердки..
Теория сочетается с разноформатной практикой: симуляции в безопасной среде, кейсы из разных отраслей и сквозной кейс, который ведёт одну компанию от начала до конца. На каждом этапе помогает Ева, персонаж-консультант по субсидиям.
Формат мобильного лонгрида: занятой предприниматель может изучать его в перерывах между делами. Интерактивные задания дают реалистичную обратную связь. На выходе: зафиксированный в Рабочей тетради план действий для своей компании, опыт заполнения заявок и дополнительные чек-листы.`,
    screen2Text: `Срок для разработки курса с нуля до результата на LMS:  2 недели работы в команде.
Переработаны существующие материалы. Проведен созвон-распаковка с заказчиком курса.
Спроектирована методическая архитектура курса: от выбора программы господдержки до получения субсидии.
Разработана структура обучения, сочетающая теорию с разноформатной практикой: симуляции, кейсы из разных отраслей и сквозной кейс, который ведёт одну компанию через весь процесс.
Спроектирован персонаж-помощник Ева: консультант, который сопровождает студента на каждом этапе, мотивирует и помогает в принятии решений.
Подобран формат мобильного лонгрида для изучения в перерывах между делами. Разработаны интерактивные задания с реалистичной обратной связью.
Составлена рабочая тетрадь с чек-листами, разработаны дополнительные материалы для дальнейшей работы с программами господдержки.
С помощью вайбкодинга разработаны практические задания для LMS-платформы.
Курс размещён на платформе Scroll.Tool.
🏆 Курс занял 1 место на конкурсе.`,
    gallery: resolveGallery("Субсидирование бизнеса"),
  },
  {
    id: "03",
    title: "Управление образовательными проектами",
    subtitle: "асинхронный курс с практико-рефлексивным тренажёром",
    tag: "Методолог",
    cardImage: resolveCard("управление проектами"),
    screen1Text: `Курс создан для разработчиков обучения, которые хотели бы вести проекты, но не знают, с чего начать. Курс проводит через весь жизненный цикл проекта по авторскому методу — от первой встречи с заказчиком до закрытия проекта.
В течение курса обучающийся может рефлексировать о теории и собственном опыте с помощью рабочей тетради с вопросами для рефлексии.
Вместо отвлечённых практических заданий — сквозной кейс: сеть кофеен «Зерно» заказывает курс для новых бариста, а обучающийся выступает менеджером этого проекта.
На выходе из каждого модуля — готовый управленческий документ: паспорт проекта, бюджет, RACI-матрица, диаграмма Ганта, реестр рисков и пр.. К финалу они складываются в полную карта проекта.
Практика живёт в интерактивном практико-рефлексивном тренажёре, созданном с помощью вайбкодинга. Тренажёр построен так, чтобы запустить у обучающегося настоящий процесс обучения на практике с фиксацией собственных решений и саморефлексией, а не просто решение заданий с автопроверкой.`,
    screen2Text: `Спроектирован курс из 8 модулей. Разработка курса по модели ADDIE.
Создан сквозной кейс: студент ведёт реальный проект для сети кофеен и собирает портфель управленческих артефактов.
Разработан интерактивный практико-рефлексивный тренажёр — веб-приложения без бэкенда, которые встроены затем на LMS-платформу.
Разработана рабочая тетрадь с вопросами для рефлексии и заданиями по тренажёру.
Проведена редактура всех текстовых модулей курса. И психометрическая проверка всех тестов к модулям.
Курс запущен на платформе Scroll.Tool.`,
    gallery: resolveGallery("Управление образовательными проектами"),
  },
  {
    id: "04",
    title: "Курс по самокоучингу состояния",
    subtitle: "мини-курс в формате лид-магнита для коуча",
    tag: "Методолог",
    cardImage: resolveCard("коучинг"),
    screen1Text: `Коуч ICF пришёл с запросом раскрыть экспертность, набрать первую аудиторию в закрытый клуб и прогреть клиентов к консультации. На руках: аудиозаписи и наработки, но без структуры. Срок: две недели.
В процессе работы получился курс в формате лид-магнита в телеграм с цепляющим дизайном и наполнением, которое помогает потенциальному клиенту сделать первые шаги в коучинге.`,
    screen2Text: `Проделанная работа:
Из аудиозаписей и наработок эксперта составлена программа мини-курса, прописаны тезисы для записи видео.
Для записанных видео составлены презентации: выделены ключевые тезисы, оформление в стиле, специально созданном нашей командой для эксперта.
Выделены темы для дополнительных материалов. Составлено и оформлено 3 гайда и 1 инструмент для работы на курсе — Дневник рефлексии.
Курс оформлен в формате Telegram. Подобраны вспомогательные инструменты для участников: опросники, вопросы для рефлексии.
Срок разработки: 2 недели.
Дополнительно разработан сайт для английской версии курса: от позиционирования и текстов до дизайна.`,
    gallery: resolveGallery("Курс по самокоучингу состояния"),
  },
  {
    id: "05",
    title: "Нейромотивация",
    subtitle: "как использовать дофамин, серотонин, эндорфин и окситоцин для эффективного обучения взрослых.",
    tag: "Методолог",
    cardImage: resolveCard("нейромотивация"),
    screen1Text: `Учебный проект для Нетологии.
Курс для тех, кто проектирует обучение и хочет опираться на нейронауку, а не на интуицию.
Одна из главных задач, которые стоят перед разработчиками образовательных курсов — как сохранить у студентов мотивацию к обучению до самого конца.
Этот курс поможет специалистам сферы образования получить научно обоснованную базу о том:
* как работают 4 "гормона мотивации";
* как применять эти знания при проектировании и проведении онлайн-курсов.
УТП курса:
* Курс практико-ориентированный. После каждого модуля студент будет выполнять кейсовое задание для закрепления теории. А в конце курса подготовит собственный проект, который сможет представить перед сокурсниками и экспертом.
* В курс внедрён сторителлинг - взрослый персонаж Миша, который проходит разные стадии обучения на курсе. Участники будут помогать методисту курса мотивировать и вовлекать Мишу с использованием тех знаний, которые они получают на курсе.
* Предусмотрен чат курса, в котором участники смогут найти поддерживающее коммьюнити и новые полезные знакомства.
Обучение начинается не с лекции, а с кейса: опытные слушатели сначала осознают дефицит знаний, потом получают теорию. Через сквозного персонажа участники тренируют принятие методических решений, а не просто слушают про них.`,
    screen2Text: `Проделанная работа:
* Спроектирована концепция программы и УТП: связала теорию с практическими инструментами для разработчиков обучения.
* Проведена сегментация аудитории, описаны портреты слушателей с учётом опыта, ожиданий и поведенческих особенностей.
* Архитектура обучения выстроена по принципу постоянной связки теории и применения. Из анализа аудитории (опытные слушатели) предложено начинать обучение с кейса для формирования осознания дефицита знаний.
* Разработаны 4 типа практики: рефлексия, решение кейсов, разработка проектов тест. Тест предложен не помодульно, а один финальный, построенный на принципе перемежающихся знаний для лучшего усвоения информации студентами.
* Спроектирован сторителлинг вокруг персонажа, через которого участники тренируют принятие методических решений.
* Продуман MVP: где можно сэкономить для тестового запуска. Предложена тарифная модель для масштабирования набора без потери управляемости продуктом.`,
    gallery: resolveGallery("Нейромотивация"),
    detailsLink: { url: "https://buildin.ai/share/80bc3d59-c8c5-4e4c-b945-54a4b09625c5?code=X55D1N", label: "Подробнее о курсе" },
  },
  {
    id: "06",
    title: "Atlas Education",
    subtitle: "Курс для новых технико-коммерческих менеджеров компании-дистрибьютора пластиковых окон в Италии",
    tag: "Методология",
    cardImage: resolveCard("Атлас"),
    screen1Text: `Компания собрала разрозненные тексты о подходах к продажам и миссии (на итальянском языке), но ими невозможно было обучать целый поток новых сотрудников в нескольких магазинах-дистрибьютерах.
Новый менеджер приходит в компанию и тонет в разрозненных текстах: подходы к продажам, миссия, стандарты. Единой системы нет, учиться не у кого.
Курс выстраивает путь от нуля до самостоятельной работы со сделкой. 50 уроков в формате микрообучения: 1 урок = 1 тема.
После онлайн-блока менеджер переходит к очным практикумам, где отрабатывает навыки. Дальше включается наставничество, а регулярные встречи и анализ работы удерживают сотрудника в системе развития и после обучения.
База знаний помогает в любой момент обратиться к проверенному источнику информации для работы.
Вся система работает по циклу «обучение → практика → корректировка»: менеджер не просто проходит курс, а остаётся в среде, которая его развивает.`,
    screen2Text: `Проделанная работа:
* Составлена экосистема развития менеджера продаж: онлайн-курс, очные практикумы, наставничество, база знаний.
* Предложена система постоянного цикла «обучение → практика → корректировка», которая повышает продуктивность и даёт дополнительную мотивацию.
* Переведены с итальянского, изучены, переработаны и дописаны существующие материалы компании.
* Составлена учебная программа в подходе микрообучения: 1 урок = 1 тема. Написаны 50+ уроков.
* Предложена MVP-версия тренажёров по работе с клиентом с учётом целей и необходимых результатов с одной стороны и возможностей платформы с другой. Составлены тексты самих тренажёров с ветвлением ответов.`,
    gallery: resolveGallery("Атлас"),
  },
  {
    id: "07",
    title: "VikingWood",
    subtitle: "курс по бизнесу на столах из эпоксидной смолы",
    tag: "Методист-продакт",
    cardImage: resolveCard("Vikingwood"),
    screen1Text: `Эксперт, который делает столы из эпоксидной смолы, обратился с задачей: научить других запускать такой бизнес с нуля, без знания столярки.
Моя роль сочетала продакт-менеджмент и продюсирование: от конкурентного анализа и распаковки эксперта до экономики проекта и контент-стратегии для соцсетей.
Результат: курс запущен, продажи полностью оправдали оптимальный прогноз по выручке.`,
    screen2Text: `Проделанная работа:
* Проведён конкурентный анализ и анализ ЦА. Описано позиционирование курса, составлен план задач от идеи до запуска.
* Проведена распаковка эксперта: история для контента продвижения, методология и экспертиза для контента курса.
* Совместно составлен учебный план: учащийся с нуля, без знания столярки, осваивает изготовление стола и запуск бизнеса. Составлены тезисы к урокам.
* Составлены 3 тарифных плана. Посчитана экономика и спланирована ожидаемая прибыль в трёх сценариях (негативный, оптимальный, позитивный).
* Разработан контент для соцсетях: от «возрождения» аккаунта эксперта до продаж.`,
    gallery: resolveGallery("Викингвуд"),
    detailsLink: { url: "https://buildin.ai/share/e8714396-3624-4ae6-ab29-02affecbc488?code=X55D1N", label: "Подробнее о курсе" },
  },
  {
    id: "08",
    title: "Андрагогика: основы",
    subtitle: "асинхронный курс-книга в формате лонгрида",
    tag: "Менеджмент",
    cardImage: resolveCard("андрагогика"),
    screen1Text: `Курс для тех, кто работает со взрослыми учениками и хочет понимать, как они на самом деле учатся.
В рамках курса рассмотрена ключевые принципы и модели андрагогики, без которых невозможно разработать эффективный продукт для обучения взрослой аудитории.
Андрагогика: основы — это систематизированные материалы, полученные из различных научных источников и дополненные методическим опытом эксперта курса.
Формат: лонгрид, который можно проходить в своём ритме.`,
    screen2Text: `Проделанная работа:
* Спроектирована дорожная карта проекта в формате диаграммы Ганта. Составлен план задач от идеи до запуска с фиксацией сроков, статусов и ответственных.
* Разработана система отслеживания статусов работы над материалами: она позволила видеть, у кого из участников находится конкретный материал и на каком он этапе.
* Контроль выполнения задач, помощь ответственным в задачах.
* Разработанный шаблон дорожной карты используется теперь на других проектах эксперта.
* Разработан сайт для курса совместно с дизайнером. Курс запущен успешно и в срок.`,
    gallery: resolveGallery("Андрагогика"),
    detailsLink: { url: "https://osipov-education.ru/andragogy", label: "Подробнее о курсе" },
  },
  {
    id: "09",
    title: "Задача. Опыт. Результат.",
    subtitle: "Синхронный курс-практикум по моделям проектирования учебных программ",
    tag: "Менеджмент",
    cardImage: resolveCard("Задача опыт результат"),
    screen1Text: `Курс учит практикующих педагогических дизайнеров выбирать модели проектирования учебной программы — «от задачи», «от опыта» и «от результата» — на основе системной методологии.
`,
    screen2Text: `Проделанная работа:
* Составлен план задач от идеи до запуска с фиксацией сроков, статусов и ответственных. Контроль выполнения задач, помощь ответственным.
* Спроектирована SJM (дорожная карта студента) совместно с главным методистом: она помогла отследить мотивацию, зашить поддерживающие материалы и спланировать действия куратора.
* Разработан сайт для курса совместно с дизайнером (техническая сборка). Разработан дизайн досок Holst для вовлечения студентов.
Курс запущен успешно и в срок.`,
    gallery: resolveGallery("Задача опыт результат"),
    detailsLink: { url: "https://osipov-education.ru/curriculum_design_models", label: "Подробнее о курсе" },
  },
];

export default function Portfolio() {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [activePage, setActivePage] = useState(0);

  useEffect(() => {
    if (activeProject === null) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveProject(null);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [activeProject]);

  const active = activeProject !== null ? projects[activeProject] : null;

  const openProject = (index: number) => {
    setActiveProject(index);
    setActivePage(0);
  };

  const closeProject = () => setActiveProject(null);

  return (
    <section id="portfolio" className="py-24 bg-black text-white" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          className="flex items-end gap-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-4xl md:text-6xl font-display font-black text-white/10 leading-none">02.</span>
          <h2 className="text-2xl md:text-3xl font-display font-bold uppercase tracking-wider mb-1">Портфолио</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.button
              key={project.id}
              type="button"
              onClick={() => openProject(index)}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden text-left"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={project.cardImage}
                  alt={project.title}
                  className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />

              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <span className="inline-flex items-center gap-2 mb-3 text-xs uppercase tracking-[0.3em] text-primary">
                  <span className="font-bold">{project.id}.</span>
                  {project.tag}
                </span>
                <h3 className="text-xl font-display font-black mb-1">{project.title}</h3>
                <p className="text-sm text-white/70 mb-4">{project.subtitle}</p>
                <span className="text-xs text-primary uppercase tracking-widest">Подробнее →</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="portfolio-modal-title"
              className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden border border-white/10 bg-black text-white"
              initial={{ y: 40, scale: 0.98, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 20, scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <div className="flex items-start justify-between border-b border-white/10 bg-black px-6 py-5">
                <div>
                  <h3 id="portfolio-modal-title" className="text-2xl font-display font-black uppercase">{active.title}</h3>
                  <p className="mt-2 text-sm text-white/70 max-w-2xl">{active.subtitle}</p>
                </div>
                <button
                  type="button"
                  onClick={closeProject}
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center border border-white/20 bg-white/5 text-white transition hover:bg-white hover:text-black"
                  aria-label="Закрыть"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto">
                <div className="grid gap-6 lg:grid-cols-[1fr_auto] p-8">
                  <div className="rounded-none border border-white/10 bg-white/5 p-6">
                    <h4 className="text-xl font-display font-black uppercase">
                      {activePage === 0 ? "О курсе" : "Что сделано"}
                    </h4>
                    <div className="mt-4 text-sm leading-7 text-white/75" style={{ whiteSpace: "pre-line" }}>
                      {activePage === 0 ? active.screen1Text : active.screen2Text}
                    </div>
                  </div>

                  <div className="flex flex-col items-stretch gap-3 lg:w-52">
                    {[
                      { label: "О курсе", page: 0 },
                      { label: "Что сделано", page: 1 },
                    ].map((button) => (
                      <button
                        key={button.page}
                        type="button"
                        onClick={() => setActivePage(button.page)}
                        className={`rounded-none border px-4 py-4 text-sm uppercase tracking-[0.3em] transition ${
                          activePage === button.page
                            ? "border-primary bg-primary text-black"
                            : "border-white/10 bg-white/5 text-white/80 hover:border-primary hover:text-white"
                        }`}
                      >
                        {button.label}
                      </button>
                    ))}
                    {active.detailsLink && (
                      <a
                        href={active.detailsLink.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-none border border-transparent bg-amber-400 px-4 py-4 text-sm uppercase tracking-[0.3em] text-black text-center hover:bg-amber-300"
                      >
                        {active.detailsLink.label}
                      </a>
                    )}
                  </div>
                </div>

                {active.gallery.length > 0 && (
                  <div className="border-t border-white/10 px-8 py-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                      {active.gallery.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`${active.title} screenshot ${index + 1}`}
                          className="w-full h-64 object-cover rounded-sm border border-white/10"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
