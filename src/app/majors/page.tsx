"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { MessageCircle, ClipboardList, Laptop, Award, ChevronDown } from "lucide-react";

const NAVY = "#1a1aad";

/* ── 네비게이션 바 ── */
function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50"
      style={{
        background: isScrolled ? "#FFFFFF" : "transparent",
        borderBottom: isScrolled ? "1px solid rgba(0,0,0,0.08)" : "none",
        transition: "background 0.3s, border-color 0.3s",
      }}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <Link
          href="/"
          className="text-lg font-bold"
          style={{ color: isScrolled ? "#000000" : "#FFFFFF", transition: "color 0.3s" }}
        >
          서플라이에듀케이션
        </Link>
        <Link
          href="/apply"
          className="rounded-full px-5 py-2 text-sm font-bold transition-all"
          style={
            isScrolled
              ? { background: NAVY, color: "#FFFFFF" }
              : { background: "transparent", color: "#FFFFFF", border: "1.5px solid #FFFFFF" }
          }
        >
          상담 신청
        </Link>
      </div>
    </header>
  );
}

/* ── FAQ 아코디언 ── */
const faqs = [
  {
    q: "경영·아동·심리학 학위도 일반 대학 졸업장과 동일하게 인정되나요?",
    a: "네, 학점은행제를 통해 취득한 학위는 「학점인정 등에 관한 법률」에 의거한 국가 공인 학위입니다. 취업 이력서, 편입, 대학원 진학 모두 일반 대학 졸업자와 완전히 동일하게 적용됩니다.",
  },
  {
    q: "세 전공 중 어떤 것을 선택해야 할지 모르겠어요.",
    a: "걱정하지 않으셔도 됩니다. 무료 상담을 통해 현재 상황, 목표 직종, 보유 자격증 등을 분석해 드리고 가장 유리한 전공을 추천해드립니다. 경우에 따라 복수전공 전략도 안내해드립니다.",
  },
  {
    q: "직장을 다니면서도 병행할 수 있나요?",
    a: "물론입니다. 수업은 100% 온라인으로 진행되며 정해진 시간표가 없습니다. 퇴근 후나 주말에 몰아서 수강하는 분들이 많고, 스마트폰으로도 수강이 가능해 출퇴근 자투리 시간도 활용할 수 있습니다.",
  },
  {
    q: "이전에 다니던 대학 학점도 인정받을 수 있나요?",
    a: "네, 기존 대학에서 취득한 학점은 최대 140학점까지 인정됩니다. 자격증이나 독학사 시험 학점도 인정 범위에 포함되어 기간을 크게 단축할 수 있습니다. 정확한 인정 범위는 상담 시 확인해드립니다.",
  },
  {
    q: "비용이 중간에 추가로 발생하지는 않나요?",
    a: "처음 상담 시 전체 플랜의 총비용을 투명하게 안내해드립니다. 플랜에 포함된 과목 외 추가 비용은 발생하지 않습니다.",
  },
];

function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <section className="w-full bg-[#F8F9FA] py-20 px-6">
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-block text-xs font-medium text-[#1a1aad] bg-[#EEF2FF] px-3 py-1 rounded-full mb-4 tracking-widest">
          자주 묻는 질문
        </span>
        <h2 className="text-3xl font-bold tracking-tight text-black md:text-4xl mb-2">
          궁금한 점이 있으신가요?
        </h2>
        <p className="text-sm text-gray-500 mb-10">가장 많이 물어보시는 질문들을 모았어요</p>
        <div className="text-left space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              style={{
                borderRadius: 12,
                overflow: "hidden",
                ...(openIndex === i
                  ? { border: "1.5px solid #1a1aad", background: "#ffffff", padding: "0 20px" }
                  : { border: "0.5px solid #e5e7eb", background: "transparent", padding: "0 4px" }),
              }}
            >
              <button
                className="flex w-full items-center justify-between px-5 py-4 text-sm font-semibold text-gray-800 hover:bg-gray-50"
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
              >
                <span>{faq.q}</span>
                <ChevronDown
                  size={18}
                  color="#1a1aad"
                  style={{
                    flexShrink: 0,
                    marginLeft: 8,
                    transform: openIndex === i ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s",
                  }}
                />
              </button>
              {openIndex === i && (
                <div className="px-5 pb-4 text-sm leading-relaxed text-gray-500">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 전공 카드 데이터 ── */
const majors = [
  {
    emoji: "📊",
    name: "경영학",
    degree: "경영학사 (4년제)",
    duration: "최단 2년",
    fields: ["기업 취업·승진", "창업 및 경영 실무", "MBA·대학원 진학"],
    desc: "가장 수요가 높은 전공 중 하나로, 취업부터 창업까지 폭넓게 활용됩니다. 자격증 병행으로 기간을 대폭 단축할 수 있습니다.",
    bg: "#EEF2FF",
    accent: NAVY,
  },
  {
    emoji: "👶",
    name: "아동학",
    degree: "아동학사 (4년제)",
    duration: "최단 2년",
    fields: ["보육교사 2급 자격 연계", "아동 상담·복지 기관 취업", "유아교육 대학원 진학"],
    desc: "보육교사 2급 자격증과 함께 취득하는 경우가 많습니다. 어린이집·복지관 등 취업 경쟁력을 높이는 가장 효과적인 경로입니다.",
    bg: "#FFF7ED",
    accent: "#C2410C",
  },
  {
    emoji: "🧠",
    name: "심리학",
    degree: "심리학사 (4년제)",
    duration: "최단 2년",
    fields: ["상담사·심리치료사 자격", "사회복지·복지관 취업", "상담 대학원 진학"],
    desc: "상담심리사·임상심리사 등 자격증 취득과 병행하는 분들이 많습니다. 사회복지사 2급과 함께 취득하면 활용 폭이 더욱 넓어집니다.",
    bg: "#F0FDF4",
    accent: "#15803D",
  },
];

/* ── 메인 페이지 ── */
export default function MajorsPage() {
  return (
    <div className="flex min-h-screen flex-col font-sans text-black antialiased">
      <Navbar />

      {/* ── 히어로 섹션 ── */}
      <section
        className="relative flex min-h-screen flex-col justify-center"
        style={{ background: "linear-gradient(135deg, #0a0f28 0%, #1a1aad 60%, #1e3a8a 100%)" }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse at 70% 50%, rgba(255,255,255,0.04) 0%, transparent 60%)",
          }}
        />
        <div className="relative mx-auto w-full max-w-6xl px-4 md:px-6" style={{ zIndex: 2 }}>
          <div className="max-w-2xl" style={{ wordBreak: "keep-all" }}>
            <span
              className="mb-6 inline-block rounded-full px-4 py-1 text-xs font-semibold tracking-widest"
              style={{ background: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.85)" }}
            >
              학점은행제 전공 안내
            </span>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl">
              <span className="block">경영·아동·심리학 학위,</span>
              <span className="block mt-2">
                학점은행제로{" "}
                <span
                  className="inline px-2 py-1"
                  style={{ background: "rgba(255,255,255,0.2)", borderRadius: 6 }}
                >
                  가장 빠르게
                </span>
              </span>
            </h1>
            <p className="mt-8 text-lg font-medium text-white/80 md:text-xl" style={{ lineHeight: 1.7 }}>
              전담 컨설턴트와 함께 설계하는 나만의 학위 플랜.<br />
              돈과 시간을 아끼는 정확한 경로를 알려드립니다.
            </p>
            <div className="mt-10 flex flex-wrap gap-6">
              {[
                { value: "최단 2년", label: "학위 취득" },
                { value: "97.3%", label: "학위 취득률" },
                { value: "100%", label: "온라인 수강" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl font-bold text-white md:text-3xl">{stat.value}</p>
                  <p className="mt-1 text-xs text-white/60">{stat.label}</p>
                </div>
              ))}
            </div>
            <Link
              href="/apply"
              className="mt-10 inline-block rounded-full px-8 py-4 text-base font-bold transition-transform hover:scale-105 active:scale-95"
              style={{ background: "#FFFFFF", color: NAVY }}
            >
              무료 상담 신청하기
            </Link>
          </div>
        </div>
      </section>

      {/* ── 전공 카드 섹션 ── */}
      <section className="w-full bg-white py-20 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-medium text-[#1a1aad] bg-[#EEF2FF] px-3 py-1 rounded-full mb-4 tracking-widest">
              전공 소개
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-black md:text-4xl mb-3">
              내 목표에 맞는 전공을 선택하세요
            </h2>
            <p className="text-sm text-gray-500">어떤 전공이든 서플라이에듀가 최적의 경로를 설계해드립니다</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {majors.map((major) => (
              <div
                key={major.name}
                style={{
                  borderRadius: 20,
                  overflow: "hidden",
                  border: "1px solid #e5e7eb",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* 카드 헤더 */}
                <div
                  style={{ background: major.bg, padding: "28px 24px 20px" }}
                >
                  <span style={{ fontSize: 36 }}>{major.emoji}</span>
                  <h3 style={{ fontSize: 22, fontWeight: 700, color: major.accent, marginTop: 12 }}>
                    {major.name}
                  </h3>
                  <p style={{ fontSize: 13, color: "#555", marginTop: 4 }}>{major.degree}</p>
                  <div
                    style={{
                      display: "inline-block",
                      marginTop: 12,
                      background: major.accent,
                      color: "#fff",
                      fontSize: 12,
                      fontWeight: 600,
                      padding: "4px 12px",
                      borderRadius: 20,
                    }}
                  >
                    {major.duration} 취득 가능
                  </div>
                </div>
                {/* 카드 바디 */}
                <div style={{ padding: "20px 24px 28px", flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
                  <p style={{ fontSize: 13, lineHeight: 1.7, color: "#555" }}>{major.desc}</p>
                  <div>
                    <p style={{ fontSize: 12, fontWeight: 700, color: "#111", marginBottom: 8 }}>주요 활용 분야</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      {major.fields.map((f) => (
                        <div key={f} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span style={{ width: 6, height: 6, borderRadius: "50%", background: major.accent, flexShrink: 0 }} />
                          <span style={{ fontSize: 13, color: "#444" }}>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Link
                    href="/apply"
                    style={{
                      marginTop: "auto",
                      display: "block",
                      textAlign: "center",
                      padding: "10px 0",
                      borderRadius: 30,
                      border: `1.5px solid ${major.accent}`,
                      color: major.accent,
                      fontSize: 13,
                      fontWeight: 600,
                      transition: "all 0.2s",
                    }}
                  >
                    이 전공 상담 신청 →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 취득 과정 섹션 ── */}
      <section className="w-full bg-[#F8F9FA] px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <span className="mb-4 inline-block rounded-full bg-[#EEF2FF] px-3 py-1 text-xs font-medium tracking-widest text-[#1a1aad]">
            진행 과정
          </span>
          <h2 className="mb-12 text-3xl font-bold tracking-tight text-black md:text-4xl">
            복잡한 학점은행제,<br />가장 쉽고 가장 빠르게
          </h2>
          <div className="grid grid-cols-4 gap-3 max-w-4xl mx-auto">
            {[
              { step: "STEP 01", Icon: MessageCircle, title: "무료 상담 신청", sub: "3분이면 충분해요" },
              { step: "STEP 02", Icon: ClipboardList, title: "1:1 플랜 설계", sub: "최단기간 최저비용 맞춤 설계" },
              { step: "STEP 03", Icon: Laptop, title: "온라인 수강", sub: "언제 어디서든 편하게" },
              { step: "STEP 04", Icon: Award, title: "학위·자격증 취득", sub: "끝까지 함께합니다" },
            ].map(({ step, Icon, title, sub }, i) => (
              <div key={step} className="relative flex flex-col items-center px-1 text-center">
                <p className="mb-4 text-[10px] font-semibold tracking-widest text-[#1a1aad] md:text-xs">{step}</p>
                <div className="relative z-10 mb-4 flex h-12 w-12 items-center justify-center rounded-3xl bg-[#EEF2FF] md:h-16 md:w-16">
                  <Icon size={20} className="md:hidden" color="#1a1aad" />
                  <Icon size={28} className="hidden md:block" color="#1a1aad" />
                </div>
                <p className="mb-1 text-xs font-medium text-gray-900 md:text-sm">{title}</p>
                <p className="text-[10px] leading-relaxed text-gray-500 md:text-xs">{sub}</p>
                {i < 3 && (
                  <span className="absolute right-0 top-8 hidden md:block" style={{ transform: "translateX(50%)" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a1aad" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ 섹션 ── */}
      <FAQSection />

      {/* ── 하단 CTA 섹션 ── */}
      <section className="py-24" style={{ background: NAVY }}>
        <div className="mx-auto max-w-6xl px-4 md:px-6 text-center">
          <h2 className="text-2xl font-extrabold text-white md:text-3xl">
            지금 바로 시작하세요
          </h2>
          <p className="mt-3 text-sm md:text-base" style={{ color: "rgba(255,255,255,0.7)" }}>
            전담 컨설턴트가 1:1로 함께합니다
          </p>
          <Link
            href="/apply"
            className="mt-8 inline-block rounded-full px-8 py-4 text-base font-bold transition-transform hover:scale-105 active:scale-95"
            style={{ background: "#FFFFFF", color: NAVY }}
          >
            무료 상담 신청하기
          </Link>
        </div>
      </section>

      {/* ── 푸터 ── */}
      <footer className="border-t bg-white py-8" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
        <div
          className="mx-auto max-w-6xl px-4 md:px-6 text-center text-xs"
          style={{ color: "rgba(0,0,0,0.4)" }}
        >
          <p className="font-semibold" style={{ color: "rgba(0,0,0,0.6)" }}>서플라이에듀케이션</p>
          <p className="mt-1">© {new Date().getFullYear()} Supply Education. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
