import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { nb } from "@/utils/typography";

function Counter({ from = 0, to, suffix = "", duration = 2 }: { from?: number, to: number, suffix?: string, duration?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [hasStarted, setHasStarted] = useState(false);
  
  const spring = useSpring(from, {
    stiffness: 50,
    damping: 20,
  });
  
  useEffect(() => {
    if (inView && !hasStarted) {
      spring.set(to);
      setHasStarted(true);
    }
  }, [inView, spring, to, hasStarted]);

  const display = useTransform(spring, (current) => Math.round(current) + suffix);

  return <motion.span ref={ref}>{display}</motion.span>;
}

export default function About() {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });

  const statements = [
    nb("Разрабатываю обучение, ориентированное на измеримый результат"),
    nb("Работаю в продуктовой логике: связываю ценность обучающего продукта с потребностями рынка и бизнеса"),
    nb("Работаю с контентом на всём цикле — от идеи и структуры до упаковки и запуска"),
  ];

  return (
    <section id="about" className="py-24 bg-black text-white relative">
      <div className="container mx-auto px-6" ref={containerRef}>
        
        <div className="flex flex-col md:flex-row gap-12 items-start">
          <motion.div 
            className="md:w-1/3"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-end gap-4 mb-8">
              <span className="text-4xl md:text-6xl font-display font-black text-primary leading-none">01.</span>
              <h2 className="text-2xl md:text-3xl font-display font-bold uppercase tracking-wider mb-1">Обо мне</h2>
            </div>
          </motion.div>

          <div className="md:w-2/3">
            <div className="space-y-8 text-xl md:text-2xl font-light leading-relaxed">
              {statements.map((text, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                  className="flex gap-6 items-start group"
                >
                  <div className="w-8 h-8 mt-1 shrink-0 bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-colors">
                    <div className="w-2 h-2 bg-current" />
                  </div>
                  <p>{text}</p>
                </motion.div>
              ))}
            </div>

            <motion.div 
              className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-8 pt-12 border-t border-white/10"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div>
                <div className="text-5xl font-display font-black text-primary mb-2">
                  <Counter to={2} suffix="+" />
                </div>
                <div className="text-sm uppercase tracking-widest text-gray-400">лет опыта в&nbsp;образовании</div>
              </div>
              <div>
                <div className="text-5xl font-display font-black text-primary mb-2">
                  <Counter to={10} suffix="+" />
                </div>
                <div className="text-sm uppercase tracking-widest text-gray-400">готовых проектов</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
