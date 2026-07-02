import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [showPhone, setShowPhone] = useState(false);

  return (
    <section id="contact" className="py-24 bg-primary" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-end gap-4 mb-8">
            <span className="text-6xl font-display font-black text-black/10 leading-none">05.</span>
            <h2 className="text-3xl font-display font-bold uppercase tracking-wider mb-1 text-black">Контакты</h2>
          </div>

          <h3 className="text-5xl md:text-7xl font-display font-black uppercase leading-tight text-black mb-8">
            Напишите мне
          </h3>

          <p className="text-black/70 text-xl mb-12 max-w-lg">
            Открыта к&nbsp;новым проектам и&nbsp;сотрудничеству. Буду рада обсудить задачи в&nbsp;области методологии и&nbsp;управления образовательными продуктами.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-16 flex-wrap">
            <a
              href="https://t.me/dubininaa"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-black bg-transparent text-black font-bold uppercase tracking-wider text-sm hover:bg-black hover:text-white transition-colors duration-300"
            >
              Telegram
            </a>
            <button
              onClick={() => setShowPhone((v) => !v)}
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-black bg-transparent text-black font-bold uppercase tracking-wider text-sm hover:bg-black hover:text-white transition-colors duration-300"
            >
              {showPhone ? "8 960 792-41-91" : "Телефон"}
            </button>
            <a
              href="mailto:n.valvenkina@gmail.com"
              className="inline-flex items-center justify-center px-8 py-4 bg-black text-white font-bold uppercase tracking-wider text-sm hover:bg-white hover:text-black transition-colors duration-300"
            >
              Email
            </a>
          </div>

          <div className="border-t-2 border-black/20 pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <span className="font-display font-black text-lg text-black">Дубинина Анастасия</span>
            <span className="text-black/60 text-sm uppercase tracking-widest">Методолог · Менеджер в&nbsp;образовании</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
