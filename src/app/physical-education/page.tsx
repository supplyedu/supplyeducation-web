"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { UserCheck, Zap, Wallet, Smartphone, ChevronRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const NAVY = "#1B2A4A";
const ACCENT = "#7A9EC7";
const BLUE = "#2563EB";

const targets = [
  {
    icon: "🏋️",
    title: "취업 준비생",
    desc: "스포츠센터·학교·공공기관 체육 관련 직종 취업을 원하시는 분",
  },
  {
    icon: "🥇",
    title: "선수 / 코치 출신",
    desc: "현장 경력은 있지만 학위가 없어 경력 전환에 어려움을 느끼시는 분",
  },
  {
    icon: "📋",
    title: "자격증 취득 희망자",
    desc: "생활스포츠지도사·건강운동관리사 등 체육 지도자 자격 요건을 충족하려는 분",
  },
  {
    icon: "🎓",
    title: "편입 / 대학원 준비자",
    desc: "학사 학위를 기반으로 편입 또는 대학원 진학을 계획하고 계신 분",
  },
];

const courses = [
  { category: "전공필수", credits: 30, examples: "스포츠교육학, 운동생리학, 스포츠심리학" },
  { category: "전공선택", credits: 60, examples: "스포츠마케팅, 운동처방론, 스포츠사회학" },
  { category: "교양", credits: 30, examples: "건강과 생활, 스포츠와 문화, 레크리에이션" },
  { category: "일반선택", credits: 20, examples: "타 전공 및 자유 선택 과목" },
];

const steps = [
  { num: "01", title: "무료 상담", desc: "전담 컨설턴트와 1:1 온라인 상담으로 현재 상황을 분석합니다." },
  { num: "02", title: "학습 계획 수립", desc: "목표 학위·자격증에 맞춰 최적의 수강 로드맵을 설계합니다." },
  { num: "03", title: "온라인 수강", desc: "시간·장소 제약 없이 LMS에서 강의를 수강하고 학점을 취득합니다." },
  { num: "04", title: "학위 신청", desc: "누적 학점 충족 후 국가평생교육진흥원에 학위 수여를 신청합니다." },
  { num: "05", title: "학위 취득", desc: "정식 체육학 학사 학위를 취득하고 새로운 커리어를 시작합니다." },
];

const differentiators: { Icon: LucideIcon; title: string; desc: string }[] = [
  {
    Icon: UserCheck,
    title: "1:1 전담 담당자",
    desc: "입학부터 학위 취득까지 동일한 담당자가 끝까지 책임 관리합니다.",
  },
  {
    Icon: Zap,
    title: "최단 1년 취득",
    desc: "최적화된 수강 플랜으로 빠르면 1년 만에 학사 학위를 취득할 수 있습니다.",
  },
  {
    Icon: Wallet,
    title: "합리적인 비용",
    desc: "일반 대학 등록금 대비 최대 80% 절감된 비용으로 학위를 취득하세요.",
  },
  {
    Icon: Smartphone,
    title: "100% 온라인",
    desc: "출퇴근·육아 중에도 스마트폰·PC로 언제 어디서나 수강 가능합니다.",
  },
];

const reviews = [
  {
    name: "김지훈",
    role: "스포츠센터 트레이너 → 체육교사 임용",
    content:
      "현장에서 10년 일했지만 학위가 없어 벽을 느꼈어요. 서플라이에듀 덕분에 1년 반 만에 학사를 취득하고 임용에 도전할 수 있었습니다.",
  },
  {
    name: "박수연",
    role: "육아 중 직장인 → 건강운동관리사 자격 취득",
    content:
      "아이 재우고 밤에 한두 강의씩 들었어요. 담당자가 제 속도에 맞게 플랜을 계속 수정해줘서 포기하지 않을 수 있었습니다.",
  },
  {
    name: "이준서",
    role: "전직 축구선수 → 스포츠 에이전트",
    content:
      "선수 경력을 학점으로 인정받을 수 있다는 걸 상담받고 나서 알았어요. 예상보다 훨씬 빠르게 학위를 받았습니다.",
  },
];

const faqs = [
  {
    q: "학점은행제가 정식 학위인가요?",
    a: "네, 학점은행제는 「학점인정 등에 관한 법률」에 의거한 국가 공인 제도입니다. 국가평생교육진흥원 명의의 학사 학위가 수여되며, 일반 대학 졸업장과 동등한 효력을 가집니다.",
  },
  {
    q: "학위 취득까지 얼마나 걸리나요?",
    a: "최소 1년(2학기)부터 가능합니다. 이전에 취득한 학점·자격증·경력을 인정받으면 기간을 더 단축할 수 있습니다. 평균적으로는 1.5~2년 소요됩니다.",
  },
  {
    q: "직장을 다니면서 병행할 수 있나요?",
    a: "100% 온라인으로 진행되므로 직장, 육아, 군 복무 중에도 자신의 페이스에 맞게 수강할 수 있습니다. 담당자가 생활 패턴에 맞는 수강 일정을 함께 설계해 드립니다.",
  },
  {
    q: "이미 다른 대학을 다닌 경우 학점이 인정되나요?",
    a: "대학에서 취득한 학점은 최대 140학점까지 인정받을 수 있습니다. 자격증, 시간제 수업 학점 등도 인정 범위에 포함됩니다. 정확한 인정 범위는 무료 상담 시 확인해 드립니다.",
  },
  {
    q: "수강료는 어느 정도 드나요?",
    a: "과목·학점 수에 따라 다르며, 일반 대학 대비 50~80% 저렴합니다. 분할 납부도 가능하니 상담 시 자세한 비용 안내를 받아보세요.",
  },
];

/* ─── 네비게이션 바 ─────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav
      className="fixed inset-x-0 top-0 z-50 px-4 transition-colors duration-300"
      style={{ background: scrolled ? NAVY : "transparent" }}
    >
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between">
        <Link href="/physical-education" className="text-lg font-bold text-white">
          서플라이에듀
        </Link>
        <Link
          href="/apply"
          className="rounded-full px-5 py-2 text-sm font-bold text-white transition-opacity hover:opacity-85"
          style={{ background: BLUE }}
        >
          상담 신청하기
        </Link>
      </div>
    </nav>
  );
}

/* ─── 스크롤 애니메이션 컴포넌트 ──────────────────────────────── */
function FadeUp({
  children,
  delay = 0,
  className = "",
  threshold = 0.2,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  threshold?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    // 페이지 렌더링 후 관찰 시작 (SSR 하이드레이션 깜빡임 방지)
    const timer = setTimeout(() => observer.observe(el), 50);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(30px)",
        transition: `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── 오도미터 숫자 애니메이션 ──────────────────────────────────── */
// 각 자릿수를 세로 열(0~9 × 3벌)로 구성하고 translateY로 목표 위치까지 스크롤
// 열 구조: index 0~9 (1벌) | 10~19 (2벌, 시작 위치) | 20~29 (3벌, 목표 위치)
function OdometerDigit({ digit, duration, trigger }: {
  digit: number;
  duration: number;
  trigger: boolean;
}) {
  const stripRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip || !trigger) return;
    strip.style.transition = "none";
    strip.style.transform = "translateY(-10em)";
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        strip.style.transition = `transform ${duration}ms cubic-bezier(0.23, 1, 0.32, 1)`;
        strip.style.transform = `translateY(-${20 + digit}em)`;
      });
    });
  }, [trigger]);

  return (
    <span style={{ display: "inline-block", height: "1em", lineHeight: "1em", overflow: "hidden", verticalAlign: "top" }}>
      <span ref={stripRef} style={{ display: "block", transform: "translateY(-10em)" }}>
        {Array.from({ length: 30 }, (_, i) => i % 10).map((n, i) => (
          <span key={i} style={{ display: "block", height: "1em", lineHeight: "1em" }}>{n}</span>
        ))}
      </span>
    </span>
  );
}

function SlotStat({ final, label, stopAt }: { final: string; label: string; stopAt: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        setTrigger(true);
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const parts = final.split("").map((c) =>
    /\d/.test(c)
      ? { type: "digit" as const, value: parseInt(c, 10) }
      : { type: "fixed" as const, value: c }
  );

  return (
    <div ref={ref} className="px-4 first:pl-0">
      <p className="text-3xl font-extrabold md:text-4xl" style={{ lineHeight: 1.2 }}>
        {parts.map((part, i) =>
          part.type === "digit" ? (
            <OdometerDigit key={i} digit={part.value} duration={stopAt} trigger={trigger} />
          ) : (
            <span key={i} style={{ display: "inline-block", verticalAlign: "top", lineHeight: "1em" }}>
              {part.value}
            </span>
          )
        )}
      </p>
      <p className="mt-1.5 text-sm text-white/60">{label}</p>
    </div>
  );
}

/* ─── 페이지 컴포넌트 ──────────────────────────────────────────── */
export default function PhysicalEducationPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  function scrollToForm() {
    document.getElementById("consult-form")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="font-sans text-gray-800 antialiased">
      <Navbar />

      {/* ─── HERO (애니메이션 없음 — 로드 즉시 표시) ─────────────── */}
      <section className="relative overflow-hidden px-4 pb-24 pt-32 text-white md:pb-36 md:pt-40">
        {/* 배경 이미지 */}
        <Image
          src="/images/hero-bg.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-right md:object-center"
          priority
        />

        {/* 그라데이션 오버레이 — 모바일: 균일 80% */}
        <div
          className="absolute inset-0 md:hidden"
          style={{ background: "rgba(27,42,74,0.82)" }}
        />
        {/* 그라데이션 오버레이 — 데스크탑: 왼쪽 90% → 오른쪽 45% */}
        <div
          className="absolute inset-0 hidden md:block"
          style={{ background: "linear-gradient(to right, rgba(27,42,74,0.90) 0%, rgba(27,42,74,0.90) 40%, rgba(27,42,74,0) 68%)" }}
        />

        <svg
          className="pointer-events-none absolute -right-20 -top-20"
          width="480" height="480" viewBox="0 0 480 480" fill="none" aria-hidden="true"
          style={{ opacity: 0.22 }}
        >
          {[220, 178, 136, 94, 52].map((r) => (
            <circle key={r} cx="240" cy="240" r={r} stroke={ACCENT} strokeWidth="1.5" />
          ))}
          <line x1="240" y1="0" x2="240" y2="480" stroke={ACCENT} strokeWidth="0.75" strokeDasharray="4 8" />
          <line x1="0" y1="240" x2="480" y2="240" stroke={ACCENT} strokeWidth="0.75" strokeDasharray="4 8" />
        </svg>
        <svg
          className="pointer-events-none absolute -bottom-6 -left-6"
          width="300" height="300" viewBox="0 0 300 300" fill="none" aria-hidden="true"
          style={{ opacity: 0.14 }}
        >
          <defs>
            <pattern id="diag" x="0" y="0" width="18" height="18" patternUnits="userSpaceOnUse">
              <path d="M0 18L18 0" stroke={ACCENT} strokeWidth="1.5" />
            </pattern>
          </defs>
          <rect width="300" height="300" fill="url(#diag)" />
        </svg>

        <div className="relative mx-auto max-w-5xl">
          <div className="max-w-[55%] min-w-72">
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
              체육학 학사 학위,<br />
              <span style={{ color: BLUE }}>온라인으로</span> 취득하세요
            </h1>
            <p className="mt-7 text-lg leading-relaxed text-white/80 md:text-xl">
              빠르면 <strong className="text-white">1년</strong>, 직장·육아 중에도 가능한{" "}
              <strong className="font-bold text-white">100% 온라인 체육학 학위 과정</strong>.<br />
              전담 컨설턴트가 학위 취득까지 1:1로 함께합니다.
            </p>
            <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row">
              <Link
                href="/apply"
                className="rounded-full px-8 py-4 text-base font-bold transition-transform hover:scale-105 active:scale-95"
                style={{ background: BLUE, color: "#fff" }}
              >
                무료 상담 신청하기 →
              </Link>
              <a
                href="#process"
                className="rounded-full border border-white/40 px-8 py-4 text-base font-medium text-white transition-colors hover:bg-white/10"
              >
                과정 살펴보기
              </a>
            </div>
            <div className="mt-16 grid grid-cols-3 divide-x divide-white/20 border-t border-white/20 pt-10">
              <SlotStat final="8,000+" label="누적 수강생" stopAt={800} />
              <SlotStat final="96%" label="학위 취득률" stopAt={1100} />
              <SlotStat final="1년~" label="최단 취득 기간" stopAt={1400} />
            </div>
          </div>
        </div>
      </section>

      {/* ─── TARGET CARDS ─────────────────────────────────────────────── */}
      <section className="bg-gray-50 px-4 py-24">
        <div className="mx-auto max-w-5xl">
          <FadeUp>
            <h2 className="text-center text-3xl font-extrabold tracking-tight md:text-4xl" style={{ color: NAVY }}>
              이런 분들께 추천드립니다
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-center text-gray-500">
              체육학 학점은행제는 다양한 배경과 목표를 가진 분들을 위한 유연한 제도입니다.
            </p>
          </FadeUp>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {targets.map((t, i) => (
              <FadeUp key={t.title} delay={i * 100} threshold={0.1}>
                <div
                  className="rounded-2xl border-2 border-gray-200 bg-white p-6 shadow-sm"
                  style={{
                    transition: "transform 300ms ease, box-shadow 300ms ease, border-color 300ms ease",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.transform = "translateY(-8px) scale(1.03)";
                    el.style.boxShadow = "0 20px 40px rgba(27,42,74,0.18)";
                    el.style.borderColor = ACCENT;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.transform = "";
                    el.style.boxShadow = "";
                    el.style.borderColor = "";
                  }}
                >
                  <div className="mb-4 text-4xl">{t.icon}</div>
                  <h3 className="mb-2 text-lg font-bold" style={{ color: NAVY }}>{t.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-500">{t.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 과정안내 ─────────────────────────────────────────────────── */}
      <section className="px-4 py-24">
        <div className="mx-auto max-w-5xl">
          <FadeUp>
            <h2 className="text-center text-3xl font-extrabold tracking-tight md:text-4xl" style={{ color: NAVY }}>
              체육학 과정 안내
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-center text-gray-500">
              총 140학점을 취득하면 체육학 학사 학위를 받을 수 있습니다.
            </p>
          </FadeUp>

          <FadeUp delay={150}>
            <div className="mt-12 overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ background: NAVY }} className="text-white">
                    <th className="px-6 py-4 text-left font-semibold">구분</th>
                    <th className="px-6 py-4 text-center font-semibold">이수 학점</th>
                    <th className="px-6 py-4 text-left font-semibold hidden sm:table-cell">대표 과목</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((c, i) => (
                    <tr key={c.category} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-6 py-4 font-medium" style={{ color: NAVY }}>{c.category}</td>
                      <td className="px-6 py-4 text-center font-bold text-blue-600">{c.credits}학점</td>
                      <td className="px-6 py-4 text-gray-500 hidden sm:table-cell">{c.examples}</td>
                    </tr>
                  ))}
                  <tr className="border-t-2 border-gray-200" style={{ background: "#EEF2FF" }}>
                    <td className="px-6 py-4 font-extrabold" style={{ color: NAVY }}>합계</td>
                    <td className="px-6 py-4 text-center font-extrabold text-blue-700">140학점</td>
                    <td className="hidden sm:table-cell" />
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { label: "수강 방식", value: "100% 온라인 (LMS)" },
                { label: "수강 기간", value: "학기 단위 (학기당 15주)" },
                { label: "학위 수여 기관", value: "국가평생교육진흥원" },
              ].map((item) => (
                <div key={item.label} className="rounded-xl border border-blue-100 bg-blue-50 px-5 py-6 text-center">
                  <p className="text-xs font-semibold uppercase tracking-wide text-blue-400">{item.label}</p>
                  <p className="mt-2 text-base font-bold" style={{ color: NAVY }}>{item.value}</p>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ─── PROCESS ──────────────────────────────────────────────────── */}
      <section id="process" className="px-4 py-24" style={{ background: NAVY }}>
        <div className="mx-auto max-w-5xl">
          <FadeUp>
            <h2 className="text-center text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              학위 취득 프로세스
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-center text-white/60">
              5단계만 따라오시면 체육학 학사 학위를 취득할 수 있습니다.
            </p>
          </FadeUp>

          {/* 연결선 + 스텝을 하나의 블록으로 묶어 함께 등장 */}
          <FadeUp delay={150}>
            <div className="relative mt-14">
              <div
                className="pointer-events-none absolute hidden sm:block"
                style={{
                  top: "1.375rem",
                  left: "10%",
                  right: "10%",
                  height: "2px",
                  background: `linear-gradient(to right, transparent, ${ACCENT}55, ${ACCENT}55, transparent)`,
                }}
              />
              <div className="grid gap-y-10 sm:grid-cols-5 sm:gap-y-0">
                {steps.map((s, i) => (
                  <div key={s.num} className="relative text-center">
                    {i < steps.length - 1 && (
                      <div
                        className="absolute left-1/2 sm:hidden"
                        style={{
                          top: "2.875rem",
                          bottom: "-2.5rem",
                          width: "2px",
                          transform: "translateX(-50%)",
                          background: `linear-gradient(to bottom, ${ACCENT}80, ${ACCENT}20)`,
                        }}
                      />
                    )}
                    {i < steps.length - 1 && (
                      <div
                        className="pointer-events-none absolute hidden sm:flex items-center justify-center"
                        style={{
                          top: "0.875rem",
                          left: "calc(50% + 1.75rem)",
                          width: "calc(100% - 3.5rem)",
                        }}
                      >
                        <ChevronRight size={20} style={{ color: ACCENT, opacity: 0.8 }} strokeWidth={2.5} />
                      </div>
                    )}
                    <div
                      className="relative z-10 mx-auto flex h-11 w-11 items-center justify-center rounded-full text-sm font-extrabold"
                      style={{ background: BLUE, color: "#fff", boxShadow: `0 0 0 5px ${NAVY}` }}
                    >
                      {s.num}
                    </div>
                    <h3 className="mt-4 text-sm font-bold text-white">{s.title}</h3>
                    <p className="mt-2 px-2 text-xs leading-relaxed text-white/60">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={350}>
            <div className="mt-14 text-center">
              <button
                onClick={scrollToForm}
                className="rounded-full px-8 py-4 text-sm font-bold transition-transform hover:scale-105"
                style={{ background: BLUE, color: "#fff" }}
              >
                지금 바로 무료 상담 시작하기 →
              </button>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ─── 차별점 ───────────────────────────────────────────────────── */}
      <section className="bg-gray-50 px-4 py-24">
        <div className="mx-auto max-w-5xl">
          <FadeUp>
            <h2 className="text-center text-3xl font-extrabold tracking-tight md:text-4xl" style={{ color: NAVY }}>
              서플라이에듀의 차별점
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-center text-gray-500">
              단순한 온라인 강의 플랫폼을 넘어, 학위 취득 완료까지 책임집니다.
            </p>
          </FadeUp>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {differentiators.map(({ Icon, title, desc }, i) => (
              <FadeUp key={title} delay={i * 100} threshold={0.1}>
                <div
                  className="rounded-2xl bg-white p-7 text-center shadow-sm ring-1 ring-gray-100"
                  style={{ transition: "transform 300ms ease, box-shadow 300ms ease" }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.transform = "translateY(-8px)";
                    el.style.boxShadow = "0 20px 40px rgba(27,42,74,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.transform = "";
                    el.style.boxShadow = "";
                  }}
                >
                  <div
                    className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl"
                    style={{ background: `${ACCENT}26` }}
                  >
                    <Icon size={30} style={{ color: ACCENT }} strokeWidth={1.75} />
                  </div>
                  <h3 className="mb-2 font-bold" style={{ color: NAVY }}>{title}</h3>
                  <p className="text-sm leading-relaxed text-gray-500">{desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 후기 ─────────────────────────────────────────────────────── */}
      <section className="px-4 py-24">
        <div className="mx-auto max-w-5xl">
          <FadeUp>
            <h2 className="text-center text-3xl font-extrabold tracking-tight md:text-4xl" style={{ color: NAVY }}>
              수강생 후기
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-center text-gray-500">
              실제로 학위를 취득한 수강생들의 솔직한 이야기입니다.
            </p>
          </FadeUp>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {reviews.map((r, i) => (
              <FadeUp key={r.name} delay={i * 120} threshold={0.1}>
                <div className="flex flex-col rounded-2xl border border-gray-100 bg-white p-7 shadow-sm">
                  <div className="mb-4 flex gap-0.5 text-yellow-400">
                    {"★★★★★".split("").map((star, j) => <span key={j}>{star}</span>)}
                  </div>
                  <p className="flex-1 text-sm leading-relaxed text-gray-600">"{r.content}"</p>
                  <div className="mt-5 border-t border-gray-100 pt-4">
                    <p className="font-bold" style={{ color: NAVY }}>{r.name}</p>
                    <p className="text-xs text-gray-400">{r.role}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────────────────── */}
      <section className="px-4 py-24" style={{ background: "#F8FAFC" }}>
        <div className="mx-auto max-w-3xl">
          <FadeUp>
            <h2 className="text-center text-3xl font-extrabold tracking-tight md:text-4xl" style={{ color: NAVY }}>
              자주 묻는 질문
            </h2>
          </FadeUp>

          <div className="mt-10 space-y-3">
            {faqs.map((faq, i) => (
              <FadeUp key={i} delay={i * 80} threshold={0.1}>
                <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-gray-50"
                  >
                    <span className="pr-4 font-semibold" style={{ color: NAVY }}>{faq.q}</span>
                    <span
                      className="shrink-0 text-lg font-bold"
                      style={{
                        color: NAVY,
                        display: "inline-block",
                        transition: "transform 200ms ease",
                        transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)",
                      }}
                    >
                      +
                    </span>
                  </button>
                  {openFaq === i && (
                    <div className="border-t border-gray-100 px-6 py-5">
                      <p className="text-sm leading-relaxed text-gray-600">{faq.a}</p>
                    </div>
                  )}
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 상담폼 ───────────────────────────────────────────────────── */}
      <section id="consult-form" className="px-4 py-24" style={{ background: NAVY }}>
        <div className="mx-auto max-w-xl">
          <FadeUp>
            <h2 className="text-center text-3xl font-extrabold text-white md:text-4xl">
              무료 상담 신청
            </h2>
            <p className="mt-4 text-center text-white/60">
              양식을 작성하시면 24시간 이내에 담당자가 연락드립니다.
            </p>
          </FadeUp>

          <FadeUp delay={200}>
            {submitted ? (
              <div className="mt-10 rounded-2xl bg-white/10 p-10 text-center">
                <div className="mb-4 text-5xl">✅</div>
                <h3 className="text-xl font-bold text-white">상담 신청이 완료되었습니다!</h3>
                <p className="mt-2 text-white/60">빠른 시일 내에 담당자가 연락드리겠습니다. 감사합니다.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-10 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-white/70">이름 *</label>
                    <input
                      type="text" name="name" required value={form.name} onChange={handleChange}
                      placeholder="홍길동"
                      className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/40 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-white/70">연락처 *</label>
                    <input
                      type="tel" name="phone" required value={form.phone} onChange={handleChange}
                      placeholder="010-0000-0000"
                      className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/40 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-white/70">이메일</label>
                  <input
                    type="email" name="email" value={form.email} onChange={handleChange}
                    placeholder="example@email.com"
                    className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/40 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-white/70">문의 내용</label>
                  <textarea
                    name="message" rows={4} value={form.message} onChange={handleChange}
                    placeholder="현재 상황이나 궁금하신 점을 자유롭게 작성해 주세요."
                    className="w-full resize-none rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/40 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30"
                  />
                </div>
                <p className="text-xs text-white/40">제출 시 개인정보 수집·이용에 동의하는 것으로 간주합니다.</p>
                <button
                  type="submit"
                  className="w-full rounded-xl py-4 text-sm font-bold transition-transform hover:scale-[1.02] active:scale-95"
                  style={{ background: BLUE, color: "#fff" }}
                >
                  무료 상담 신청하기
                </button>
              </form>
            )}
          </FadeUp>
        </div>
      </section>

      {/* ─── FOOTER ───────────────────────────────────────────────────── */}
      <footer className="px-4 py-10 text-center" style={{ background: "#111827" }}>
        <p className="text-sm font-bold text-white">서플라이에듀케이션</p>
        <p className="mt-2 text-xs text-gray-500">
          사업자등록번호: 000-00-00000 &nbsp;|&nbsp; 대표: 홍길동 &nbsp;|&nbsp; 통신판매업신고: 제0000-서울-0000호
        </p>
        <p className="mt-1 text-xs text-gray-500">
          서울특별시 강남구 테헤란로 00길 00, 000호 &nbsp;|&nbsp; 고객센터: 02-0000-0000 &nbsp;|&nbsp; admin@supplyeducation.co.kr
        </p>
        <p className="mt-4 text-xs text-gray-600">© 2026 서플라이에듀케이션. All rights reserved.</p>
      </footer>

    </div>
  );
}
