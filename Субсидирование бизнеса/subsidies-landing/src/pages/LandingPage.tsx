import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Smartphone, PlaySquare, FolderPlus } from "lucide-react";

export default function LandingPage() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-[#FFD600] selection:text-black">

      {/* 1. Hero */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 lg:px-12 py-20 overflow-hidden border-b-2 border-black">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-7xl mx-auto w-full relative z-10"
        >
          <motion.h1 variants={fadeInUp} className="leading-[0.88] flex flex-col mb-8" style={{ fontSize: "clamp(2rem, 6.5vw, 6rem)" }}>
            <span className="font-heading font-black text-black">СУБСИДИРОВАНИЕ</span>
            <span className="font-heading font-black text-black">БИЗНЕСА</span>
          </motion.h1>
          <motion.div variants={fadeInUp} className="max-w-2xl">
            <div className="w-[80px] h-[6px] bg-[#FFD600] mb-8" />
            <p className="text-xl md:text-2xl text-[#666666] font-medium leading-relaxed mb-10">
              Курс о том, как пошагово выбрать оптимальную господдержку для бизнеса
            </p>
            <a href="#about" className="brutal-btn text-base py-4 px-8 inline-block">
              Смотреть концепцию курса ↓
            </a>
          </motion.div>
        </motion.div>

        {/* Decorative yellow block */}
        <div className="absolute top-1/4 right-0 w-1/3 h-[40vh] bg-[#FFD600] -z-10 transform translate-x-1/2 -skew-x-12 opacity-20" />
      </section>

      {/* 2. "Цель курса" */}
      <section id="about" className="px-6 lg:px-12 py-24 border-b-2 border-black">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}>
            <h2 className="font-heading text-4xl md:text-5xl font-black mb-4 uppercase">Цель курса</h2>
            <div className="yellow-separator" />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { num: "01", title: "Системный подход", desc: "Пошаговая система выбора оптимальной господдержки для вашего бизнеса" },
              { num: "02", title: "Минимизация рисков", desc: "Снижение вероятности отклонения заявки и запроса на возврат средств" },
              { num: "03", title: "Развитие компании", desc: "Получение финансовой поддержки для масштабирования бизнеса" }
            ].map((item, i) => (
              <motion.div key={i} variants={fadeInUp} className="border-[1.5px] border-black p-8 relative pt-12">
                <div className="absolute top-0 left-0 w-full h-[4px] bg-[#FFD600]" />
                <div className="absolute top-6 left-8 bg-[#FFD600] font-heading font-bold text-xl px-2 py-1 leading-none border border-black">
                  {item.num}
                </div>
                <h3 className="text-2xl font-bold mt-6 mb-4">{item.title}</h3>
                <p className="text-[#666666] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. "Для кого этот курс" */}
      <section className="bg-black text-white px-6 lg:px-12 py-24 border-b-2 border-[#333]">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <h2 className="font-heading text-4xl md:text-6xl font-black mb-4 uppercase leading-tight">
              Для кого<br />этот курс
            </h2>
            <div className="w-[80px] h-[6px] bg-[#FFD600] mt-8 mb-6" />
            <p className="text-xl text-gray-300 font-medium">
              Для владельцев малого и среднего бизнеса, которые <span className="text-[#FFD600]">→</span>
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="flex flex-col gap-6 justify-center"
          >
            {[
              "Никогда не пользовались господдержкой",
              "Столкнулись с отказами из-за ошибок",
              "Ценят своё время",
              "Ищут чёткий алгоритм действий"
            ].map((text, i) => (
              <motion.div key={i} variants={fadeInUp} className="flex items-start gap-4 text-xl md:text-2xl font-medium">
                <div className="mt-2 w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-[#FFD600] border-b-[8px] border-b-transparent shrink-0" />
                <span>{text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. "Идея курса" */}
      <section id="program" className="px-6 lg:px-12 py-24 border-b-2 border-black">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <h2 className="font-heading text-4xl md:text-5xl font-black mb-4 uppercase">Идея курса</h2>
            <div className="yellow-separator" />
          </motion.div>

          {/* Tagline placed right below heading */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="bg-[#FFD600] p-6 border-2 border-black font-bold text-lg md:text-xl mb-10">
            Полное погружение в реальный процесс отбора через сочетание теории и разноформатной практики
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {[
              { title: "ТЕОРИЯ", desc: "Правила и требования программ" },
              { title: "СИМУЛЯЦИИ", desc: "Практика в безопасной среде" },
              { title: "КЕЙСЫ", desc: "Разбор реальных ситуаций" },
              { title: "ПРАКТИКА", desc: "Отработка каждого шага в получении поддержки от государства" }
            ].map((item, i) => (
              <motion.div key={i} variants={fadeInUp} className="border-2 border-black flex flex-col">
                <div className="bg-black text-white p-4 font-heading font-bold text-xl tracking-wide">
                  {item.title}
                </div>
                <div className="p-8 text-xl font-medium flex-grow">
                  {item.desc}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. "Разносторонние примеры" */}
      <section className="bg-[#F5F5F5] px-6 lg:px-12 py-24 border-b-2 border-black">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <h2 className="font-heading text-4xl md:text-5xl font-black mb-4 uppercase">Разносторонние примеры</h2>
            <div className="yellow-separator" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="bg-white border-2 border-black p-10">
              <h3 className="text-2xl font-bold mb-4 font-heading uppercase">Кейсы из разных сфер</h3>
              <p className="text-lg text-[#666666]">Примеры из различных отраслей бизнеса для понимания логики выбора</p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="bg-white border-2 border-black p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#FFD600] -mr-12 -mt-12 transform rotate-45 border-l-2 border-b-2 border-black" />
              <h3 className="text-2xl font-bold mb-4 font-heading uppercase relative z-10">Сквозной кейс</h3>
              <p className="text-lg text-[#666666] relative z-10">Пошаговое сопровождение одного примера от начала до получения поддержки</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. "Ева — ваш консультант" */}
      <section className="bg-black text-white px-6 lg:px-12 py-24 border-b-2 border-[#333] overflow-hidden">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.div variants={fadeInUp} className="inline-block bg-[#FFD600] text-black font-bold px-4 py-1 text-sm tracking-widest uppercase mb-8">
              ПЕРСОНАЛЬНЫЙ ПОМОЩНИК
            </motion.div>
            <motion.h2 variants={fadeInUp} className="font-heading text-4xl md:text-6xl font-black mb-6 leading-tight uppercase">
              ЕВА — ВАШ<br />КОНСУЛЬТАНТ
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-400 mb-10">
              Персонализированный помощник по субсидиям
            </motion.p>

            <div className="flex flex-col gap-5">
              {[
                "Ценные советы на каждом этапе",
                "Мотивация продолжать обучение",
                "Поддержка в принятии решений"
              ].map((text, i) => (
                <motion.div key={i} variants={fadeInUp} className="flex items-center gap-4 text-lg">
                  <div className="w-3 h-3 bg-[#FFD600] shrink-0" />
                  <span>{text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="relative flex justify-center lg:justify-end">
            <div className="relative w-72 md:w-96" style={{ aspectRatio: "1/1" }}>
              {/* Yellow accent block behind */}
              <div className="absolute inset-0 bg-[#FFD600] transform translate-x-4 translate-y-4" />
              {/* Eva image */}
              <img
                src="/eva.jpeg"
                alt="Ева — консультант"
                className="absolute inset-0 w-full h-full object-cover object-top border-2 border-white brutal-photo"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 7. "Практические инструменты" */}
      <section id="tools" className="px-6 lg:px-12 py-24 border-b-2 border-black">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <h2 className="font-heading text-4xl md:text-5xl font-black mb-4 uppercase">Практические инструменты</h2>
            <div className="yellow-separator" />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              {
                icon: BookOpen,
                title: "Рабочая тетрадь",
                desc: "Содержит задания, последовательно заполняя которые, обучающийся получит всю необходимую информацию для подачи заявки уже к концу курса"
              },
              {
                icon: Smartphone,
                title: "Мобильная версия",
                desc: "Формат лонгрида для изучения курса в перерывах между делами"
              },
              {
                icon: PlaySquare,
                title: "Интерактивные задания",
                desc: "Практика с реалистичной обратной связью"
              },
              {
                icon: FolderPlus,
                title: "Дополнительные материалы",
                desc: "Чек-листы и инструкции для помощи в поиске и получении программ поддержки, которые останутся с обучающимся"
              }
            ].map((item, i) => (
              <motion.div key={i} variants={fadeInUp} className="border-2 border-black p-6 relative pt-10 flex flex-col hover:bg-gray-50 transition-colors min-w-0">
                <div className="absolute top-0 left-0 w-full h-[6px] bg-[#FFD600]" />
                <item.icon className="w-8 h-8 mb-4 shrink-0" />
                <h3 className="font-heading text-[0.95rem] font-bold mb-3 leading-snug hyphens-none">{item.title}</h3>
                <p className="text-[#666666] text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 8. "На выходе вы получите" */}
      <section id="results" className="bg-[#FFD600] px-6 lg:px-12 py-32 border-b-2 border-black">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <h2 className="font-heading text-4xl md:text-6xl font-black mb-16 uppercase">На выходе вы получите</h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="flex flex-col gap-8"
          >
            {[
              { num: "01", title: "Готовый план действий", desc: "Пошаговая стратегия для вашей компании по получению поддержки от государства" },
              { num: "02", title: "Практические навыки", desc: "Опыт заполнения заявок и работы с документами" },
              { num: "03", title: "Рабочие материалы", desc: "Чек-листы и ресурсы для постоянного использования" }
            ].map((item, i) => (
              <motion.div key={i} variants={fadeInUp} className="relative bg-white border-2 border-black p-8 md:p-12 overflow-hidden hover:-translate-y-1 transition-transform">
                <div className="absolute -right-8 -top-12 font-black font-heading leading-none pointer-events-none select-none" style={{ fontSize: "clamp(120px, 18vw, 240px)", WebkitTextStroke: "2px #000", color: "transparent", opacity: 0.15 }}>
                  {item.num}
                </div>
                <div className="relative z-10 md:w-2/3">
                  <h3 className="font-heading text-2xl md:text-4xl font-black mb-4">{item.title}</h3>
                  <p className="text-xl text-[#666666]">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 9. Footer */}
      <footer className="bg-black text-white px-6 lg:px-12 py-16">
        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="font-heading font-black text-3xl tracking-tight mb-2">СУБСИДИИ ДЛЯ БИЗНЕСА</div>
            <div className="text-gray-400 text-sm">Как разобраться в господдержке</div>
          </div>
          <div className="text-gray-400 text-sm md:text-right max-w-xs leading-relaxed">
            Концепция курса создана для Конкурса разработчиков обучения.
          </div>
        </div>
      </footer>
    </div>
  );
}
