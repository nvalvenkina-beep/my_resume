import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const methodologySkills = [
  "Проектирование курсов по модели обратного дизайна",
  "Формулирование учебных целей по таксономии Блума",
  "Выстраивание логики курса под модели обучения",
  "Оценка эффективности по модели Киркпатрика",
  "Применение моделей мотивации и Student Journey Map",
  "Работа с гипотезами по улучшению продукта",
  "Управление линейками курсов и продуктов",
];

const managementSkills = [
  "Анализ конкурентов, рынка, ЦА, custdev",
  "Разработка customer-персон и CJM",
  "Формулирование гипотез для новых продуктов",
  "Разработка концепции и моделей монетизации",
  "Разработка MVP продуктов",
  "Оценка эффективности на основе данных",
  "Планирование и координация задач, контроль исполнения",
];

const toolRows = [
  ["Holst", "Notion", "Tilda", "Figma", "CupCat"],
  ["ChatGPT", "Perplexity", "Gemini AI", "Claude", "Leonardo", "Recraft", "Gamma"],
  ["Kanban", "Диаграмма Ганта", "Google Doc", "Таск-трекеры (Jira, Google Календарь, Todoist)"],
  ["Claude Code", "Cursor", "VS Code", "Codex", "Replit"],
];

const softSkills = [
  {
    title: "Системное мышление",
    desc: "Могу видеть продукт как систему (программа → опыт студента → метрики → продажи → репутация).",
  },
  {
    title: "Работа с неопределённостью",
    desc: "Способность быстро вникать в неизвестное, принимать решения, адаптироваться к изменениям.",
  },
  {
    title: "Приоритезация задач и ресурсов",
    desc: "Выбор того, что именно сейчас больше и эффективнее всего влияет на результат.",
  },
  {
    title: "Ответственность",
    desc: "Никогда не оставлю важную задачу, потому что «не могу», «уже не рабочий день», «это не моя задача» — мне важен хороший результат.",
  },
  {
    title: "Коммуникация",
    desc: "Спокойная, нахожу общий язык с людьми и умею давать корректную обратную связь.",
  },
  {
    title: "Перевод сложного в понятное",
    desc: "Задаю правильные вопросы, распаковываю непонятные темы, аргументирую для того, кто не погружен в процесс.",
  },
  {
    title: "Адаптивность",
    desc: "Быстро осваиваю новые технологии, темы, области за счёт любознательности и способности критически анализировать информацию.",
  },
];

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-24 bg-white" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          className="flex items-end gap-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-4xl md:text-6xl font-display font-black text-gray-100 leading-none">03.</span>
          <h2 className="text-2xl md:text-3xl font-display font-bold uppercase tracking-wider mb-1">Навыки</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="font-display font-black text-xl uppercase tracking-wider mb-6 border-b-2 border-primary pb-3">
              Методология
            </h3>
            <ul className="space-y-3">
              {methodologySkills.map((s, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700">
                  <span className="mt-1.5 w-2 h-2 shrink-0 bg-primary" />
                  {s}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="font-display font-black text-xl uppercase tracking-wider mb-6 border-b-2 border-primary pb-3">
              Менеджмент
            </h3>
            <ul className="space-y-3">
              {managementSkills.map((s, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700">
                  <span className="mt-1.5 w-2 h-2 shrink-0 bg-primary" />
                  {s}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Tools in rows */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="font-display font-black text-xl uppercase tracking-wider mb-6 border-b-2 border-primary pb-3">
            Инструменты и сервисы
          </h3>
          <div className="space-y-3">
            {toolRows.map((row, rowIdx) => (
              <div key={rowIdx} className="flex flex-wrap gap-2">
                {row.map((t, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 bg-black text-white text-sm font-medium tracking-wide hover:bg-primary hover:text-black transition-colors duration-200 cursor-default"
                  >
                    {t}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Soft skills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 className="font-display font-black text-xl uppercase tracking-wider mb-8 border-b-2 border-primary pb-3">
            Мягкие навыки
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {softSkills.map((s, i) => (
              <div
                key={i}
                className="p-6 border border-gray-200 hover:border-primary transition-colors duration-300 group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-2 h-6 bg-primary group-hover:h-8 transition-all duration-300" />
                  <h4 className="font-display font-bold text-sm">{s.title}</h4>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
