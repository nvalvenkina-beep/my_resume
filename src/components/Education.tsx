import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const courses = [
  { year: "2026", title: "Конференция Learning Elements" },
  { year: "2026", title: "Вайбкодинг", org: "Zerocoder" },
  { year: "2025–2026", title: "Методолог онлайн-курсов", org: "Нетология", current: true },
  { year: "2025", title: "Андрагогика: основы", org: "курс Михаила Осипова" },
  { year: "2023", title: "Куратор дистанционного / онлайн-обучения", org: "РАНХиГС" },
  { year: "2021", title: "Акселерационная программа", org: "Акселератор стартапов МФТИ" },
  { year: "2019", title: "Business School", org: "Ernst & Young" },
];

export default function Education() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" className="py-24 bg-white" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          className="flex items-center gap-4 mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-3 py-1 bg-primary text-black text-xs font-bold uppercase tracking-widest">
            Образование
          </span>
          <div className="flex-1 h-px bg-gray-200" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Высшее образование</p>
            <div className="border-l-4 border-primary pl-6">
              <div className="text-sm font-bold text-gray-400 mb-1">2015 — 2019</div>
              <h3 className="font-display font-black text-2xl uppercase leading-tight mb-2">
                Менеджмент
              </h3>
              <div className="text-base font-medium text-gray-700 mb-1">
                Новосибирский национальный исследовательский государственный университет
              </div>
              <div className="text-sm text-gray-400">Новосибирск · Высшее</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Курсы и программы</p>
            <div className="space-y-0">
              {courses.map((c, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-4 py-4 border-b border-gray-100 last:border-b-0"
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.07 }}
                >
                  <span className="shrink-0 w-20 text-sm font-bold text-gray-400 pt-0.5">{c.year}</span>
                  <div className="flex-1">
                    <span className="font-display font-bold text-sm uppercase">
                      {c.title}
                    </span>
                    {c.org && (
                      <span className="text-sm text-gray-500"> · {c.org}</span>
                    )}
                    {c.current && (
                      <span className="ml-2 inline-block px-2 py-0.5 bg-primary text-black text-[10px] font-bold uppercase tracking-wider align-middle">
                        текущее
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
