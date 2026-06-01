"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Monitor, Award, BookOpen } from "lucide-react";

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

/* ── FAQ ── */
const faqs = [
  {
    q: "경영학 대신 전기공학으로 해도 되나요?",
    a: "네, 이제 온라인 과목이 충분히 개설되어 전기공학으로 직접 진행이 가능합니다. 몇 년 전까지는 오프라인 과목 비중이 높아 사실상 어려웠지만, 현재는 대부분의 과목을 온라인으로 수강할 수 있습니다.",
  },
  {
    q: "전기회로실험은 꼭 들어야 하나요?",
    a: "수업만으로 학위를 취득하려면 전공필수 과목이기 때문에 반드시 이수해야 합니다. 단, 자격증을 병행하는 플랜을 선택하면 이 과목을 자격증 학점으로 대체할 수 있어 오프라인 수업 없이도 학위 취득이 가능합니다.",
  },
  {
    q: "전기산업기사와 전기기사 둘 다 학점 인정이 되나요?",
    a: "아니요, 두 자격증은 분류와 직무번호가 동일하기 때문에 상위 자격증 1개만 인정됩니다. 전기기사를 보유하고 있다면 전기기사 1개만 인정되며, 전기산업기사는 별도로 추가 인정되지 않습니다.",
  },
  {
    q: "자격증은 몇 개까지 인정되나요?",
    a: "학사 과정 기준으로 최대 3개까지 인정됩니다. 전공 자격증 3개, 또는 전공 자격증 2개 + 일반 자격증 1개 조합이 가능합니다. 단, 분류와 직무번호가 동일한 자격증은 1개로 계산됩니다.",
  },
  {
    q: "중간에 산업기사·기사 응시가 가능한가요?",
    a: "네, 학점은행제 학점 누적 중에도 응시 자격이 충족되면 바로 응시할 수 있습니다. 전기산업기사는 41학점 이상, 전기기사는 106학점 이상 보유 시 응시 가능합니다. 학위 취득과 자격증 취득을 동시에 진행하는 전략이 가능합니다.",
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
        <h2 className="text-3xl font-bold tracking-tight text-black md:text-4xl mb-2">궁금한 점이 있으신가요?</h2>
        <p className="text-sm text-gray-500 mb-10">전기공학 학위 취득에 대해 가장 많이 물어보시는 질문들을 모았어요</p>
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
                <span className="text-left">{faq.q}</span>
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

/* ── 메인 페이지 ── */
export default function ElectricalPage() {
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
              전기공학 학위 취득 안내
            </span>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl">
              <span className="block">전기공학 학위,</span>
              <span className="block mt-2">이제 온라인으로 취득하세요</span>
            </h1>
            <p className="mt-6 text-lg font-medium text-white/80 md:text-xl" style={{ lineHeight: 1.7 }}>
              몇 년 전까지 불가능했던 온라인 전기공학,<br />
              지금은 대부분의 과목을 온라인으로 수강할 수 있습니다
            </p>
            <div className="mt-10 flex flex-wrap gap-8">
              {[
                { value: "20과목+", label: "온라인 수강 가능" },
                { value: "최단 2년", label: "학사 취득" },
                { value: "동시 취득", label: "학위 + 자격증" },
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
              무료 상담 신청하기 →
            </Link>
          </div>
        </div>
      </section>

      {/* ── 학점 취득 구조 섹션 ── */}
      <section className="w-full bg-white py-20 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-medium text-[#1a1aad] bg-[#EEF2FF] px-3 py-1 rounded-full mb-4 tracking-widest">
              학점 취득 방법
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-black md:text-4xl mb-3">
              학점은행제, 이렇게 학점을 모읍니다
            </h2>
            <p className="text-sm text-gray-500">세 가지 방법을 조합해 가장 빠르고 저렴하게 학위를 취득할 수 있습니다</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {/* 온라인 수업 */}
            <div style={{ borderRadius: 20, border: "1px solid #e5e7eb", overflow: "hidden" }}>
              <div style={{ background: "#EEF2FF", padding: "28px 24px 20px" }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: NAVY, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                  <Monitor size={24} color="#fff" />
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: NAVY, marginBottom: 4 }}>온라인 수업</h3>
                <p style={{ fontSize: 13, color: "#555" }}>가장 기본적인 학점 취득 방법</p>
              </div>
              <div style={{ padding: "20px 24px 28px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {[
                    "과목당 3학점 인정",
                    "한 학기 최대 8과목 수강 가능",
                    "1년 최대 14과목 이수 가능",
                    "시간·장소 제약 없이 수강",
                  ].map((t) => (
                    <div key={t} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: NAVY, flexShrink: 0, marginTop: 6 }} />
                      <span style={{ fontSize: 13, color: "#444", lineHeight: 1.6 }}>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 자격증 */}
            <div style={{ borderRadius: 20, border: "1.5px solid " + NAVY, overflow: "hidden" }}>
              <div style={{ background: NAVY, padding: "28px 24px 20px" }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                  <Award size={24} color="#fff" />
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 4 }}>자격증</h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>학점 단축의 핵심 수단</p>
              </div>
              <div style={{ padding: "20px 24px 28px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {[
                    "학사 과정 최대 3개까지 인정",
                    "전공 자격증 3개 또는 전공 2개 + 일반 1개",
                    "오프라인 수업 대체 가능",
                    "기간·비용 동시 단축 효과",
                  ].map((t) => (
                    <div key={t} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: NAVY, flexShrink: 0, marginTop: 6 }} />
                      <span style={{ fontSize: 13, color: "#444", lineHeight: 1.6 }}>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 독학사 */}
            <div style={{ borderRadius: 20, border: "1px solid #e5e7eb", overflow: "hidden" }}>
              <div style={{ background: "#F0FDF4", padding: "28px 24px 20px" }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: "#15803D", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                  <BookOpen size={24} color="#fff" />
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "#15803D", marginBottom: 4 }}>독학사</h3>
                <p style={{ fontSize: 13, color: "#555" }}>대학 버전 검정고시</p>
              </div>
              <div style={{ padding: "20px 24px 28px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {[
                    "과목당 4~5학점 인정",
                    "60점 이상이면 합격",
                    "수업 없이 시험만으로 학점 취득",
                    "빠른 학점 누적에 효과적",
                  ].map((t) => (
                    <div key={t} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#15803D", flexShrink: 0, marginTop: 6 }} />
                      <span style={{ fontSize: 13, color: "#444", lineHeight: 1.6 }}>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 기존 학점 배너 */}
          <div
            style={{
              background: "#F8F9FA",
              borderRadius: 14,
              padding: "16px 24px",
              display: "flex",
              alignItems: "center",
              gap: 12,
              border: "1px solid #e5e7eb",
            }}
          >
            <span style={{ fontSize: 20 }}>🎓</span>
            <p style={{ fontSize: 14, color: "#444", lineHeight: 1.6 }}>
              <strong>기존 대학 학점도 가져올 수 있습니다.</strong>{" "}
              한 학기라도 다닌 대학의 학점은 최대 140학점까지 인정됩니다. 보유 학점이 많을수록 취득 기간이 줄어듭니다.
            </p>
          </div>
        </div>
      </section>

      {/* ── 온라인 수업 현황 섹션 ── */}
      <section className="w-full bg-[#F8F9FA] py-20 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-medium text-[#1a1aad] bg-[#EEF2FF] px-3 py-1 rounded-full mb-4 tracking-widest">
              온라인 수업 현황
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-black md:text-4xl mb-3">
              전기공학, 온라인으로 어디까지 가능할까?
            </h2>
            <p className="text-sm text-gray-500">개설 현황과 주의사항을 확인하세요</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* 온라인 현황 */}
            <div style={{ borderRadius: 20, background: "#ffffff", border: "1px solid #e5e7eb", padding: "28px 26px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <span style={{ fontSize: 22 }}>✅</span>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: "#111" }}>온라인으로 수강 가능</h3>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  "교육원 과목 합산 약 20과목 이상 온라인 수강 가능",
                  "전공필수·전공선택 대부분 온라인으로 해결 가능",
                  "스마트폰·PC 모두 수강 가능, 시간 제약 없음",
                ].map((t) => (
                  <div key={t} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: NAVY, flexShrink: 0, marginTop: 6 }} />
                    <span style={{ fontSize: 13, color: "#444", lineHeight: 1.6 }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 주의사항 */}
            <div style={{ borderRadius: 20, background: "#ffffff", border: "1.5px solid #FCA5A5", padding: "28px 26px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <span style={{ fontSize: 22 }}>⚠️</span>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: "#B91C1C" }}>오프라인 과목 주의</h3>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  "전기회로실험 1과목은 오프라인 대면 수업",
                  "현재 개설 교육원 1곳만 존재",
                  "대면 수업이 어려운 경우 자격증 병행으로 대체 가능",
                ].map((t) => (
                  <div key={t} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#B91C1C", flexShrink: 0, marginTop: 6 }} />
                    <span style={{ fontSize: 13, color: "#444", lineHeight: 1.6 }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 강조 배너 */}
          <div
            style={{
              background: "#EEF2FF",
              border: "1.5px solid #C7D2FE",
              borderRadius: 14,
              padding: "18px 24px",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span style={{ fontSize: 20 }}>⚡</span>
            <p style={{ fontSize: 14, color: NAVY, fontWeight: 600, lineHeight: 1.6 }}>
              자격증을 병행하면 오프라인 과목 대체 + 비용·기간 단축 가능
            </p>
          </div>
        </div>
      </section>

      {/* ── 자격증 안내 섹션 ── */}
      <section className="w-full bg-white py-20 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-10">
            <span className="inline-block text-xs font-medium text-[#1a1aad] bg-[#EEF2FF] px-3 py-1 rounded-full mb-4 tracking-widest">
              학점 인정 자격증
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-black md:text-4xl mb-3">
              전기공학 학점 인정 자격증
            </h2>
            <p className="text-sm text-gray-500">자격증 선택 전 반드시 확인하세요</p>
          </div>

          {/* 주의사항 */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
            {[
              "학사 과정 자격증 최대 3개까지 인정 (전공 3개 또는 전공 2개 + 일반 1개)",
              "분류와 직무번호가 동일한 자격증은 1개만 인정 (예: 전기산업기사 + 전기공사산업기사 → 1개만 인정)",
            ].map((t) => (
              <div
                key={t}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                  background: "#FFF7ED",
                  border: "1px solid #FED7AA",
                  borderRadius: 12,
                  padding: "14px 18px",
                }}
              >
                <span style={{ fontSize: 16, flexShrink: 0 }}>⚠️</span>
                <span style={{ fontSize: 13, color: "#92400E", lineHeight: 1.6 }}>{t}</span>
              </div>
            ))}
          </div>

          {/* 자격증 카드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 전기산업기사 */}
            <div style={{ borderRadius: 20, border: "1.5px solid " + NAVY, overflow: "hidden" }}>
              <div style={{ background: NAVY, padding: "24px 22px 18px" }}>
                <span style={{ fontSize: 28 }}>⚡</span>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: "#fff", marginTop: 10, marginBottom: 4 }}>전기산업기사</h3>
                <div style={{ display: "inline-block", background: "#FFD700", color: "#111", fontSize: 12, fontWeight: 700, padding: "3px 12px", borderRadius: 20 }}>
                  전공 학점 인정 · 16학점
                </div>
              </div>
              <div style={{ padding: "18px 22px 24px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {[
                    "41학점 이상 보유 시 응시 가능",
                    "필기 + 실기 시험",
                    "학위 취득 중 중간 단계에서 응시 가능",
                    "전기공사산업기사와 동일 직무 — 1개만 인정",
                  ].map((t) => (
                    <div key={t} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: NAVY, flexShrink: 0, marginTop: 6 }} />
                      <span style={{ fontSize: 13, color: "#444", lineHeight: 1.6 }}>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 전기기사 */}
            <div style={{ borderRadius: 20, border: "1px solid #e5e7eb", overflow: "hidden" }}>
              <div style={{ background: "#EEF2FF", padding: "24px 22px 18px" }}>
                <span style={{ fontSize: 28 }}>🔌</span>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: NAVY, marginTop: 10, marginBottom: 4 }}>전기기사</h3>
                <div style={{ display: "inline-block", background: NAVY, color: "#fff", fontSize: 12, fontWeight: 700, padding: "3px 12px", borderRadius: 20 }}>
                  전공 학점 인정 · 상위 자격증
                </div>
              </div>
              <div style={{ padding: "18px 22px 24px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {[
                    "106학점 이상 보유 시 응시 가능",
                    "필기 + 실기 시험",
                    "전기산업기사와 동일 직무 — 둘 중 1개만 인정",
                    "취업·승진에서 산업기사보다 우위",
                  ].map((t) => (
                    <div key={t} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: NAVY, flexShrink: 0, marginTop: 6 }} />
                      <span style={{ fontSize: 13, color: "#444", lineHeight: 1.6 }}>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 소방설비산업기사 */}
            <div style={{ borderRadius: 20, border: "1px solid #e5e7eb", overflow: "hidden" }}>
              <div style={{ background: "#FFF7ED", padding: "24px 22px 18px" }}>
                <span style={{ fontSize: 28 }}>🔥</span>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: "#C2410C", marginTop: 10, marginBottom: 4 }}>소방설비산업기사</h3>
                <div style={{ display: "inline-block", background: "#C2410C", color: "#fff", fontSize: 12, fontWeight: 700, padding: "3px 12px", borderRadius: 20 }}>
                  전공 자격증으로 인정
                </div>
              </div>
              <div style={{ padding: "18px 22px 24px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {[
                    "전기공학 전공 자격증으로 학점 인정",
                    "전기산업기사와 함께 활용 시 전공 자격증 2개 인정",
                    "소방·전기 분야 취업 연계 가능",
                    "필기 + 실기 시험",
                  ].map((t) => (
                    <div key={t} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#C2410C", flexShrink: 0, marginTop: 6 }} />
                      <span style={{ fontSize: 13, color: "#444", lineHeight: 1.6 }}>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 컴활 2급 */}
            <div style={{ borderRadius: 20, border: "1px solid #e5e7eb", overflow: "hidden" }}>
              <div style={{ background: "#F0FDF4", padding: "24px 22px 18px" }}>
                <span style={{ fontSize: 28 }}>💻</span>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: "#15803D", marginTop: 10, marginBottom: 4 }}>컴퓨터활용능력 2급</h3>
                <div style={{ display: "inline-block", background: "#15803D", color: "#fff", fontSize: 12, fontWeight: 700, padding: "3px 12px", borderRadius: 20 }}>
                  일반학점으로 인정
                </div>
              </div>
              <div style={{ padding: "18px 22px 24px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {[
                    "타전공 영역 일반학점으로 인정",
                    "전공 자격증 한도와 별도로 활용 가능",
                    "상대적으로 취득이 쉬운 자격증",
                    "일반 선택 학점 부족 시 유용",
                  ].map((t) => (
                    <div key={t} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#15803D", flexShrink: 0, marginTop: 6 }} />
                      <span style={{ fontSize: 13, color: "#444", lineHeight: 1.6 }}>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 플랜 섹션 ── */}
      <section className="w-full bg-[#F8F9FA] py-20 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-medium text-[#1a1aad] bg-[#EEF2FF] px-3 py-1 rounded-full mb-4 tracking-widest">
              예시 플랜
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-black md:text-4xl mb-3">
              2년 반 만에<br />전기산업기사 + 학사학위 동시 취득
            </h2>
            <p className="text-sm text-gray-500">최종학력 고졸 · 보유 자격증 컴퓨터활용능력 2급 1개 기준</p>
          </div>

          {/* 타임라인 */}
          <div style={{ background: "#ffffff", borderRadius: 20, border: "1px solid #e5e7eb", padding: "32px 28px", marginBottom: 24 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {[
                {
                  period: "25년 2학기 ~ 26년 1학기",
                  title: "온라인 수업 시작",
                  desc: "학기당 최대 8과목 수강, 1년간 약 14과목(42학점) 이수",
                  badge: "STEP 1",
                  badgeColor: NAVY,
                  highlight: false,
                },
                {
                  period: "26년 2학기",
                  title: "전기산업기사 응시 가능",
                  desc: "41학점 충족 시점 — 학위 취득 중 자격증 동시 도전",
                  badge: "STEP 2",
                  badgeColor: "#C2410C",
                  highlight: true,
                },
                {
                  period: "27년 ~ 28년",
                  title: "나머지 수업 + 독학사",
                  desc: "온라인 수업 계속 이수, 독학사 병행으로 140학점 채우기",
                  badge: "STEP 3",
                  badgeColor: NAVY,
                  highlight: false,
                },
                {
                  period: "28년 2월",
                  title: "학사학위 취득",
                  desc: "전기산업기사 자격증 + 전기공학 학사학위 동시 보유",
                  badge: "완료",
                  badgeColor: "#15803D",
                  highlight: true,
                },
              ].map((step, i, arr) => (
                <div key={step.period} style={{ display: "flex", gap: 20 }}>
                  {/* 타임라인 선 */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        background: step.badgeColor,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <span style={{ fontSize: 10, fontWeight: 700, color: "#fff", whiteSpace: "nowrap" }}>{step.badge}</span>
                    </div>
                    {i < arr.length - 1 && (
                      <div style={{ width: 2, flex: 1, background: "#e5e7eb", margin: "4px 0" }} />
                    )}
                  </div>
                  {/* 내용 */}
                  <div
                    style={{
                      paddingBottom: i < arr.length - 1 ? 28 : 0,
                      flex: 1,
                      background: step.highlight ? "#EEF2FF" : "transparent",
                      borderRadius: step.highlight ? 12 : 0,
                      padding: step.highlight ? "14px 16px" : "4px 0 28px",
                      marginBottom: step.highlight ? 16 : 0,
                    }}
                  >
                    <p style={{ fontSize: 11, color: "#888", marginBottom: 4, fontWeight: 600 }}>{step.period}</p>
                    <p style={{ fontSize: 15, fontWeight: 700, color: step.highlight ? step.badgeColor : "#111", marginBottom: 4 }}>{step.title}</p>
                    <p style={{ fontSize: 13, color: "#666", lineHeight: 1.6 }}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 플랜 조정 안내 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: "⚡", title: "기간 단축 원한다면", desc: "자격증·독학사 추가 활용으로 1~6개월 단축 가능" },
              { icon: "🧘", title: "천천히 하고 싶다면", desc: "자격증 줄이고 수업 위주로 구성, 부담 없이 진행" },
              { icon: "🏆", title: "기사 목표라면", desc: "106학점 시점에서 전기기사 응시 가능, 전략적 설계 필요" },
            ].map((item) => (
              <div
                key={item.title}
                style={{
                  background: "#ffffff",
                  borderRadius: 14,
                  padding: "20px 18px",
                  border: "1px solid #e5e7eb",
                  textAlign: "center",
                }}
              >
                <span style={{ fontSize: 24 }}>{item.icon}</span>
                <p style={{ fontSize: 14, fontWeight: 700, color: "#111", marginTop: 10, marginBottom: 6 }}>{item.title}</p>
                <p style={{ fontSize: 13, color: "#666", lineHeight: 1.6 }}>{item.desc}</p>
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
            내 상황에 맞는 전기공학 플랜이 궁금하다면
          </h2>
          <p className="mt-3 text-sm md:text-base" style={{ color: "rgba(255,255,255,0.7)" }}>
            최종학력, 보유 자격증에 따라 최적의 플랜을 설계해 드립니다
          </p>
          <Link
            href="/apply"
            className="mt-8 inline-block rounded-full px-8 py-4 text-base font-bold transition-transform hover:scale-105 active:scale-95"
            style={{ background: "#FFFFFF", color: NAVY }}
          >
            1:1 무료 상담 신청하기
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
