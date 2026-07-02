import { useState, useEffect } from "react";
import { X, ExternalLink } from "lucide-react";

import atlasImg1 from "@assets/Снимок_экрана_2026-06-27_в_18.37.21_1782560245626.png";
import denisImg1 from "@assets/Снимок_экрана_2026-06-27_в_18.31.59_1782559924013.png";
import denisImg2 from "@assets/Снимок_экрана_2026-06-27_в_18.32.30_1782559954379.png";
import denisImg3 from "@assets/Снимок_экрана_2026-06-27_в_18.33.06_1782559989648.png";
import denisImg4 from "@assets/photo_2026-06-27_18.34.59_1782560133896.jpeg";

interface Project {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
}

const projects: Project[] = [
  { id: "atlas", title: "Atlas Education", subtitle: "Корпоративный курс", tag: "Методология" },
  { id: "denis", title: "Денис Смирнов", subtitle: "Мини-курс для коуча", tag: "Методология + Дизайн" },
  { id: "andragogy", title: "Андрагогика: основы", subtitle: "Менеджмент запуска асинхронного курса", tag: "Управление проектом" },
  { id: "task", title: "Задача. Опыт. Результат.", subtitle: "Менеджмент запуска синхронного курса", tag: "Управление проектом" },
  { id: "viking", title: "VikingWood", subtitle: "Запуск курса по столярному делу", tag: "Продюсирование" },
  { id: "neuro", title: "Нейромотивация", subtitle: "Учебный курс Нетологии", tag: "Методология" },
];

function PhotoPlaceholder({ label }: { label: string }) {
  return (
    <div className="w-full aspect-[4/3] rounded-xl bg-[hsl(30,15%,92%)] border border-[hsl(30,15%,85%)] flex flex-col items-center justify-center gap-2">
      <div className="w-10 h-10 rounded-full bg-[hsl(30,15%,85%)] flex items-center justify-center">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="hsl(20,8%,48%)" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="m21 15-5-5L5 21" />
        </svg>
      </div>
      <span className="text-xs text-[hsl(20,8%,48%)]">{label}</span>
    </div>
  );
}

function AtlasContent() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <p className="text-sm font-medium uppercase tracking-widest text-[hsl(25,55%,35%)]">Контекст</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl bg-[hsl(30,15%,94%)]">
            <p className="text-xs font-semibold uppercase tracking-wider text-[hsl(20,8%,48%)] mb-2">До</p>
            <p className="text-sm leading-relaxed text-[hsl(20,10%,20%)]">Множество разрозненных текстов с подходом к продажам и с миссией компании на итальянском языке.</p>
          </div>
          <div className="p-5 rounded-xl bg-[hsl(30,15%,94%)]">
            <p className="text-xs font-semibold uppercase tracking-wider text-[hsl(20,8%,48%)] mb-2">Задача</p>
            <p className="text-sm leading-relaxed text-[hsl(20,10%,20%)]">Сформировать единый стандарт поведения менеджера и закрыть базовые знания по работе со сделкой.</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-sm font-medium uppercase tracking-widest text-[hsl(25,55%,35%)]">Решение</p>
        <ul className="space-y-3">
          {[
            "Составлена экосистема развития менеджера продаж",
            "Предложена система постоянного цикла «обучение → практика → корректировка», которая повышает продуктивность менеджеров и даёт дополнительную мотивацию",
            "Переведены, изучены, переработаны и дописаны существующие материалы",
            "Составлена учебная программа с подходом микрообучения: 1 урок = 1 тема. Написаны 50 уроков",
            "Предложена MVP-версия тренажеров по работе с клиентом с учётом целей, необходимых результатов и возможностей платформы",
          ].map((item, i) => (
            <li key={i} className="flex gap-3 items-start">
              <span className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[hsl(25,55%,35%)]" />
              <span className="text-sm leading-relaxed text-[hsl(20,10%,20%)]">{item}</span>
            </li>
          ))}
        </ul>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
          {["Онлайн-курс", "Очные семинары и практикумы", "Наставничество", "Регулярные встречи", "База знаний"].map((el, i) => (
            <div key={i} className="p-3 rounded-lg border border-[hsl(25,35%,85%)] bg-[hsl(25,35%,97%)] text-center">
              <span className="text-xs font-medium text-[hsl(25,55%,30%)]">{el}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-medium uppercase tracking-widest text-[hsl(25,55%,35%)]">Фото проекта</p>
        <PhotoPlaceholder label="Место под 1 фото" />
      </div>
    </div>
  );
}

function DenisContent() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <p className="text-sm font-medium uppercase tracking-widest text-[hsl(25,55%,35%)]">Задача</p>
          <p className="text-sm leading-relaxed text-[hsl(20,10%,20%)]">Собрать в короткие сроки мини-курс для раскрытия экспертности, набора первой аудитории в закрытый клуб и прогрева клиентов к консультации.</p>
        </div>
        <div className="space-y-3">
          <p className="text-sm font-medium uppercase tracking-widest text-[hsl(25,55%,35%)]">Фото проекта</p>
          <PhotoPlaceholder label="Место под 1 фото" />
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-sm font-medium uppercase tracking-widest text-[hsl(25,55%,35%)]">Результат</p>
        <ul className="space-y-3">
          {[
            "Из ряда аудио-записей и наработок эксперта составлена программа мини-курса, прописаны тезисы для записи видео",
            "Для записанных видео составлены презентации: выделены важные тезисы, сделано оформление в стиле эксперта",
            "Выделены темы для доп. материалов. Составлено и оформлено 3 гайда и 1 инструмент для работы на курсе (Дневник рефлексии)",
            "Курс оформлен в формате Telegram. Подобраны вспомогательные инструменты: опросники, вопросы для рефлексии. Срок — 2 недели",
            "Разработан сайт (от позиционирования, текстов и до дизайна) для английской версии курса",
          ].map((item, i) => (
            <li key={i} className="flex gap-3 items-start">
              <span className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[hsl(25,55%,35%)]" />
              <span className="text-sm leading-relaxed text-[hsl(20,10%,20%)]">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-4">
        <p className="text-sm font-medium uppercase tracking-widest text-[hsl(25,55%,35%)]">Скрины части материалов</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[denisImg1, denisImg2, denisImg3, denisImg4, atlasImg1].map((src, i) => (
            <div key={i} className="aspect-[3/4] rounded-xl overflow-hidden bg-[hsl(30,15%,92%)]">
              <img src={src} alt={`Материал ${i + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AndragogyContent() {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <p className="text-sm font-medium uppercase tracking-widest text-[hsl(25,55%,35%)]">О проекте</p>
        <p className="text-sm leading-relaxed text-[hsl(20,10%,20%)]">Асинхронный курс-книга от эксперта в формате лонгрида. Я выступала менеджером запуска всего проекта.</p>
      </div>

      <div className="space-y-4">
        <p className="text-sm font-medium uppercase tracking-widest text-[hsl(25,55%,35%)]">Что было сделано</p>
        <ul className="space-y-3">
          {[
            "Спроектирована дорожная карта проекта в формате диаграммы Ганта",
            "Составлен план задач от идеи до запуска с фиксацией сроков, статусов и ответственных",
            "Разработана система отслеживания статусов работы над материалами, которая позволила отслеживать статус нахождения отдельного материала у того или иного участника",
            "Контроль выполнения задач, помощь ответственным в задачах",
            "Разработан сайт для курса совместно с дизайнером",
          ].map((item, i) => (
            <li key={i} className="flex gap-3 items-start">
              <span className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[hsl(25,55%,35%)]" />
              <span className="text-sm leading-relaxed text-[hsl(20,10%,20%)]">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-5 rounded-xl bg-[hsl(25,35%,95%)] border-l-4 border-[hsl(25,55%,35%)]">
        <p className="text-sm font-medium text-[hsl(25,55%,30%)]">Разработанный шаблон дорожной карты используется теперь на других проектах эксперта</p>
        <p className="mt-2 text-sm text-[hsl(25,40%,45%)]">Курс запущен успешно и в срок.</p>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-medium uppercase tracking-widest text-[hsl(25,55%,35%)]">Фото проекта</p>
        <div className="grid grid-cols-2 gap-4">
          <PhotoPlaceholder label="Место под фото 1" />
          <PhotoPlaceholder label="Место под фото 2" />
        </div>
      </div>
    </div>
  );
}

function TaskContent() {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <p className="text-sm font-medium uppercase tracking-widest text-[hsl(25,55%,35%)]">О проекте</p>
        <p className="text-sm leading-relaxed text-[hsl(20,10%,20%)]">Синхронный курс по моделям проектирования учебных программ. Менеджмент запуска от идеи до старта.</p>
      </div>

      <div className="space-y-4">
        <p className="text-sm font-medium uppercase tracking-widest text-[hsl(25,55%,35%)]">Что было сделано</p>
        <ul className="space-y-3">
          {[
            "Составлен план задач от идеи до запуска с фиксацией сроков, статусов и ответственных",
            "Контроль выполнения задач, помощь ответственным в задачах",
            "Спроектирована SJM (дорожная карта студента) совместно с главным методистом, которая помогла отследить мотивацию студентов, зашить необходимые материалы и мероприятия по поддержке студентов и спланировать действия куратора курса",
            "Разработан сайт для курса совместно с дизайнером (техническая сборка)",
            "Разработан дизайн для досок Holst для вовлечения студентов в работу",
          ].map((item, i) => (
            <li key={i} className="flex gap-3 items-start">
              <span className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[hsl(25,55%,35%)]" />
              <span className="text-sm leading-relaxed text-[hsl(20,10%,20%)]">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-5 rounded-xl bg-[hsl(25,35%,95%)] border-l-4 border-[hsl(25,55%,35%)]">
        <p className="text-sm text-[hsl(25,40%,45%)]">Курс запущен успешно и в срок.</p>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-medium uppercase tracking-widest text-[hsl(25,55%,35%)]">Фото проекта</p>
        <PhotoPlaceholder label="Место под 1 фото" />
      </div>
    </div>
  );
}

function VikingContent() {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <p className="text-sm font-medium uppercase tracking-widest text-[hsl(25,55%,35%)]">О проекте</p>
        <p className="text-sm leading-relaxed text-[hsl(20,10%,20%)]">Курс по бизнесу на столах из эпоксидной смолы. На проекте выполняла роль продакт-менеджера и продюсера в части упаковки курса.</p>
      </div>

      <div className="space-y-4">
        <p className="text-sm font-medium uppercase tracking-widest text-[hsl(25,55%,35%)]">Запуск курса</p>
        <ul className="space-y-3">
          {[
            "Проведён конкурентный анализ и анализ целевой аудитории",
            "Описано позиционирование курса",
            "Составлен план задач от идеи до запуска",
            "Проведена распаковка эксперта: его история для контента продвижения, его методология и экспертиза для контента курса",
            "Совместно составлен учебный план: учащийся без знания столярки с нуля учится делать стол и запускать бизнес",
            "Составлены тезисы к урокам",
            "Составлены 3 разных тарифных плана",
            "Посчитана экономика и спланирована ожидаемая прибыль (негативный / оптимальный / позитивный исход)",
            "Разработан контент для соц. сетей от мягкого «возрождения» до продаж",
          ].map((item, i) => (
            <li key={i} className="flex gap-3 items-start">
              <span className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[hsl(25,55%,35%)]" />
              <span className="text-sm leading-relaxed text-[hsl(20,10%,20%)]">{item}</span>
            </li>
          ))}
        </ul>
        <div className="p-5 rounded-xl bg-[hsl(25,35%,95%)] border-l-4 border-[hsl(25,55%,35%)]">
          <p className="text-sm text-[hsl(25,40%,45%)]">Курс успешно запущен. Продажи полностью оправдали оптимальный исход по выручке.</p>
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-sm font-medium uppercase tracking-widest text-[hsl(25,55%,35%)]">Доработка проекта</p>
        <p className="text-sm text-[hsl(20,8%,48%)] leading-relaxed">Позже на учебном проекте решила доработать курс с методической точки зрения:</p>
        <ul className="space-y-3">
          {[
            "Глубже изучила аудиторию и переработала формат в асинхронный курс с выбором собственного формата прохождения — как часть мотивационной стратегии",
            "Предложила внедрить интерактивную практику и прописала сценарии",
            "Спроектировала 4 мотивационные стратегии с учётом реального пути взрослого студента: от воодушевления на старте — через сложности, сомнения и перегруз — к результату",
            "Прописала вопросы для кастдева аудитории",
          ].map((item, i) => (
            <li key={i} className="flex gap-3 items-start">
              <span className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[hsl(25,55%,35%)]" />
              <span className="text-sm leading-relaxed text-[hsl(20,10%,20%)]">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-medium uppercase tracking-widest text-[hsl(25,55%,35%)]">Коллаж проекта</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <PhotoPlaceholder key={i} label={`Фото ${i + 1}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

function NeuroContent() {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <p className="text-sm font-medium uppercase tracking-widest text-[hsl(25,55%,35%)]">О проекте</p>
        <p className="text-sm leading-relaxed text-[hsl(20,10%,20%)]">Учебный курс Нетологии по нейромотивации. Разработка методологии и учебной программы курса.</p>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-medium uppercase tracking-widest text-[hsl(25,55%,35%)]">Материалы проекта</p>
        <div className="grid grid-cols-2 gap-4">
          <PhotoPlaceholder label="Место под изображение 1" />
          <PhotoPlaceholder label="Место под изображение 2" />
        </div>
      </div>

      <div className="p-5 rounded-xl bg-[hsl(25,35%,95%)] border border-[hsl(25,35%,85%)]">
        <p className="text-sm font-medium text-[hsl(25,55%,30%)] mb-3">Посмотреть весь проект</p>
        <a
          href="https://buildin.ai/share/80bc3d59-c8c5-4e4c-b945-54a4b09625c5?code=X55D1N"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[hsl(25,55%,35%)] text-white text-sm font-medium hover:bg-[hsl(25,55%,30%)] transition-colors"
        >
          Открыть проект
          <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
}

const contentMap: Record<string, React.ReactNode> = {
  atlas: <AtlasContent />,
  denis: <DenisContent />,
  andragogy: <AndragogyContent />,
  task: <TaskContent />,
  viking: <VikingContent />,
  neuro: <NeuroContent />,
};

function Modal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div className="relative z-10 w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col">
        <div className="flex items-start justify-between p-6 pb-4 border-b border-[hsl(30,15%,90%)]">
          <div>
            <span className="text-xs font-medium uppercase tracking-widest text-[hsl(25,55%,35%)]">{project.tag}</span>
            <h2 className="mt-1 text-xl font-semibold text-[hsl(20,10%,12%)]">{project.title}</h2>
            <p className="mt-0.5 text-sm text-[hsl(20,8%,48%)]">{project.subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="ml-4 p-2 rounded-lg hover:bg-[hsl(30,15%,94%)] transition-colors flex-shrink-0"
          >
            <X size={18} className="text-[hsl(20,8%,48%)]" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
          {contentMap[project.id]}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <div className="min-h-screen bg-[hsl(30,20%,97%)] p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {projects.map((project) => (
          <button
            key={project.id}
            onClick={() => setActiveProject(project)}
            className="w-full text-left p-6 rounded-2xl bg-white border border-[hsl(30,15%,88%)] hover:border-[hsl(25,35%,70%)] hover:shadow-md transition-all duration-200 group"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-medium uppercase tracking-widest text-[hsl(25,55%,35%)]">{project.tag}</span>
                <h3 className="mt-1 text-lg font-semibold text-[hsl(20,10%,12%)] group-hover:text-[hsl(25,55%,30%)] transition-colors">{project.title}</h3>
                <p className="mt-0.5 text-sm text-[hsl(20,8%,48%)]">{project.subtitle}</p>
              </div>
              <div className="ml-4 w-8 h-8 rounded-full border border-[hsl(30,15%,85%)] group-hover:border-[hsl(25,35%,65%)] flex items-center justify-center transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[hsl(20,8%,48%)] group-hover:text-[hsl(25,55%,35%)] transition-colors">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </button>
        ))}
      </div>

      {activeProject && (
        <Modal project={activeProject} onClose={() => setActiveProject(null)} />
      )}
    </div>
  );
}
