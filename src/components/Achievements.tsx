import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import diplomaImg from "@assets/certificate.jpg";
import teamImg from "@assets/team.jpeg";

export default function Achievements() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="achievements" className="py-24 bg-black text-white" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          className="flex items-end gap-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-display font-bold uppercase tracking-wider mb-1">
            Достижения
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="w-16 h-1.5 bg-primary mb-8" />
            <p className="text-3xl md:text-4xl font-display font-black leading-tight mb-6">
              В&nbsp;2026&nbsp;году стала победителем конкурса разработчиков обучения
            </p>
            <p className="text-gray-400 text-lg leading-relaxed">
              Конкурс «Лампа Рейв — 2026» среди разработчиков электронных курсов.
              Команда «Курс 2×2» заняла&nbsp;<span className="text-primary font-bold">1&nbsp;место</span> с&nbsp;курсом «Субсидирование для&nbsp;бизнеса».
            </p>
          </motion.div>

          {/* Photos */}
          <div className="grid grid-cols-2 gap-4">
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="absolute -top-2 -left-2 w-full h-full bg-primary z-0" />
              <img
                src={diplomaImg}
                alt="Диплом победителей Лампа Рейв 2026"
                className="relative z-10 w-full object-cover"
              />
            </motion.div>

            <motion.div
              className="relative mt-8"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.45 }}
            >
              <img
                src={teamImg}
                alt="Команда на конкурсе Learning Elements"
                className="w-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
