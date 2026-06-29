import { motion } from "framer-motion";
import heroImg from "@assets/hero.png";

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center py-20 overflow-hidden">
      <div className="container mx-auto px-6">

        {/* Badge */}
        <motion.div
          className="mb-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-block px-4 py-1 bg-primary text-black font-bold text-sm uppercase tracking-widest">
            Портфолио
          </div>
        </motion.div>

        {/* Full-width heading */}
        <motion.h1
          className="font-display font-black uppercase leading-[0.92] mb-4 whitespace-nowrap overflow-visible"
          style={{ fontSize: "clamp(2.2rem, 7.5vw, 7rem)" }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <span className="block text-black">Дубинина</span>
          <span
            className="block"
            style={{ color: "white", WebkitTextStroke: "2px black", paintOrder: "stroke fill" }}
          >
            Анастасия
          </span>
        </motion.h1>

        {/* Divider */}
        <motion.div
          className="w-20 h-1.5 bg-primary mb-8"
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        />

        {/* Grid: text left, photo right — auto height, centered */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">

          {/* Left: info */}
          <motion.div
            className="flex flex-col items-start"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <h2 className="text-2xl md:text-3xl font-display font-medium text-gray-800 mb-4">
              Методолог &bull; Менеджер в&nbsp;образовании
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-lg border-l-4 border-primary pl-5 mb-8">
              Специалист в&nbsp;онлайн-образовании<br />с&nbsp;T-shape экспертизой.
            </p>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center justify-center px-8 py-3 bg-black text-white font-bold hover:bg-primary hover:text-black transition-colors duration-300 uppercase tracking-wider text-sm"
            >
              Связаться
            </a>
          </motion.div>

          {/* Right: photo */}
          <motion.div
            className="relative hidden md:block"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="absolute bottom-0 right-0 w-12 h-4/5 bg-primary z-0 translate-x-2" />
            <img
              src={heroImg}
              alt="Анастасия Дубинина"
              className="relative z-10 w-full h-full object-contain object-center grayscale hover:grayscale-0 transition-all duration-700"
              style={{ minHeight: "45vh", maxHeight: "70vh" }}
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
