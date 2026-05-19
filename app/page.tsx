"use client";

import { useEffect, useRef } from "react";

/* ─── Lenis smooth scroll ────────────────────────────────────── */
function useLenis() {
  useEffect(() => {
    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null;
    let rafId: number;
    import("lenis").then(({ default: Lenis }) => {
      lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
      function raf(time: number) { lenis!.raf(time); rafId = requestAnimationFrame(raf); }
      rafId = requestAnimationFrame(raf);
    });
    return () => { cancelAnimationFrame(rafId); lenis?.destroy(); };
  }, []);
}

/* ─── Generic scroll reveal ──────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal, .reveal-big, .reveal-scale");
    const io = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }); },
      { threshold: 0.08 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ─── Bio word-by-word scroll reveal ────────────────────────── */
function useBioReveal() {
  useEffect(() => {
    const words = document.querySelectorAll<HTMLElement>(".bio-word");
    if (!words.length) return;
    function onScroll() {
      const mid = window.innerHeight * 0.62;
      words.forEach((w) => {
        const r = w.getBoundingClientRect();
        if (r.top + r.height / 2 < mid) w.classList.add("lit");
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
}

/* ─── Count-up animation ─────────────────────────────────────── */
function useCountUp() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-count]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          const target = el.dataset.count ?? "0";
          const suffix = el.dataset.suffix ?? "";
          const prefix = el.dataset.prefix ?? "";
          const num = parseFloat(target.replace(/[^0-9.]/g, ""));
          const duration = 1800;
          const start = performance.now();
          function tick(now: number) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            const current = Math.round(eased * num);
            el.textContent = prefix + current.toLocaleString('en-US') + suffix;
            if (progress < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
          io.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ─── Video row scroll reveal ────────────────────────────────── */
function useVideoRowReveal() {
  useEffect(() => {
    const rows = document.querySelectorAll(".video-list-row");
    const io = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }); },
      { threshold: 0.1 }
    );
    rows.forEach((r) => io.observe(r));
    return () => io.disconnect();
  }, []);
}

/* ─── Nav compact — shows name when scrolled past hero ──────── */
function useNavScroll() {
  useEffect(() => {
    const nav = document.querySelector<HTMLElement>(".nav");
    if (!nav) return;
    const check = () => { nav.classList.toggle("scrolled", window.scrollY > 90); };
    window.addEventListener("scroll", check, { passive: true });
    check();
    return () => window.removeEventListener("scroll", check);
  }, []);
}

/* ─── Scroll parallax for a single element ──────────────────── */
function useParallax(selector: string, factor = 0.28) {
  useEffect(() => {
    const el = document.querySelector<HTMLElement>(selector);
    if (!el) return;
    const onScroll = () => {
      if (window.innerWidth <= 640) { el.style.transform = ""; return; }
      const rect = el.getBoundingClientRect();
      const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * factor;
      el.style.transform = `translateY(${offset}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [selector, factor]);
}

/* ─── Nav color — switches to dark on light sections ────────── */
function useNavColor() {
  useEffect(() => {
    const nav = document.querySelector<HTMLElement>(".nav");
    if (!nav) return;
    const check = () => {
      const navH = 70;
      const lightSections = document.querySelectorAll<HTMLElement>(
        ".videos-list-section, .teachings-section, .testimonials-section"
      );
      const onLight = Array.from(lightSections).some((s) => {
        const r = s.getBoundingClientRect();
        return r.top < navH && r.bottom > 0;
      });
      nav.classList.toggle("on-light", onLight);
    };
    window.addEventListener("scroll", check, { passive: true });
    check();
    return () => window.removeEventListener("scroll", check);
  }, []);
}

/* ─── Live clock (Tunisia GMT+1) ─────────────────────────────── */
function useLiveClock(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    function tick() {
      if (!ref.current) return;
      const now = new Date();
      const h = String(now.getHours()).padStart(2, "0");
      const m = String(now.getMinutes()).padStart(2, "0");
      ref.current.textContent = `${h}:${m} (ت.م.غ +1)`;
    }
    tick();
    const id = setInterval(tick, 10000);
    return () => clearInterval(id);
  }, [ref]);
}

/* ═══════════════════════════════════════════════════════════════ */
/*   COMPONENTS                                                    */
/* ═══════════════════════════════════════════════════════════════ */

/* ─── Nav ────────────────────────────────────────────────────── */
function Nav() {
  return (
    <nav className="nav">
      <div className="nav-left">
        <a href="#about"     className="nav-link">عن الأستاذة</a>
        <a href="#teachings" className="nav-link">الدروس</a>
        <a href="#videos"    className="nav-link">التلاوات</a>
      </div>
      <span className="nav-logo">عَفَاف الجَمَل</span>
      <div className="nav-right">
        <a href="#contact"   className="nav-link">تواصل</a>
        <a href="https://www.facebook.com/profile.php?id=61555569658381"  target="_blank" rel="noopener noreferrer" className="nav-link">FB</a>
        <a href="https://www.instagram.com/afefdjmal" target="_blank" rel="noopener noreferrer" className="nav-link">IG</a>
        <a href="https://www.youtube.com/@afefdjmal"  target="_blank" rel="noopener noreferrer" className="nav-link">YT</a>
      </div>
    </nav>
  );
}

/* ─── Hero ───────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="hero">
      <h1 className="hero-first">عَفَاف</h1>

      <div className="hero-photo-wrap">
        <img src="/media/Main Photo of her.jpg" alt="الأستاذة عفاف الجمل" />
      </div>
      <div className="hero-overlay" aria-hidden="true" />

      <span className="hero-year">١٤٤٦ هـ</span>
      <span className="hero-vertical">./ الدروس</span>

      <p className="hero-sub">
        مُقرئة تونسية<br />
        إجازة في القراءات العشر<br />
        بسند متّصل
      </p>

      <h1 className="hero-last">الجَمَل</h1>
    </section>
  );
}

/* ─── Basmala decorative divider ─────────────────────────────── */
function Basmala() {
  return (
    <div className="basmala reveal">
      <span className="basmala-line" aria-hidden="true" />
      <p className="basmala-text">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
      <span className="basmala-line" aria-hidden="true" />
    </div>
  );
}

/* ─── Bio scroll-reveal ──────────────────────────────────────── */
const BIO =
  "كرّست حياتها على خدمة القرآن الكريم — تحمل سنداً متّصلاً يبلغ النبيَّ ﷺ عبر سلسلة متواترة لا تنقطع. بإجازةٍ في القراءات العشر وسندٍ مُتّصل يجسّد قروناً من العلم والرواية، تُعلّم بصبرٍ وحُبٍّ وعمقٍ معرفيٍّ يُحوِّل القلوبَ في شتّى أنحاء العالم.";

function Bio() {
  return (
    <section className="bio-section">
      <h1 className="bio-text" aria-label={BIO}>
        {BIO.split(" ").map((word, i) => (
          <span key={i} className="bio-word">{word}{" "}</span>
        ))}
      </h1>
    </section>
  );
}

/* ─── About ──────────────────────────────────────────────────── */
function About() {
  const clockRef = useRef<HTMLSpanElement>(null);
  useLiveClock(clockRef);

  const socials = [
    { label: "FB",  href: "https://www.facebook.com/profile.php?id=61555569658381" },
    { label: "IG",  href: "https://www.instagram.com/afefdjmal" },
    { label: "YT",  href: "https://www.youtube.com/@afefdjmal" },
    { label: "MSG", href: "https://m.me/afefdjmal" },
  ];

  return (
    <section className="about-section" id="about">
      <div className="about-photo-wrap reveal-scale">
        <img src="/media/Main Photo of her.jpg" alt="الأستاذة عفاف الجمل" />
        <p className="about-photo-label">
          مُقرئة تونسية<br />
          عالمة القراءات العشر
        </p>
      </div>

      <div className="about-content">
        <p className="about-body reveal">
          إحدى العالمات القلائل في العالم اللواتي جمعن بين{" "}
          <strong>الإجازة في القراءات العشر الكبرى</strong> والانفتاح على
          مجتمع رقمي واسع — تحمل العلم الشريف وتوصله إلى آلاف القلوب
          عبر منصات التواصل الاجتماعي كل يوم.
        </p>
        <p className="about-body reveal d1">
          تقدّم سلاسل تعليمية وروحية متنوعة: <strong>تحفيظ القرآن للأطفال</strong>{" "}
          حرفاً حرفاً، وشرح <strong>الأربعين النووية</strong> والشمائل المحمدية،
          ودعاء عصر الجمعة الأسبوعي، وكلمات في التوبة والصبر والشكر، وسلسلة{" "}
          <strong>«أُحِبُّكَ يا الله»</strong> التي تجعل من المحبة عمود العبادة.
        </p>
        <p className="about-body reveal d2">
          رسالتها واضحة: الدين يُعاش بالمحبة —{" "}
          <span className="gold">#الدين_محبة</span>. من هذه القناعة تصدح
          تلاواتها بروايات القرآن المختلفة، وتنطلق دعواتها لسلامة المسلمين
          في كل أرض، وتتصاعد كلماتها لتقريب القلب من الله.
        </p>

        <p className="about-location reveal d2">تقيم في صفاقس، تونس 🇹🇳</p>
        <p className="about-hashtag reveal d2">#الدين_محبة</p>
        <p className="about-body reveal d2" style={{ fontSize: "17px", fontWeight: 700, color: "var(--gold)" }}>
          <span ref={clockRef}>00:00 (ت.م.غ +1)</span>
        </p>

        <div className="about-socials reveal d3">
          {socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
               className="about-social-icon">{s.label}</a>
          ))}
        </div>

        <a href="https://www.facebook.com/profile.php?id=61555569658381" target="_blank"
           rel="noopener noreferrer" className="about-follow reveal d3">
          تابعوها ↗
        </a>
      </div>
    </section>
  );
}

/* ─── Featured Video ─────────────────────────────────────────── */
function FeaturedVideo() {
  return (
    <section className="featured-section">
      <p className="section-label reveal">حضور بارز</p>
      <div className="featured-card reveal-scale d1">
        <video src="/media/Video Interview with Al Jazeera.mp4" muted loop autoPlay playsInline />
        <div className="featured-card-overlay" />
        <div className="featured-card-meta">
          <p className="featured-card-tag">الجزيرة مباشر</p>
          <h3 className="featured-card-title">
            إجازة في القراءات العشر<br />بسند متّصل
          </h3>
        </div>
      </div>
      <div className="featured-watch-wrap reveal d2">
        <a
          href="https://www.youtube.com/watch?v=0U7uUiVWL6s"
          target="_blank"
          rel="noopener noreferrer"
          className="featured-watch-btn"
        >
          مشاهدة المقابلة كاملة ↗
        </a>
      </div>
    </section>
  );
}

/* ─── Marquee (platforms) ────────────────────────────────────── */
const PLATFORMS = [
  "فيسبوك", "إنستغرام", "يوتيوب", "ماسنجر",
  "الجزيرة", "قالون", "ورش", "خلف", "صفاقس",
];

function Marquee() {
  const items = [...PLATFORMS, ...PLATFORMS];
  return (
    <div className="marquee-section reveal">
      <div className="marquee-track">
        {items.map((name, i) => (
          <span key={i} className="marquee-item">{name}</span>
        ))}
      </div>
    </div>
  );
}

/* ─── Selected Videos ────────────────────────────────────────── */
const VIDEO_ROWS = [
  {
    client: "سلسلة التلاوات",
    title: "تلاوة قرآنية — رواية ورش عن نافع",
    desc: "تلاوات يومية برواية ورش المعتمدة، تُحيي تقليد القراءة القرآنية الأصيلة.",
    src: "/media/Video Exp1.mp4",
    crop: "center 34%",
    href: "https://www.facebook.com/profile.php?id=61555569658381",
  },
  {
    client: "التوسل والدعاء",
    title: "دعاء عصر الجمعة",
    desc: "دعاء أسبوعي يُرسله قلبٌ متعلق بالله في أعز ساعات الجمعة وأطيبها.",
    src: "/media/dua-asr-jumua.mp4",
    crop: "center 52%",
    href: "https://www.facebook.com/profile.php?id=61555569658381",
  },
  {
    client: "سلسلة الصلاة على النبي",
    title: "صلّوا عليه وسلّموا تسليمًا",
    desc: "تلاوة وتأمل في فضل الصلاة على النبي ﷺ وأثرها في تزكية النفس وتنوير القلب.",
    src: "/media/salawat.mp4",
    crop: "center 28%",
    href: "https://www.facebook.com/profile.php?id=61555569658381",
  },
];

function SelectedVideos() {
  return (
    <section className="videos-list-section" id="videos">
      <p className="videos-list-label reveal">تلاوات مختارة</p>
      {VIDEO_ROWS.map((v, i) => (
        <a key={i} href={v.href} target="_blank" rel="noopener noreferrer"
           className="video-list-row" style={{ transitionDelay: `${i * 0.08}s` }}>
          <div className="video-row-inner">
            <div className="video-row-left">
              <p className="video-row-client">{v.client}</p>
              <p className="video-row-title">{v.title}</p>
              <p className="video-row-desc">{v.desc}</p>
            </div>
            <div className="video-row-thumb">
              <video src={v.src} muted loop autoPlay playsInline style={{ objectPosition: v.crop }} />
            </div>
            <span className="video-row-arrow">↗</span>
          </div>
        </a>
      ))}
    </section>
  );
}

/* ─── Teachings ──────────────────────────────────────────────── */
const TEACHINGS = [
  {
    name: "تلاوة القرآن الكريم",
    bullets: ["قالون عن نافع", "ورش عن نافع", "السوسي عن أبي عمرو", "خلف عن حمزة"],
  },
  {
    name: "أحكام التجويد",
    bullets: ["مخارج الحروف", "صفات الحروف", "أحكام المدّ", "الوقف والابتداء"],
  },
  {
    name: "تحفيظ القرآن للأطفال",
    bullets: ["التعرّف على الحروف", "القراءة الأساسية", "منهج الحفظ", "الممارسة اليومية"],
  },
  {
    name: "الحديث والتزكية",
    bullets: ["الأربعون النووية", "الشمائل المحمدية", "الاستغفار والتوبة", "تزكية النفس"],
  },
];

function Teachings() {
  return (
    <section className="teachings-section" id="teachings">
      <p className="section-label teachings-section reveal">مجالات التدريس</p>
      <div className="teachings-grid">
        {TEACHINGS.map((t, i) => (
          <div key={i} className={`teaching-row reveal d${i % 3}`}>
            <p className="teaching-name">{t.name}</p>
            <div className="teaching-bullets">
              {t.bullets.map((b, j) => (
                <p key={j} className="teaching-bullet">— {b}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
      <h3 className="teachings-quote reveal-big">
        &ldquo;القرآن ليس نصًّا يُقرأ فحسب — بل هو نورٌ يُحمل في القلب،
        يُنتقل من روحٍ إلى روحٍ عبر سلسلة متّصلة من الرحمة لا تنقطع.&rdquo;
      </h3>
    </section>
  );
}

/* ─── Quran Divider ──────────────────────────────────────────── */
function QuranDivider() {
  return (
    <div className="quran-divider">
      <img src="/media/media1(Quran picture).jpg" alt="القرآن الكريم" />
      <div className="quran-divider-overlay" />
      <div className="quran-divider-caption">
        <p className="reveal">&ldquo;اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ&rdquo;</p>
        <span className="reveal d1">سورة العلق · ٩٦:١</span>
      </div>
    </div>
  );
}

/* ─── Metrics ────────────────────────────────────────────────── */
function Metrics() {
  return (
    <section className="metrics-section">
      <p className="metrics-label reveal">بالأرقام</p>
      <div className="metrics-grid">
        <div className="metric-item reveal">
          <p className="metric-value" data-count="53" data-suffix="K+">0K+</p>
          <p className="metric-label">متابع عبر المنصات</p>
        </div>
        <div className="metric-item reveal d1">
          <p className="metric-value" data-count="10">0</p>
          <p className="metric-label">قراءة قرآنية كبرى (القراءات العشر)</p>
        </div>
        <div className="metric-item reveal d1">
          <p className="metric-value" data-count="1">0</p>
          <p className="metric-label">سند متّصل إلى النبي ﷺ</p>
        </div>
        <div className="metric-item reveal d2">
          <p className="metric-value" data-count="100" data-suffix="%">0%</p>
          <p className="metric-label">مُكرَّسة لمحبة القرآن</p>
        </div>
      </div>
    </section>
  );
}

/* ─── Testimonials ───────────────────────────────────────────── */
const TESTIMONIALS = [
  {
    quote: "تلاوتها لرواية ورش أوقفتني في مكاني. تشعر من خلال صوتها بالسند الواصل إلى النبي ﷺ.",
    author: "الجزيرة مباشر",
  },
  {
    quote: "الأستاذة عفاف تُعلّم بصبرٍ ومحبة لا توصفان. أطفالي يتلون القرآن بتجويدٍ صحيح كل صباح.",
    author: "عضو في المجتمع",
  },
  {
    quote: "كلماتها اليومية غيّرت طريقتي في التعبد. ما كان القرآن يومًا بهذه القرب من قلبي.",
    author: "متابعة، المغرب",
  },
  {
    quote: "لم أتخيّل يومًا أن أجد مُجازة تتشارك علمها بسخاءٍ كهذا مع الأمة عبر الإنترنت.",
    author: "طالبة، المملكة المتحدة",
  },
  {
    quote: "طريقتها في شرح القراءات العشر تُدرك بها مدى سعة التراث القرآني وعظيم جماله.",
    author: "طالبة، كندا",
  },
  {
    quote: "كل مقطع تنشره صدقةٌ جارية — نقيٌّ، مُؤسَّسٌ على العلم، مليءٌ بحب الله.",
    author: "متابعة، مصر",
  },
];

function Testimonials() {
  const doubled = [...TESTIMONIALS, ...TESTIMONIALS];
  return (
    <section className="testimonials-section" id="contact">
      <p className="testimonials-label reveal">أصوات المجتمع</p>
      <div className="testimonials-ticker-wrap">
        <div className="testimonials-ticker-track">
          {doubled.map((t, i) => (
            <div key={i} className="testimonial-tile">
              <p className="testimonial-quote">&ldquo;{t.quote}&rdquo;</p>
              <p className="testimonial-author">— {t.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ─────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="footer">
      <p className="footer-name reveal">عَفَاف الجَمَل</p>
      <div className="footer-inner reveal d1">
        <ul className="footer-links">
          <li><a href="#about">عن الأستاذة</a></li>
          <li><a href="#teachings">الدروس</a></li>
          <li><a href="#videos">التلاوات</a></li>
          <li><a href="#contact">المجتمع</a></li>
        </ul>
        <div className="footer-socials">
          {[
            { l: "FB",  h: "https://www.facebook.com/profile.php?id=61555569658381" },
            { l: "IG",  h: "https://www.instagram.com/afefdjmal" },
            { l: "YT",  h: "https://www.youtube.com/@afefdjmal" },
            { l: "MSG", h: "https://m.me/afefdjmal" },
          ].map((s) => (
            <a key={s.l} href={s.h} target="_blank" rel="noopener noreferrer"
               className="footer-social">{s.l}</a>
          ))}
        </div>
      </div>
      <div className="footer-bottom">
        <p className="footer-copy">© {new Date().getFullYear()} الأستاذة عفاف الجمل. جميع الحقوق محفوظة.</p>
        <p className="footer-hashtag">#الدين_محبة</p>
      </div>
    </footer>
  );
}

/* ─── Page ───────────────────────────────────────────────────── */
export default function Home() {
  useLenis();
  useReveal();
  useBioReveal();
  useCountUp();
  useVideoRowReveal();
  useNavColor();
  useNavScroll();
  useParallax(".quran-divider > img", 0.28);

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Basmala />
        <Bio />
        <About />
        <FeaturedVideo />
        <Marquee />
        <SelectedVideos />
        <Teachings />
        <QuranDivider />
        <Metrics />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
