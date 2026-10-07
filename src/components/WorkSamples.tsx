import { useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowUpRight, ChevronDown, ChevronLeft, ChevronRight, X } from "lucide-react";
import samplesData from "@/data/workSamples.json";
import "./work-samples.css";

type Field = { label: string; text: string };
type SampleItem = { title: string; fields: Field[] };
type Block = { type: string; text?: string; rows?: string[][] };
type OriginalImage = { src: string; alt: string; caption: string };
type Group = { title: string; items?: SampleItem[]; blocks?: Block[]; stepLabel?: string; duration?: string; images?: OriginalImage[]; slides?: OriginalImage[]; table?: { headers: string[]; rows: string[][]; note?: string } };
type Sample = {
  id: string; title: string; description: string; project: string;
  groups: Group[];
  preview: { type: string; labels: string[]; caption: string };
};
const samples: Sample[] = samplesData;


function Preview({ sample }: { sample: Sample }) {
  return (
    <div className={`sample-preview sample-preview--${sample.preview.type}`} aria-hidden="true">
      {sample.preview.type === "slides" && <img className="sample-slide-cover" src={`${import.meta.env.BASE_URL}${sample.groups[0].slides?.[0].src}`} alt="" loading="lazy" />}
      <div className="sample-preview-content">
        {sample.preview.labels.map((label, i) => (
          <div className="sample-preview-row" key={label}>
            <span className="sample-preview-marker">{sample.preview.type === "questions" ? "?" : sample.preview.type === "status" ? "✓" : ""}</span>
            <span>{label}</span>
            <span className="sample-preview-lines"><i /><i style={{ width: `${70 - i * 15}%` }} /></span>
          </div>
        ))}
      </div>
      <span className="sample-preview-caption">{sample.preview.caption}</span>
    </div>
  );
}

function SlidesGallery({ slides, allSlides }: { slides: OriginalImage[]; allSlides: OriginalImage[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const touchStart = useRef<number | null>(null);
  const image = index === null ? null : allSlides[index];
  const move = (direction: number) => setIndex(value => value === null ? null : (value + direction + allSlides.length) % allSlides.length);

  return (
    <Dialog.Root open={image !== null} onOpenChange={open => { if (!open) setIndex(null); }}>
      <p className="sample-slides-hint">Нажмите на слайд, чтобы рассмотреть его и пролистать все 14 примеров.</p>
      <div className="sample-slides-grid">
        {slides.map(slide => (
          <Dialog.Trigger asChild key={slide.src}>
            <button type="button" className="sample-slide-thumb" onClick={() => setIndex(allSlides.findIndex(item => item.src === slide.src))}>
              <img src={`${import.meta.env.BASE_URL}${slide.src}`} alt={slide.alt} loading="lazy" />
              <span>{slide.caption}<ArrowUpRight size={16} /></span>
            </button>
          </Dialog.Trigger>
        ))}
      </div>
      {image && <Dialog.Portal>
        <Dialog.Overlay className="sample-slide-overlay" />
        <Dialog.Content className="sample-slide-lightbox" onKeyDown={event => {
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") { event.preventDefault(); move(event.key === "ArrowLeft" ? -1 : 1); }
        }}>
          <header>
            <div><Dialog.Title>{image.caption}</Dialog.Title><Dialog.Description>Слайд {(index ?? 0) + 1} из {allSlides.length}</Dialog.Description></div>
            <Dialog.Close className="sample-slide-control" aria-label="Закрыть слайд"><X size={24} /></Dialog.Close>
          </header>
          <div className="sample-slide-stage" onTouchStart={event => { touchStart.current = event.touches[0].clientX; }} onTouchEnd={event => {
            if (touchStart.current !== null) { const distance = event.changedTouches[0].clientX - touchStart.current; if (Math.abs(distance) > 50) move(distance < 0 ? 1 : -1); }
            touchStart.current = null;
          }}>
            <img src={`${import.meta.env.BASE_URL}${image.src}`} alt={image.alt} />
          </div>
          <footer>
            <button type="button" className="sample-slide-control" aria-label="Предыдущий слайд" onClick={() => move(-1)}><ChevronLeft size={22} /><span>Назад</span></button>
            <span className="sample-slide-counter" aria-live="polite">{(index ?? 0) + 1} / {allSlides.length}</span>
            <button type="button" className="sample-slide-control" aria-label="Следующий слайд" onClick={() => move(1)}><span>Дальше</span><ChevronRight size={22} /></button>
          </footer>
        </Dialog.Content>
      </Dialog.Portal>}
    </Dialog.Root>
  );
}

function SampleFields({ fields }: { fields: Field[] }) {
  return (
    <dl className="sample-fields">
      {fields.map((field, index) => (
        <div key={`${field.label}-${index}`} className={`sample-field ${field.label === "Мой комментарий" ? "sample-field--comment" : ""}`}>
          <dt>{field.label}</dt>
          <dd>{field.label === "Статус материала" ? <span className="sample-status">{field.text}</span> : field.text}</dd>
        </div>
      ))}
    </dl>
  );
}

function WorkbookBlocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="sample-workbook">
      {blocks.map((block, index) => block.type === "table" ? (
        <div className="sample-table-scroll" key={index} role="region" aria-label="Шаблон рабочей тетради" tabIndex={0}>
          <table>
            <thead><tr>{block.rows?.[0]?.map((cell, i) => <th scope="col" key={i}>{cell || "Ответ"}</th>)}</tr></thead>
            <tbody>{block.rows?.slice(1).map((row, r) => <tr key={r}>{row.map((cell, c) => <td key={c}>{cell || <span className="sample-answer">Поле для ответа</span>}</td>)}</tr>)}</tbody>
          </table>
        </div>
      ) : <p key={index}>{block.text}</p>)}
    </div>
  );
}

function ImageViewer({ image }: { image: OriginalImage }) {
  const [zoom, setZoom] = useState(100);
  return (
    <figure className="sample-original-image">
      <div className="sample-image-toolbar">
        <figcaption>{image.caption}</figcaption>
        <div role="group" aria-label={`Масштаб: ${image.caption}`}>
          <button type="button" aria-label="Уменьшить изображение" disabled={zoom <= 100} onClick={() => setZoom(value => Math.max(100, value - 100))}>−</button>
          <span aria-live="polite">{zoom}%</span>
          <button type="button" aria-label="Увеличить изображение" disabled={zoom >= 800} onClick={() => setZoom(value => Math.min(800, value + 100))}>+</button>
          <button type="button" onClick={() => setZoom(100)}>По ширине</button>
        </div>
      </div>
      <div className="sample-image-scroll" tabIndex={0} role="region" aria-label={image.alt}>
        <img src={`${import.meta.env.BASE_URL}${image.src}`} alt={image.alt} style={{ width: `${zoom}%`, maxWidth: "none" }} />
      </div>
    </figure>
  );
}

function OriginalTable({ table, title }: { table: NonNullable<Group["table"]>; title: string }) {
  return (
    <div className="sample-original-table">
      {table.note && <p className="sample-table-note">{table.note}</p>}
      <p className="sample-table-hint">Прокрутите таблицу вправо, чтобы увидеть все столбцы →</p>
      <div className="sample-data-scroll" tabIndex={0} role="region" aria-label={title}>
        <table>
          <thead><tr>{table.headers.map((header, index) => <th scope="col" key={index}>{header}</th>)}</tr></thead>
          <tbody>{table.rows.map((row, index) => <tr key={index}>{row.map((value, column) => (
            <td key={column}>{/^https?:\/\//.test(value) ? <span className="sample-table-link" title={value}>↗ {value.includes("docs.google.com") ? "Google Документ" : value.includes("yandex") ? "Яндекс Диск" : "Материал"}</span> : /статус/i.test(table.headers[column]) && value ? <span className="sample-status">{value}</span> : value || <span className="sample-cell-empty">—</span>}</td>
          ))}</tr>)}</tbody>
        </table>
      </div>
    </div>
  );
}

export default function WorkSamples() {
  const [active, setActive] = useState<Sample | null>(null);
  const [groupIndex, setGroupIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const group = active?.groups[groupIndex];

  return (
    <section id="work-samples" className="work-samples py-24 bg-black text-white">
      <div className="container mx-auto px-6">
        <div className="sample-section-heading">
          <div>
            <p className="sample-eyebrow">За каждым курсом — методическая работа</p>
            <h2 className="text-2xl md:text-3xl font-display font-bold uppercase tracking-wider">Примеры работ</h2>
          </div>
          <p className="sample-intro">Как проектирую обучение, работаю с&nbsp;контентом и&nbsp;организую разработку. Фрагменты реальных рабочих материалов.</p>
        </div>
        <Dialog.Root open={active !== null} onOpenChange={open => { if (!open) setActive(null); }}>
          <div className="sample-grid">
            {samples.map(sample => (
              <Dialog.Trigger asChild key={sample.id}>
                <button type="button" className="sample-card" onClick={event => { triggerRef.current = event.currentTarget; setActive(sample); setGroupIndex(0); }}>
                  <Preview sample={sample} />
                  <div className="sample-card-body">
                    <h3>{sample.title}</h3>
                    <p>{sample.description}</p>
                    <span className="sample-card-action">Смотреть пример <ArrowUpRight size={18} /></span>
                  </div>
                </button>
              </Dialog.Trigger>
            ))}
          </div>
          {active && (
            <Dialog.Portal>
              <Dialog.Overlay className="sample-overlay" />
              <Dialog.Content className="sample-dialog" onCloseAutoFocus={event => { event.preventDefault(); triggerRef.current?.focus(); }}>
                <header className="sample-dialog-header">
                  <Dialog.Title>{active.title}</Dialog.Title>
                  <Dialog.Description>{active.description}</Dialog.Description>
                  {active.project && <p className="sample-project">{active.project}</p>}
                  <Dialog.Close className="sample-close" aria-label="Закрыть пример"><X size={22} /></Dialog.Close>
                </header>
                <div className={`sample-dialog-layout ${active.groups.length === 1 ? "sample-dialog-layout--single" : ""}`}>
                  {active.groups.length > 1 && <nav className="sample-group-nav" aria-label="Разделы примера">
                    {active.groups.map((g, index) => (
                      <button type="button" key={g.title} aria-current={groupIndex === index ? "true" : undefined} onClick={() => { setGroupIndex(index); scrollRef.current?.scrollTo({ top: 0 }); }}>
                        {g.title}<span>{g.items?.length ?? ""}</span>
                      </button>
                    ))}
                  </nav>}
                  <div className="sample-reader" ref={scrollRef} key={active.id}>
                    {active.id === "sjm" && group?.stepLabel && (
                      <nav className="sample-journey" aria-label="Этапы пути студента">
                        {active.groups.map((stage, index) => stage.stepLabel && (
                          <button type="button" key={stage.title} aria-current={groupIndex === index ? "step" : undefined} onClick={() => { setGroupIndex(index); scrollRef.current?.scrollTo({ top: 0 }); }}>
                            <span className="sample-journey-number">{active.groups.filter(g => g.stepLabel).indexOf(stage) + 1}</span>
                            <span>{stage.stepLabel}<small>{stage.duration}</small></span>
                          </button>
                        ))}
                      </nav>
                    )}
                    <h4>{group?.title}</h4>
                    {group?.duration && <p className="sample-stage-duration">{group.duration}</p>}
                    {group?.items?.map((item, index) => (
                      <details className="sample-detail" key={`${groupIndex}-${index}`} open={index === 0 || (active.id === "sjm" && group?.stepLabel) ? true : undefined}>
                        <summary>{item.title}<ChevronDown size={18} /></summary>
                        <SampleFields fields={item.fields} />
                      </details>
                    ))}
                    {group?.blocks && <WorkbookBlocks blocks={group.blocks} />}
                    {group?.table && <OriginalTable key={groupIndex} table={group.table} title={group.title} />}
                    {group?.images && <div className="sample-original-images" key={groupIndex}>{group.images.map(img => <ImageViewer key={img.src} image={img} />)}</div>}
                    {group?.slides && <SlidesGallery slides={group.slides} allSlides={active.groups.flatMap(item => item.slides ?? [])} />}
                  </div>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          )}
        </Dialog.Root>
      </div>
    </section>
  );
}
