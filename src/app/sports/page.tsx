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
    q: "체육학 온라인 수업이 충분히 개설되어 있나요?",
    a: "네, 2026년 기준 전문학사 과정에 13개(39학점), 학사 과정에 23개가 개설되어 있습니다. 특히 2026년에 전공 과목이 대폭 확대되어 예년보다 더 빠른 이수가 가능합니다.",
  },
  {
    q: "자격증은 꼭 따야 하나요?",
    a: "학사 과정은 자격증 없이도 온라인 수업만으로 취득이 가능합니다. 다만 전문학사는 전공 개설 수업이 39학점으로 6학점이 부족해 자격증이 필수입니다. 어느 과정이든 자격증을 활용하면 기간을 크게 단축할 수 있습니다.",
  },
  {
    q: "독학사가 뭔가요?",
    a: "독학사는 대학 버전 검정고시입니다. 시험에 합격하면 과목당 4~5학점이 인정됩니다. 60점 이상이면 합격으로, 충분한 준비 시간만 확보된다면 학점 취득 속도를 높이는 데 매우 효과적입니다.",
  },
  {
    q: "기존 대학 학점도 인정되나요?",
    a: "네, 한 학기라도 다닌 대학의 학점은 그대로 가져올 수 있습니다. 최대 140학점까지 인정되며, 이미 보유한 학점이 많을수록 남은 이수 기간이 짧아집니다. 정확한 인정 범위는 무료 상담에서 확인해드립니다.",
  },
  {
    q: "최종 학위는 언제 받을 수 있나요?",
    a: "학위 수여는 매년 2월 말과 8월 말, 연 2회만 진행됩니다. 모든 학점을 충족했더라도 수여일까지 기다려야 하므로, 목표 시점에 맞게 플랜을 역산하는 것이 중요합니다. 상담 시 수여일 기준으로 최적 플랜을 설계해드립니다.",
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
        <p className="text-sm text-gray-500 mb-10">체육학 학위 취득에 대해 가장 많이 물어보시는 질문들을 모았어요</p>
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
export default function SportsPage() {
  const [activeTab, setActiveTab] = useState<"전문학사" | "학사" | "타전공">("전문학사");

  const tabs: Array<"전문학사" | "학사" | "타전공"> = ["전문학사", "학사", "타전공"];

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
              체육학 학위 취득 안내
            </span>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl">
              <span className="block">체육학 학위,</span>
              <span className="block mt-2">온라인으로 취득하세요</span>
            </h1>
            <p className="mt-6 text-lg font-medium text-white/80 md:text-xl" style={{ lineHeight: 1.7 }}>
              2026년 체육학 전공 과목 대폭 개설,<br />
              작년보다 더 쉽고 빠른 학위 취득이 가능합니다
            </p>
            <div className="mt-10 flex flex-wrap gap-8">
              {[
                { value: "최단 1년", label: "전문학사 취득" },
                { value: "최단 2년", label: "학사 취득" },
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
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: NAVY, flexShrink: 0, marginTop: 6 }} />
                    <span style={{ fontSize: 13, color: "#444", lineHeight: 1.6 }}>과목당 <strong>3학점</strong> 인정</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: NAVY, flexShrink: 0, marginTop: 6 }} />
                    <span style={{ fontSize: 13, color: "#444", lineHeight: 1.6 }}>시간·장소 제약 없이 수강 가능</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: NAVY, flexShrink: 0, marginTop: 6 }} />
                    <span style={{ fontSize: 13, color: "#444", lineHeight: 1.6 }}>스마트폰·PC 모두 수강 가능</span>
                  </div>
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
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: NAVY, flexShrink: 0, marginTop: 6 }} />
                    <span style={{ fontSize: 13, color: "#444", lineHeight: 1.6 }}>자격증 1개로 <strong>6~20학점</strong> 인정</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: NAVY, flexShrink: 0, marginTop: 6 }} />
                    <span style={{ fontSize: 13, color: "#444", lineHeight: 1.6 }}>수업 없이 학점 채울 수 있는 유일한 방법</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: NAVY, flexShrink: 0, marginTop: 6 }} />
                    <span style={{ fontSize: 13, color: "#444", lineHeight: 1.6 }}>기간·비용 모두 단축 효과</span>
                  </div>
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
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#15803D", flexShrink: 0, marginTop: 6 }} />
                    <span style={{ fontSize: 13, color: "#444", lineHeight: 1.6 }}>과목당 <strong>4~5학점</strong> 인정</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#15803D", flexShrink: 0, marginTop: 6 }} />
                    <span style={{ fontSize: 13, color: "#444", lineHeight: 1.6 }}>60점 이상이면 합격</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#15803D", flexShrink: 0, marginTop: 6 }} />
                    <span style={{ fontSize: 13, color: "#444", lineHeight: 1.6 }}>수업 없이 시험만으로 학점 취득</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 안내 배너 */}
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

      {/* ── 과정별 플랜 섹션 (탭 UI) ── */}
      <section className="w-full bg-[#F8F9FA] py-20 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-medium text-[#1a1aad] bg-[#EEF2FF] px-3 py-1 rounded-full mb-4 tracking-widest">
              과정별 플랜
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-black md:text-4xl mb-3">
              내 목표에 맞는 플랜을 선택하세요
            </h2>
            <p className="text-sm text-gray-500">전문학사·학사·타전공 중 상황에 맞는 경로를 확인해보세요</p>
          </div>

          {/* 탭 */}
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 32 }}>
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: "10px 22px",
                  borderRadius: 30,
                  fontSize: 14,
                  fontWeight: 600,
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  background: activeTab === tab ? NAVY : "#ffffff",
                  color: activeTab === tab ? "#ffffff" : "#555",
                  boxShadow: activeTab === tab ? "0 2px 12px rgba(26,26,173,0.25)" : "0 1px 4px rgba(0,0,0,0.08)",
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* 전문학사 탭 */}
          {activeTab === "전문학사" && (
            <div style={{ background: "#ffffff", borderRadius: 20, padding: "36px 32px", border: "1px solid #e5e7eb" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: NAVY, background: "#EEF2FF", padding: "3px 12px", borderRadius: 20 }}>전문학사</span>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: "#111" }}>레저스포츠 전공</h3>
              </div>
              <p style={{ fontSize: 13, color: "#888", marginBottom: 28 }}>총 80학점 필요 · 전공 45학점 + 교양 15학점 + 일반 최대 20학점</p>

              {/* 학점 현황 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {[
                  { label: "온라인 전공 수업", value: "13개 개설", sub: "39학점 취득 가능", color: NAVY },
                  { label: "부족한 전공 학점", value: "6학점", sub: "자격증으로 채워야 함", color: "#DC2626" },
                  { label: "추천 자격증", value: "생활스포츠지도사 2급", sub: "6학점 인정", color: "#15803D" },
                ].map((item) => (
                  <div key={item.label} style={{ background: "#F8F9FA", borderRadius: 14, padding: "20px 18px", textAlign: "center" }}>
                    <p style={{ fontSize: 11, color: "#888", marginBottom: 6, fontWeight: 600, letterSpacing: "0.05em" }}>{item.label}</p>
                    <p style={{ fontSize: 17, fontWeight: 700, color: item.color, marginBottom: 4 }}>{item.value}</p>
                    <p style={{ fontSize: 12, color: "#666" }}>{item.sub}</p>
                  </div>
                ))}
              </div>

              {/* 예상 일정 */}
              <div style={{ background: "#EEF2FF", borderRadius: 14, padding: "20px 24px", marginBottom: 24 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: NAVY, marginBottom: 12 }}>예상 일정 (약 1년)</p>
                <p style={{ fontSize: 13, color: "#444", lineHeight: 1.7 }}>
                  온라인 수업 2학기 + 자격증 2개 + 독학사 1단계 조합
                </p>
              </div>

              {/* 플랜 표 */}
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                  <thead>
                    <tr style={{ background: "#F8F9FA" }}>
                      <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 700, color: "#111", borderBottom: "2px solid #e5e7eb" }}>구분</th>
                      <th style={{ padding: "12px 16px", textAlign: "center", fontWeight: 700, color: "#111", borderBottom: "2px solid #e5e7eb" }}>1학기</th>
                      <th style={{ padding: "12px 16px", textAlign: "center", fontWeight: 700, color: "#111", borderBottom: "2px solid #e5e7eb" }}>2학기</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: "1px solid #f0f0f0" }}>
                      <td style={{ padding: "12px 16px", color: "#444" }}>온라인 수업</td>
                      <td style={{ padding: "12px 16px", textAlign: "center", color: NAVY, fontWeight: 600 }}>7과목 (21학점)</td>
                      <td style={{ padding: "12px 16px", textAlign: "center", color: NAVY, fontWeight: 600 }}>6과목 (18학점)</td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid #f0f0f0" }}>
                      <td style={{ padding: "12px 16px", color: "#444" }}>자격증</td>
                      <td style={{ padding: "12px 16px", textAlign: "center", color: "#15803D", fontWeight: 600 }}>생활스포츠지도사 2급</td>
                      <td style={{ padding: "12px 16px", textAlign: "center", color: "#888" }}>—</td>
                    </tr>
                    <tr>
                      <td style={{ padding: "12px 16px", color: "#444" }}>독학사</td>
                      <td style={{ padding: "12px 16px", textAlign: "center", color: "#C2410C", fontWeight: 600 }}>1단계 (교양)</td>
                      <td style={{ padding: "12px 16px", textAlign: "center", color: "#888" }}>—</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 학사 탭 */}
          {activeTab === "학사" && (
            <div style={{ background: "#ffffff", borderRadius: 20, padding: "36px 32px", border: "1px solid #e5e7eb" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: NAVY, background: "#EEF2FF", padding: "3px 12px", borderRadius: 20 }}>학사</span>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: "#111" }}>체육학 전공</h3>
              </div>
              <p style={{ fontSize: 13, color: "#888", marginBottom: 28 }}>총 140학점 필요 · 전공 60학점 + 교양 30학점 + 일반 최대 50학점</p>

              {/* 개설 현황 */}
              <div style={{ background: "#EEF2FF", borderRadius: 14, padding: "16px 20px", marginBottom: 28, display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 20 }}>📚</span>
                <p style={{ fontSize: 14, color: "#333", lineHeight: 1.6 }}>
                  온라인 전공 수업 <strong style={{ color: NAVY }}>23개 개설</strong> — 자격증 없이도 수업만으로 전공 학점 충족 가능
                </p>
              </div>

              {/* 두 가지 플랜 비교 */}
              <p style={{ fontSize: 15, fontWeight: 700, color: "#111", marginBottom: 16 }}>두 가지 플랜 비교</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                {/* 자격증 포함 플랜 */}
                <div style={{ borderRadius: 16, background: NAVY, padding: "24px 22px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                    <p style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>자격증 포함 플랜</p>
                    <span style={{ fontSize: 12, fontWeight: 600, background: "#FFD700", color: "#111", padding: "3px 10px", borderRadius: 20 }}>추천</span>
                  </div>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", lineHeight: 1.7, marginBottom: 16 }}>
                    스포츠경영관리사 + 생활스포츠지도사 2급 활용
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#FFD700", flexShrink: 0 }} />
                      <span style={{ fontSize: 13, color: "rgba(255,255,255,0.9)" }}>스포츠경영관리사: 20학점 인정</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#FFD700", flexShrink: 0 }} />
                      <span style={{ fontSize: 13, color: "rgba(255,255,255,0.9)" }}>생활스포츠지도사 2급: 6학점 인정</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#FFD700", flexShrink: 0 }} />
                      <span style={{ fontSize: 13, color: "rgba(255,255,255,0.9)" }}>온라인 수업 3~4학기</span>
                    </div>
                  </div>
                  <div style={{ marginTop: 20, padding: "12px 16px", background: "rgba(255,255,255,0.1)", borderRadius: 10, textAlign: "center" }}>
                    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", marginBottom: 2 }}>예상 취득 시점</p>
                    <p style={{ fontSize: 20, fontWeight: 800, color: "#FFD700" }}>약 2년 (27년 2월)</p>
                  </div>
                </div>

                {/* 자격증 없는 플랜 */}
                <div style={{ borderRadius: 16, background: "#F8F9FA", border: "1px solid #e5e7eb", padding: "24px 22px" }}>
                  <p style={{ fontSize: 15, fontWeight: 700, color: "#111", marginBottom: 12 }}>자격증 없는 플랜</p>
                  <p style={{ fontSize: 13, color: "#666", lineHeight: 1.7, marginBottom: 16 }}>
                    온라인 수업만으로 학점 취득
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#555", flexShrink: 0 }} />
                      <span style={{ fontSize: 13, color: "#555" }}>온라인 전공 수업 5학기 이수</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#555", flexShrink: 0 }} />
                      <span style={{ fontSize: 13, color: "#555" }}>자격증 준비 부담 없음</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#555", flexShrink: 0 }} />
                      <span style={{ fontSize: 13, color: "#555" }}>기간이 더 소요됨</span>
                    </div>
                  </div>
                  <div style={{ marginTop: 20, padding: "12px 16px", background: "#e5e7eb", borderRadius: 10, textAlign: "center" }}>
                    <p style={{ fontSize: 13, color: "#666", marginBottom: 2 }}>예상 취득 시점</p>
                    <p style={{ fontSize: 20, fontWeight: 800, color: "#555" }}>약 2년 반 (28년 2월)</p>
                  </div>
                </div>
              </div>

              {/* 강조 배너 */}
              <div
                style={{
                  background: "#FFF7ED",
                  border: "1.5px solid #FED7AA",
                  borderRadius: 14,
                  padding: "16px 20px",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <span style={{ fontSize: 20 }}>⚡</span>
                <p style={{ fontSize: 14, color: "#92400E", lineHeight: 1.6, fontWeight: 600 }}>
                  자격증 2개로 약 1년 단축 가능 — 비용도 함께 줄어듭니다
                </p>
              </div>
            </div>
          )}

          {/* 타전공 탭 */}
          {activeTab === "타전공" && (
            <div style={{ background: "#ffffff", borderRadius: 20, padding: "36px 32px", border: "1px solid #e5e7eb" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#15803D", background: "#F0FDF4", padding: "3px 12px", borderRadius: 20 }}>타전공</span>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: "#111" }}>이미 학위가 있다면? 타전공으로 빠르게</h3>
              </div>
              <p style={{ fontSize: 13, color: "#888", marginBottom: 28 }}>기존 학위(전공)를 보유한 경우 전공 학점만 추가로 취득하면 됩니다</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* 전문학사 타전공 */}
                <div style={{ borderRadius: 16, border: "1px solid #e5e7eb", overflow: "hidden" }}>
                  <div style={{ background: "#EEF2FF", padding: "20px 22px" }}>
                    <p style={{ fontSize: 15, fontWeight: 700, color: NAVY }}>전문학사 타전공</p>
                  </div>
                  <div style={{ padding: "20px 22px" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: NAVY, flexShrink: 0, marginTop: 6 }} />
                        <span style={{ fontSize: 13, color: "#444", lineHeight: 1.6 }}>전공 <strong>36학점</strong>만 추가 취득하면 OK</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: NAVY, flexShrink: 0, marginTop: 6 }} />
                        <span style={{ fontSize: 13, color: "#444", lineHeight: 1.6 }}>전공필수 과목 충족 필수</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: NAVY, flexShrink: 0, marginTop: 6 }} />
                        <span style={{ fontSize: 13, color: "#444", lineHeight: 1.6 }}>교양·일반 학점은 기존 학위로 대체</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 학사 타전공 */}
                <div style={{ borderRadius: 16, border: "1px solid #e5e7eb", overflow: "hidden" }}>
                  <div style={{ background: "#EEF2FF", padding: "20px 22px" }}>
                    <p style={{ fontSize: 15, fontWeight: 700, color: NAVY }}>학사 타전공</p>
                  </div>
                  <div style={{ padding: "20px 22px" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: NAVY, flexShrink: 0, marginTop: 6 }} />
                        <span style={{ fontSize: 13, color: "#444", lineHeight: 1.6 }}>전공 <strong>48학점</strong>만 추가 취득하면 OK</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: NAVY, flexShrink: 0, marginTop: 6 }} />
                        <span style={{ fontSize: 13, color: "#444", lineHeight: 1.6 }}>전공필수 과목 충족 필수</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: NAVY, flexShrink: 0, marginTop: 6 }} />
                        <span style={{ fontSize: 13, color: "#444", lineHeight: 1.6 }}>교양·일반 학점은 기존 학위로 대체</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                style={{
                  background: "#F8F9FA",
                  borderRadius: 14,
                  padding: "16px 20px",
                  border: "1px solid #e5e7eb",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <span style={{ fontSize: 20 }}>⚠️</span>
                <p style={{ fontSize: 13, color: "#555", lineHeight: 1.6 }}>
                  타전공은 <strong>전공필수 과목 충족이 반드시 필요</strong>합니다. 충족 여부는 상담을 통해 정확히 확인해드립니다.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── 자격증 상세 섹션 ── */}
      <section className="w-full bg-white py-20 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-medium text-[#1a1aad] bg-[#EEF2FF] px-3 py-1 rounded-full mb-4 tracking-widest">
              학점 인정 자격증
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-black md:text-4xl mb-3">
              학점 인정 자격증 안내
            </h2>
            <p className="text-sm text-gray-500">체육학 학위 취득에 활용할 수 있는 주요 자격증입니다</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 생활스포츠지도사 2급 */}
            <div style={{ borderRadius: 20, border: "1px solid #e5e7eb", overflow: "hidden" }}>
              <div style={{ background: "#EEF2FF", padding: "24px 22px 18px" }}>
                <span style={{ fontSize: 30 }}>🏃</span>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: NAVY, marginTop: 10, marginBottom: 4 }}>생활스포츠지도사 2급</h3>
                <div style={{ display: "inline-block", background: NAVY, color: "#fff", fontSize: 12, fontWeight: 700, padding: "3px 12px", borderRadius: 20 }}>
                  6학점 인정
                </div>
              </div>
              <div style={{ padding: "18px 22px 24px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: NAVY, flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: "#444" }}>필기 + 실기 시험</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: NAVY, flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: "#444" }}>전문학사 전공 학점 필수 자격증</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: NAVY, flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: "#444" }}>체육 현장에서도 직접 활용 가능</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 스포츠경영관리사 */}
            <div style={{ borderRadius: 20, border: "1.5px solid " + NAVY, overflow: "hidden" }}>
              <div style={{ background: NAVY, padding: "24px 22px 18px" }}>
                <span style={{ fontSize: 30 }}>🏆</span>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: "#fff", marginTop: 10, marginBottom: 4 }}>스포츠경영관리사</h3>
                <div style={{ display: "inline-block", background: "#FFD700", color: "#111", fontSize: 12, fontWeight: 700, padding: "3px 12px", borderRadius: 20 }}>
                  20학점 인정
                </div>
              </div>
              <div style={{ padding: "18px 22px 24px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: NAVY, flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: "#444" }}>필기 + 실기 시험</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: NAVY, flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: "#444" }}>시험 연 3회 응시 가능</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: NAVY, flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: "#444" }}>학사 기간 단축에 가장 효과적</span>
                  </div>
                </div>
              </div>
            </div>

            {/* TESAT */}
            <div style={{ borderRadius: 20, border: "1px solid #e5e7eb", overflow: "hidden" }}>
              <div style={{ background: "#F0FDF4", padding: "24px 22px 18px" }}>
                <span style={{ fontSize: 30 }}>📝</span>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: "#15803D", marginTop: 10, marginBottom: 4 }}>TESAT</h3>
                <div style={{ display: "inline-block", background: "#15803D", color: "#fff", fontSize: 12, fontWeight: 700, padding: "3px 12px", borderRadius: 20 }}>
                  일반학점 인정
                </div>
              </div>
              <div style={{ padding: "18px 22px 24px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#15803D", flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: "#444" }}>거의 매월 시험 진행</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#15803D", flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: "#444" }}>2~3주 준비로 합격 가능</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#15803D", flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: "#444" }}>일반 선택 학점 부족 시 활용</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ 섹션 ── */}
      <FAQSection />

      {/* ── 하단 CTA 섹션 ── */}
      <section className="py-24" style={{ background: NAVY }}>
        <div className="mx-auto max-w-6xl px-4 md:px-6 text-center">
          <h2 className="text-2xl font-extrabold text-white md:text-3xl">
            내 상황에 맞는 최적의 플랜이 궁금하다면
          </h2>
          <p className="mt-3 text-sm md:text-base" style={{ color: "rgba(255,255,255,0.7)" }}>
            전담 컨설턴트가 1:1로 분석해드립니다
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
