"use client";

import { useState } from "react";

const NAVY = "#1B2A4A";

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

const differentiators = [
  {
    icon: "👤",
    title: "1:1 전담 담당자",
    desc: "입학부터 학위 취득까지 동일한 담당자가 끝까지 책임 관리합니다.",
  },
  {
    icon: "⚡",
    title: "최단 1년 취득",
    desc: "최적화된 수강 플랜으로 빠르면 1년 만에 학사 학위를 취득할 수 있습니다.",
  },
  {
    icon: "💰",
    title: "합리적인 비용",
    desc: "일반 대학 등록금 대비 최대 80% 절감된 비용으로 학위를 취득하세요.",
  },
  {
    icon: "📱",
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

export default function PhysicalEducationPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  function scrollToForm() {
    document.getElementById("consult-form")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="font-sans text-gray-800 antialiased">

      {/* ─── HERO ─────────────────────────────────────────────────────── */}
      <section
        style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #243660 60%, #1a3a6e 100%)` }}
        className="relative overflow-hidden px-4 py-24 text-white md:py-36"
      >
        {/* decorative circles */}
        <div className="pointer-events-none absolute -top-20 -right-20 h-96 w-96 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #fff 0%, transparent 70%)" }} />
        <div className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #fff 0%, transparent 70%)" }} />

        <div className="relative mx-auto max-w-4xl text-center">
          <span className="mb-4 inline-block rounded-full border border-white/30 bg-white/10 px-4 py-1 text-sm font-medium tracking-wide">
            국가 공인 학점은행제
          </span>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
            체육학 학사 학위,<br />
            <span style={{ color: "#7DD3FC" }}>온라인으로</span> 취득하세요
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/80 md:text-xl">
            빠르면 <strong className="text-white">1년</strong>, 직장·육아 중에도 가능한 100% 온라인 체육학 학위 과정.<br />
            전담 컨설턴트가 학위 취득까지 1:1로 함께합니다.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <button
              onClick={scrollToForm}
              className="rounded-full px-8 py-4 text-base font-bold transition-transform hover:scale-105 active:scale-95"
              style={{ background: "#2563EB", color: "#fff" }}
            >
              무료 상담 신청하기 →
            </button>
            <a
              href="#process"
              className="rounded-full border border-white/40 px-8 py-4 text-base font-medium text-white transition-colors hover:bg-white/10"
            >
              과정 살펴보기
            </a>
          </div>

          {/* stats */}
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-3 gap-6 border-t border-white/20 pt-10">
            {[
              { value: "8,000+", label: "누적 수강생" },
              { value: "96%", label: "학위 취득률" },
              { value: "1년~", label: "최단 취득 기간" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-extrabold md:text-4xl">{s.value}</p>
                <p className="mt-1 text-sm text-white/60">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TARGET CARDS ─────────────────────────────────────────────── */}
      <section className="bg-gray-50 px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-3xl font-extrabold tracking-tight md:text-4xl" style={{ color: NAVY }}>
            이런 분들께 추천드립니다
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-gray-500">
            체육학 학점은행제는 다양한 배경과 목표를 가진 분들을 위한 유연한 제도입니다.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {targets.map((t) => (
              <div
                key={t.title}
                className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-4 text-4xl">{t.icon}</div>
                <h3 className="mb-2 text-lg font-bold" style={{ color: NAVY }}>{t.title}</h3>
                <p className="text-sm leading-relaxed text-gray-500">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 과정안내 ─────────────────────────────────────────────────── */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-3xl font-extrabold tracking-tight md:text-4xl" style={{ color: NAVY }}>
            체육학 과정 안내
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-gray-500">
            총 140학점을 취득하면 체육학 학사 학위를 받을 수 있습니다.
          </p>

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
              <div
                key={item.label}
                className="rounded-xl border border-blue-100 bg-blue-50 p-5 text-center"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-blue-400">{item.label}</p>
                <p className="mt-1 text-base font-bold" style={{ color: NAVY }}>{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROCESS ──────────────────────────────────────────────────── */}
      <section id="process" className="px-4 py-20" style={{ background: NAVY }}>
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            학위 취득 프로세스
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-white/60">
            5단계만 따라오시면 체육학 학사 학위를 취득할 수 있습니다.
          </p>

          <div className="mt-14 grid gap-6 sm:grid-cols-5">
            {steps.map((s, i) => (
              <div key={s.num} className="relative text-center">
                {i < steps.length - 1 && (
                  <div className="absolute top-6 left-[calc(50%+2rem)] hidden w-[calc(100%-4rem)] border-t-2 border-dashed border-white/20 sm:block" />
                )}
                <div
                  className="mx-auto flex h-12 w-12 items-center justify-center rounded-full text-sm font-extrabold"
                  style={{ background: "#2563EB", color: "#fff" }}
                >
                  {s.num}
                </div>
                <h3 className="mt-4 text-sm font-bold text-white">{s.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-white/60">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={scrollToForm}
              className="rounded-full px-8 py-4 text-sm font-bold transition-transform hover:scale-105"
              style={{ background: "#2563EB", color: "#fff" }}
            >
              지금 바로 무료 상담 시작하기 →
            </button>
          </div>
        </div>
      </section>

      {/* ─── 차별점 ───────────────────────────────────────────────────── */}
      <section className="bg-gray-50 px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-3xl font-extrabold tracking-tight md:text-4xl" style={{ color: NAVY }}>
            서플라이에듀의 차별점
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-gray-500">
            단순한 온라인 강의 플랫폼을 넘어, 학위 취득 완료까지 책임집니다.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {differentiators.map((d) => (
              <div
                key={d.title}
                className="rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-gray-100 transition-shadow hover:shadow-md"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full text-2xl"
                  style={{ background: "#EEF2FF" }}>
                  {d.icon}
                </div>
                <h3 className="mb-2 font-bold" style={{ color: NAVY }}>{d.title}</h3>
                <p className="text-sm leading-relaxed text-gray-500">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 후기 ─────────────────────────────────────────────────────── */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-3xl font-extrabold tracking-tight md:text-4xl" style={{ color: NAVY }}>
            수강생 후기
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-gray-500">
            실제로 학위를 취득한 수강생들의 솔직한 이야기입니다.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {reviews.map((r) => (
              <div
                key={r.name}
                className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
              >
                <div className="mb-4 flex gap-0.5 text-yellow-400">
                  {"★★★★★".split("").map((star, i) => <span key={i}>{star}</span>)}
                </div>
                <p className="flex-1 text-sm leading-relaxed text-gray-600">"{r.content}"</p>
                <div className="mt-5 border-t border-gray-100 pt-4">
                  <p className="font-bold" style={{ color: NAVY }}>{r.name}</p>
                  <p className="text-xs text-gray-400">{r.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────────────────── */}
      <section className="px-4 py-20" style={{ background: "#F8FAFC" }}>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-3xl font-extrabold tracking-tight md:text-4xl" style={{ color: NAVY }}>
            자주 묻는 질문
          </h2>
          <div className="mt-10 space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-gray-50"
                >
                  <span className="pr-4 font-semibold" style={{ color: NAVY }}>{faq.q}</span>
                  <span
                    className="shrink-0 text-lg font-bold transition-transform"
                    style={{
                      color: NAVY,
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
            ))}
          </div>
        </div>
      </section>

      {/* ─── 상담폼 ───────────────────────────────────────────────────── */}
      <section id="consult-form" className="px-4 py-20" style={{ background: NAVY }}>
        <div className="mx-auto max-w-xl">
          <h2 className="text-center text-3xl font-extrabold text-white md:text-4xl">
            무료 상담 신청
          </h2>
          <p className="mt-3 text-center text-white/60">
            양식을 작성하시면 24시간 이내에 담당자가 연락드립니다.
          </p>

          {submitted ? (
            <div className="mt-10 rounded-2xl bg-white/10 p-10 text-center">
              <div className="mb-4 text-5xl">✅</div>
              <h3 className="text-xl font-bold text-white">상담 신청이 완료되었습니다!</h3>
              <p className="mt-2 text-white/60">
                빠른 시일 내에 담당자가 연락드리겠습니다. 감사합니다.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-10 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-white/70">이름 *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="홍길동"
                    className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/40 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-white/70">연락처 *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="010-0000-0000"
                    className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/40 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-white/70">이메일</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                  className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/40 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-white/70">문의 내용</label>
                <textarea
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="현재 상황이나 궁금하신 점을 자유롭게 작성해 주세요."
                  className="w-full resize-none rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/40 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30"
                />
              </div>
              <p className="text-xs text-white/40">
                제출 시 개인정보 수집·이용에 동의하는 것으로 간주합니다.
              </p>
              <button
                type="submit"
                className="w-full rounded-xl py-4 text-sm font-bold transition-transform hover:scale-[1.02] active:scale-95"
                style={{ background: "#2563EB", color: "#fff" }}
              >
                무료 상담 신청하기
              </button>
            </form>
          )}
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
        <p className="mt-4 text-xs text-gray-600">
          © 2026 서플라이에듀케이션. All rights reserved.
        </p>
      </footer>

    </div>
  );
}
