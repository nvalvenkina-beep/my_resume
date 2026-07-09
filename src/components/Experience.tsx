import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const mainExperiences = [
  {
    period: "04.2026 — наст. момент",
    role: "Фриланс",
    company: "Проекты по психологии, менеджменту и др."
  },
  {
    period: "10.2025 - 03.2026",
    role: "Ассистент методолога-продюсера",
    company: "Kochaning Lab"
  },
  {
    period: "02.2024 - 03.2026",
    role: "Проджект-менеджер на проектах методолога Михаила Осипова",
    company: "Лаборатория онлайн-обучения"
  },
  {
    period: "04.2022 - 07.2022",
    role: "Запуск онлайн-курса по столярному делу",
    company: "VikingWood"
  },
  {
    period: "04.2020 - 04.2022",
    role: "Бизнес-ассистент / Руководитель проектов",
    company: "Дизайн-бюро Urbanist (в 2021 прошла акселератор Физтех.Старт)"
  },
];

const earlierExperiences = [
  {
    period: "07.2019 - 06.2021",
    role: "Ведущий экономист финансового отдела",
    company: "АО «РЭС»"
  },
  {
    period: "09.2018 - 05.2019",
    role: "Стажер-аналитик",
    company: "EY Russia"
  }
];

function ExperienceItem({ exp, i, offset, inView }: { exp: { period: string; role: string; company: string }, i: number, offset: number, inView: boolean }) {
  return (
    <motion.div
      className={`relative flex flex-col md:flex-row items-start md:items-center mb-12 ${
        i % 2 === 0 ? "md:flex-row-reverse" : ""
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: offset * 0.1 }}
    >
      <div className="absolute left-[-5px] md:left-1/2 md:-ml-[5px] top-1 md:top-auto w-[11px] h-[11px] bg-primary outline outline-4 outline-gray-50 z-10"></div>
      <div className={`pl-8 md:pl-0 md:w-1/2 ${i % 2 === 0 ? "md:pl-12" : "md:pr-12 md:text-right"}`}>
        <div className="text-sm font-bold tracking-widest text-gray-400 mb-2">{exp.period}</div>
        <h3 className="text-xl font-display font-bold mb-1">{exp.role}</h3>
        <div className="text-primary font-medium">{exp.company}</div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6" ref={containerRef}>
        <motion.div
          className="flex items-end gap-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-4xl md:text-6xl font-display font-black text-gray-200 leading-none">04.</span>
          <h2 className="text-2xl md:text-3xl font-display font-bold uppercase tracking-wider mb-1">Опыт</h2>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gray-200 md:-translate-x-px"></div>

          {mainExperiences.map((exp, i) => (
            <ExperienceItem key={i} exp={exp} i={i} offset={i} inView={inView} />
          ))}

          <motion.div
            className="relative my-10 pl-8 md:pl-0"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            <div className="md:w-1/2 md:mx-auto flex items-center gap-4">
              <div className="h-px flex-1 bg-gray-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-gray-400 whitespace-nowrap">Более ранний опыт</span>
              <div className="h-px flex-1 bg-gray-300" />
            </div>
          </motion.div>

          {earlierExperiences.map((exp, i) => (
            <ExperienceItem key={i} exp={exp} i={i} offset={mainExperiences.length + 1 + i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
