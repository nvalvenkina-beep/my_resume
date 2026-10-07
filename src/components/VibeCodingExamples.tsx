import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";

const asset = (name: string) => `${import.meta.env.BASE_URL}vibecoding/${name}`;

type Example = {
  title: string;
  description: string;
  images: string[];
  demo?: string;
  link?: { url: string; label: string };
};

const examples: Example[] = [
  {
    title: "Суфлёр-невидимка",
    description: "Разработала для себя и экспертов — для выступлений на синхронных вебинарах и записи уроков. Суфлёр не виден при демонстрации или записи экрана. Чтобы показать его, мне даже пришлось сфотографировать экран на телефон :)",
    images: ["teleprompter.jpeg"],
  },
  {
    title: "Тренажёры для курса",
    description: "Собрала серию тренажёров, в которых студенты асинхронного курса могут проверить себя в принятии решений в роли менеджера образовательного проекта.",
    images: ["simulators-cover.png", "simulators-example.png"],
  },
  {
    title: "База знаний в Telegram Mini App",
    description: "Разработала для своих проектов базу знаний об ИИ в формате мини-приложения в Telegram.",
    images: ["knowledge-cover.jpeg", "knowledge-example.png"],
    link: { url: "https://t.me/aishnica_knowledge_bot", label: "Открыть базу знаний" },
  },
  {
    title: "Презентации с помощью кода",
    description: "Собираю учебные презентации в Claude Code и Codex.",
    images: Array.from({ length: 6 }, (_, index) => `presentation-${index + 1}.png`),
  },
  {
    title: "Интерактивные элементы",
    description: "Собираю интерактивные элементы для лонгридов, чтобы визуализировать текст и вовлечь студентов. Пример — диаграмма Ганта для урока в курсе о менеджменте образовательных проектов.",
    images: [],
    demo: "gantt-addie.html",
  },
  {
    title: "Лендинги",
    description: "Собираю лендинги с помощью кода. Мой сайт-резюме создан в Replit, VS Code и Codex и размещён на GitHub Pages. Сайт для курса разработан в Claude и размещён на Тильде.",
    images: ["landing-1.png", "landing-2.png"],
    link: { url: "https://osipov-education.ru/project_management_course", label: "Открыть сайт курса" },
  },
];

export default function VibeCodingExamples() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [imageExpanded, setImageExpanded] = useState(false);
  const active = activeIndex === null ? null : examples[activeIndex];

  return (
    <div id="vibecoding" className="mt-20 scroll-mt-24 border-t border-white/20 pt-12">
      <h3 className="font-display text-2xl font-bold md:text-3xl">Примеры вайбкодинга</h3>
      <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
        {examples.map((example, index) => (
          <button
            key={example.title}
            type="button"
            onClick={() => { setImageIndex(0); setImageExpanded(false); setActiveIndex(index); }}
            className="group flex flex-col text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            aria-haspopup="dialog"
          >
            <div className="relative mb-5 aspect-[4/3] w-full overflow-hidden bg-white/5">
              {example.demo ? (
                <iframe
                  src={asset(example.demo)}
                  title="Предпросмотр диаграммы Ганта"
                  loading="lazy"
                  sandbox="allow-scripts"
                  tabIndex={-1}
                  aria-hidden="true"
                  className="pointer-events-none h-full w-full border-0"
                />
              ) : (
                <img
                  src={asset(example.images[0])}
                  alt={example.title}
                  loading="lazy"
                  className="h-full w-full object-contain"
                />
              )}
            </div>
            <h4 className="font-display text-lg font-bold leading-snug group-hover:text-primary">{example.title}</h4>
            <p className="mt-3 text-sm leading-relaxed text-white/70">{example.description}</p>
            <span className="mt-auto flex items-center gap-2 pt-5 text-sm text-primary">
              {example.demo ? "Попробовать пример" : "Смотреть пример"}
              <ArrowUpRight size={16} aria-hidden="true" />
            </span>
          </button>
        ))}
      </div>

      <Dialog.Root open={active !== null} onOpenChange={(open) => { if (!open) setActiveIndex(null); }}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/85" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 flex max-h-[92dvh] w-[calc(100%-2rem)] max-w-6xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden border border-white/20 bg-black text-white focus:outline-none">
            {active && (
              <>
                <div className="shrink-0 border-b border-white/15 p-5 pr-16 md:p-7 md:pr-16">
                  <Dialog.Title className="font-display text-xl font-bold md:text-2xl">{active.title}</Dialog.Title>
                  <Dialog.Description className="mt-3 max-w-3xl text-sm leading-relaxed text-white/70">{active.description}</Dialog.Description>
                  {active.link && (
                    <a href={active.link.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm text-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-primary">
                      {active.link.label}<ArrowUpRight size={16} aria-hidden="true" />
                    </a>
                  )}
                </div>
                {imageExpanded && (
                  <button type="button" onClick={() => setImageExpanded(false)} className="shrink-0 border-b border-white/15 px-5 py-3 text-left text-sm text-primary focus-visible:outline-2 focus-visible:outline-primary">
                    ← Вернуться к галерее
                  </button>
                )}
                <div className="min-h-0 overflow-y-auto p-4 md:p-6">
                  {active.demo ? (
                    <div className="overflow-x-auto">
                      <iframe src={asset(active.demo)} title="Интерактивная диаграмма Ганта с этапами ADDIE" sandbox="allow-scripts" className="aspect-[1540/1168] w-full min-w-[760px] border-0 bg-white" />
                    </div>
                  ) : (
                    <>
                      {imageExpanded ? (
                        <img src={asset(active.images[imageIndex])} alt={`${active.title} — пример ${imageIndex + 1}`} className="h-auto w-auto max-w-none" />
                      ) : (
                        <button type="button" onClick={() => setImageExpanded(true)} aria-label="Увеличить изображение" className="block w-full cursor-zoom-in focus-visible:outline-2 focus-visible:outline-primary">
                          <img src={asset(active.images[imageIndex])} alt={`${active.title} — пример ${imageIndex + 1}`} className="mx-auto max-h-[55dvh] w-full object-contain" />
                          <span className="mt-3 block text-sm text-primary">Увеличить изображение</span>
                        </button>
                      )}
                      {!imageExpanded && active.images.length > 1 && (
                        <div className="mt-5 flex items-center justify-between gap-4">
                          <button type="button" onClick={() => setImageIndex((imageIndex - 1 + active.images.length) % active.images.length)} aria-label="Предыдущее изображение" className="border border-white/25 p-2 hover:border-primary focus-visible:outline-2 focus-visible:outline-primary"><ChevronLeft size={20} /></button>
                          <span className="text-sm text-white/70" aria-live="polite">{imageIndex + 1} / {active.images.length}</span>
                          <button type="button" onClick={() => setImageIndex((imageIndex + 1) % active.images.length)} aria-label="Следующее изображение" className="border border-white/25 p-2 hover:border-primary focus-visible:outline-2 focus-visible:outline-primary"><ChevronRight size={20} /></button>
                        </div>
                      )}
                    </>
                  )}
                </div>
                <Dialog.Close className="shrink-0 border-t border-white/15 px-5 py-3 text-left text-sm text-primary hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-primary">← Вернуться к примерам</Dialog.Close>
              </>
            )}
            <Dialog.Close aria-label="Закрыть пример" className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center border border-white/25 hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-primary"><X size={18} /></Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
