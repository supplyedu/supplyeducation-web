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
    q: "컴퓨터공학 온라인 수업만으로 학위 취득이 가능한가요?",
    a: "가능합니다. 다만 자격증과 독학사를 병행하면 기간과 비용을 크게 줄일 수 있습니다. 온라인 수업만으로 진행할 경우 학사 기준 약 3~4년이 소요될 수 있으며, 자격증을 2~3개 활용하면 1~2년 단축이 가능합니다.",
  },
  {
    q: "전문학사와 학사 중 어떤 걸 선택해야 하나요?",
    a: "목적에 따라 다릅니다. 산업기사 응시 자격이나 빠른 학위 취득이 목적이라면 전문학사(80학점), 기사 자격증 응시나 완전한 학력 인정이 목적이라면 학사(140학점)를 추천드립니다. 상담을 통해 상황에 맞는 경로를 안내해드립니다.",
  },
  {
    q: "직장 다니면서도 가능한가요?",
    a: "100% 온라인 수업이라 직장인도 충분히 가능합니다. 정해진 시간표가 없어 퇴근 후나 주말에 수강할 수 있고, 스마트폰으로도 수강이 가능합니다. 실제로 현직 개발자분들이 자격증·학위 동시 취득을 위해 많이 활용하고 계십니다.",
  },
  {
    q: "자격증은 몇 개까지 인정되나요?",
    a: "전문학사는 전공 자격증 최대 2개 + 일반 자격증 1개, 학사는 전공 자격증 최대 3개 + 일반 자격증 1개까지 인정됩니다. 단, 전문학사에서 인정되는 자격증이 학사에서는 인정되지 않는 경우도 있으니 반드시 사전에 확인이 필요합니다.",
  },
  {
    q: "이미 다른 전공 학위가 있는데 컴공 학사를 추가로 딸 수 있나요?",
    a: "가능합니다. 타전공 과정으로 전공 48학점만 채우면 컴퓨터공학 학사를 추가 취득할 수 있습니다. 기존 학위의 교양·일반 학점을 그대로 인정받기 때문에 빠르면 2학기 만에 새로운 학사 취득도 가능합니다.",
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
        <p className="text-sm text-gray-500 mb-10">컴퓨터공학 학위 취득에 대해 가장 많이 물어보시는 질문들을 모았어요</p>
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

/* ── 불릿 리스트 헬퍼 ── */
function Bullets({ items, color = NAVY }: { items: string[]; color?: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {items.map((t) => (
        <div key={t} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: color, flexShrink: 0, marginTop: 6 }} />
          <span style={{ fontSize: 13, color: "#444", lineHeight: 1.6 }}>{t}</span>
        </div>
      ))}
    </div>
  );
}

/* ── 메인 페이지 ── */
export default function ComputerPage() {
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
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 70% 50%, rgba(255,255,255,0.04) 0%, transparent 60%)" }} />
        <div className="relative mx-auto w-full max-w-6xl px-4 md:px-6" style={{ zIndex: 2 }}>
          <div className="max-w-2xl" style={{ wordBreak: "keep-all" }}>
            <span
              className="mb-6 inline-block rounded-full px-4 py-1 text-xs font-semibold tracking-widest"
              style={{ background: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.85)" }}
            >
              컴퓨터공학 학위 취득 안내
            </span>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl">
              <span className="block">컴퓨터공학 학위,</span>
              <span className="block mt-2">실무 경력에 학력까지 더하세요</span>
            </h1>
            <p className="mt-6 text-lg font-medium text-white/80 md:text-xl" style={{ lineHeight: 1.7 }}>
              고졸 개발자, 연봉협상과 진급에서 막히고 계신가요?<br />
              학점은행제로 컴퓨터공학 학사를 취득하실 수 있습니다
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
                <Bullets items={[
                  "과목당 3학점 인정",
                  "한 학기 최대 8과목 수강",
                  "1년 최대 14과목 (연간 최대 42학점)",
                  "시간·장소 제약 없이 수강 가능",
                ]} />
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
                <Bullets items={[
                  "전문학사 최대 2개, 학사 최대 3개 인정",
                  "전공필수 학점으로도 인정 가능",
                  "일반 자격증 추가 1개 인정 가능",
                  "기간·비용 동시 단축 효과",
                ]} />
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
                <Bullets color="#15803D" items={[
                  "1단계: 교양 학점 인정",
                  "2단계: 교양 + 전공 학점 인정",
                  "과목당 4~5학점, 60점 이상 합격",
                  "수업 없이 시험으로 학점 취득",
                ]} />
              </div>
            </div>
          </div>

          {/* 기존 학점 배너 */}
          <div style={{ background: "#F8F9FA", borderRadius: 14, padding: "16px 24px", display: "flex", alignItems: "center", gap: 12, border: "1px solid #e5e7eb" }}>
            <span style={{ fontSize: 20 }}>🎓</span>
            <p style={{ fontSize: 14, color: "#444", lineHeight: 1.6 }}>
              <strong>기존 대학 학점도 가져올 수 있습니다.</strong>{" "}
              한 학기라도 다닌 대학의 학점은 최대 140학점까지 인정됩니다. 보유 학점이 많을수록 취득 기간이 줄어듭니다.
            </p>
          </div>
        </div>
      </section>

      {/* ── 과정별 플랜 섹션 ── */}
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

          {/* ── 전문학사 탭 ── */}
          {activeTab === "전문학사" && (
            <div style={{ background: "#ffffff", borderRadius: 20, padding: "36px 32px", border: "1px solid #e5e7eb" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: NAVY, background: "#EEF2FF", padding: "3px 12px", borderRadius: 20 }}>전문학사</span>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: "#111" }}>컴퓨터네트워크 전공</h3>
              </div>
              <p style={{ fontSize: 13, color: "#888", marginBottom: 28 }}>총 80학점 필요 · 전공 45학점 + 교양 15학점</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {[
                  { label: "총 필요 학점", value: "80학점", sub: "전공 45 + 교양 15 + 일반 20", color: NAVY },
                  { label: "자격증 인정 한도", value: "전공 2개 + 일반 1개", sub: "전공필수 학점으로도 인정", color: NAVY },
                  { label: "산업기사 응시 조건", value: "41학점 충족 시", sub: "학위 취득 중 자격증 도전 가능", color: "#15803D" },
                ].map((item) => (
                  <div key={item.label} style={{ background: "#F8F9FA", borderRadius: 14, padding: "20px 18px", textAlign: "center" }}>
                    <p style={{ fontSize: 11, color: "#888", marginBottom: 6, fontWeight: 600, letterSpacing: "0.05em" }}>{item.label}</p>
                    <p style={{ fontSize: 15, fontWeight: 700, color: item.color, marginBottom: 4 }}>{item.value}</p>
                    <p style={{ fontSize: 12, color: "#666" }}>{item.sub}</p>
                  </div>
                ))}
              </div>

              <div style={{ background: "#EEF2FF", borderRadius: 14, padding: "20px 24px", marginBottom: 20 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: NAVY, marginBottom: 10 }}>추천 자격증 조합</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13, color: "#333" }}>
                    <span>컴퓨터활용능력 1급</span>
                    <span style={{ fontWeight: 700, color: NAVY }}>14학점 인정</span>
                  </div>
                  <div style={{ height: 1, background: "#C7D2FE" }} />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13, color: "#333" }}>
                    <span>컴퓨터활용능력 2급</span>
                    <span style={{ fontWeight: 700, color: NAVY }}>6학점 인정</span>
                  </div>
                </div>
              </div>

              <div style={{ background: "#F8F9FA", border: "1px solid #e5e7eb", borderRadius: 12, padding: "14px 18px", display: "flex", alignItems: "flex-start", gap: 10 }}>
                <span style={{ fontSize: 16, flexShrink: 0 }}>ℹ️</span>
                <p style={{ fontSize: 13, color: "#555", lineHeight: 1.6 }}>
                  전공필수 과목은 반드시 이수해야 합니다. 자격증으로 전공필수 학점을 대체할 수 있는지는 상담을 통해 확인해드립니다.
                </p>
              </div>
            </div>
          )}

          {/* ── 학사 탭 ── */}
          {activeTab === "학사" && (
            <div style={{ background: "#ffffff", borderRadius: 20, padding: "36px 32px", border: "1px solid #e5e7eb" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: NAVY, background: "#EEF2FF", padding: "3px 12px", borderRadius: 20 }}>학사</span>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: "#111" }}>컴퓨터공학 전공</h3>
              </div>
              <p style={{ fontSize: 13, color: "#888", marginBottom: 28 }}>총 140학점 필요 · 전공 60학점 + 교양 30학점</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {[
                  { label: "총 필요 학점", value: "140학점", sub: "전공 60 + 교양 30 + 일반 50", color: NAVY },
                  { label: "자격증 인정 한도", value: "전공 3개 + 일반 1개", sub: "전공필수 학점 대체 가능 여부 확인 필요", color: NAVY },
                  { label: "기사 응시 조건", value: "106학점 충족 시", sub: "산업기사는 41학점부터 가능", color: "#15803D" },
                ].map((item) => (
                  <div key={item.label} style={{ background: "#F8F9FA", borderRadius: 14, padding: "20px 18px", textAlign: "center" }}>
                    <p style={{ fontSize: 11, color: "#888", marginBottom: 6, fontWeight: 600, letterSpacing: "0.05em" }}>{item.label}</p>
                    <p style={{ fontSize: 15, fontWeight: 700, color: item.color, marginBottom: 4 }}>{item.value}</p>
                    <p style={{ fontSize: 12, color: "#666" }}>{item.sub}</p>
                  </div>
                ))}
              </div>

              <div style={{ background: "#EEF2FF", borderRadius: 14, padding: "20px 24px", marginBottom: 16 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: NAVY, marginBottom: 10 }}>추천 자격증 조합</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {[
                    { name: "기사 자격증 (정보처리기사 등)", credit: "20학점", note: "106학점 이상 응시" },
                    { name: "산업기사 (정보처리산업기사 등)", credit: "16학점", note: "41학점 이상 응시" },
                    { name: "컴퓨터활용능력 1급", credit: "14학점", note: "전공 자격증" },
                    { name: "컴퓨터활용능력 2급", credit: "6학점", note: "일반 자격증" },
                  ].map((item, i, arr) => (
                    <div key={item.name}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                          <span style={{ fontSize: 13, color: "#333" }}>{item.name}</span>
                          <span style={{ fontSize: 11, color: "#888", marginLeft: 8 }}>({item.note})</span>
                        </div>
                        <span style={{ fontSize: 13, fontWeight: 700, color: NAVY, whiteSpace: "nowrap", marginLeft: 12 }}>{item.credit}</span>
                      </div>
                      {i < arr.length - 1 && <div style={{ height: 1, background: "#C7D2FE", marginTop: 8 }} />}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: 12, padding: "14px 18px", display: "flex", alignItems: "flex-start", gap: 10 }}>
                <span style={{ fontSize: 16, flexShrink: 0 }}>⚠️</span>
                <p style={{ fontSize: 13, color: "#92400E", lineHeight: 1.6 }}>
                  전문학사에서 인정되는 자격증이 학사에서는 인정되지 않는 경우도 있습니다. 과정 변경 시 반드시 사전 확인이 필요합니다.
                </p>
              </div>
            </div>
          )}

          {/* ── 타전공 탭 ── */}
          {activeTab === "타전공" && (
            <div style={{ background: "#ffffff", borderRadius: 20, padding: "36px 32px", border: "1px solid #e5e7eb" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#15803D", background: "#F0FDF4", padding: "3px 12px", borderRadius: 20 }}>타전공</span>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: "#111" }}>이미 학위가 있다면? 타전공으로 빠르게</h3>
              </div>
              <p style={{ fontSize: 13, color: "#888", marginBottom: 28 }}>기존 학위 보유 시 전공 학점만 추가 취득하면 됩니다</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div style={{ borderRadius: 16, border: "1px solid #e5e7eb", overflow: "hidden" }}>
                  <div style={{ background: "#EEF2FF", padding: "20px 22px" }}>
                    <p style={{ fontSize: 15, fontWeight: 700, color: NAVY }}>전문학사 타전공</p>
                    <p style={{ fontSize: 12, color: "#6366F1", marginTop: 2 }}>컴퓨터네트워크</p>
                  </div>
                  <div style={{ padding: "20px 22px" }}>
                    <Bullets items={[
                      "전공 36학점만 추가 취득하면 OK",
                      "자격증은 전공 자격증 최대 1개까지 인정",
                      "전공필수 과목 충족 필수",
                      "교양·일반 학점은 기존 학위로 대체",
                    ]} />
                  </div>
                </div>
                <div style={{ borderRadius: 16, border: "1px solid #e5e7eb", overflow: "hidden" }}>
                  <div style={{ background: "#EEF2FF", padding: "20px 22px" }}>
                    <p style={{ fontSize: 15, fontWeight: 700, color: NAVY }}>학사 타전공</p>
                    <p style={{ fontSize: 12, color: "#6366F1", marginTop: 2 }}>컴퓨터공학</p>
                  </div>
                  <div style={{ padding: "20px 22px" }}>
                    <Bullets items={[
                      "전공 48학점만 추가 취득하면 OK",
                      "자격증은 전공 자격증 최대 1개까지 인정",
                      "전공필수 과목 충족 필수",
                      "교양·일반 학점은 기존 학위로 대체",
                    ]} />
                  </div>
                </div>
              </div>

              <div style={{ background: "#EEF2FF", border: "1.5px solid #C7D2FE", borderRadius: 14, padding: "18px 22px", display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 20 }}>⚡</span>
                <p style={{ fontSize: 14, color: NAVY, fontWeight: 600, lineHeight: 1.6 }}>
                  이미 학사가 있으시면 빠르면 2학기 만에 새로운 컴퓨터공학 학사 취득 가능
                </p>
              </div>
            </div>
          )}
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
              컴퓨터공학 학점 인정 자격증
            </h2>
            <p className="text-sm text-gray-500">자격증 선택 전 반드시 확인하세요</p>
          </div>

          {/* 주의사항 */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
            {[
              "전문학사: 전공 자격증 최대 2개 + 일반 자격증 1개까지 인정",
              "학사: 전공 자격증 최대 3개 + 일반 자격증 1개까지 인정",
              "인정 학점 대비 난이도가 쉬운 가성비 자격증 위주로 준비할 것을 권장합니다",
            ].map((t) => (
              <div key={t} style={{ display: "flex", alignItems: "flex-start", gap: 12, background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: 12, padding: "14px 18px" }}>
                <span style={{ fontSize: 16, flexShrink: 0 }}>⚠️</span>
                <span style={{ fontSize: 13, color: "#92400E", lineHeight: 1.6 }}>{t}</span>
              </div>
            ))}
          </div>

          {/* 자격증 카드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                emoji: "💻",
                name: "컴퓨터활용능력 1급",
                badge: "14학점 인정",
                badgeBg: NAVY,
                badgeText: "#fff",
                headerBg: "#EEF2FF",
                headerTextColor: NAVY,
                bulletColor: NAVY,
                items: [
                  "전공 자격증으로 인정",
                  "필기 + 실기 시험",
                  "2급 대비 높은 학점 인정으로 가성비 우수",
                  "상대적으로 준비 기간이 짧음",
                ],
              },
              {
                emoji: "🖥️",
                name: "컴퓨터활용능력 2급",
                badge: "6학점 인정",
                badgeBg: "#6366F1",
                badgeText: "#fff",
                headerBg: "#EEF2FF",
                headerTextColor: NAVY,
                bulletColor: NAVY,
                items: [
                  "일반 자격증으로 인정 (타전공 영역)",
                  "전공 한도와 별도로 활용 가능",
                  "취득 난이도가 낮아 빠른 준비 가능",
                  "일반 선택 학점 부족 시 유용",
                ],
              },
              {
                emoji: "🏆",
                name: "기사 자격증 (정보처리기사 등)",
                badge: "20학점 인정",
                badgeBg: "#FFD700",
                badgeText: "#111",
                headerBg: NAVY,
                headerTextColor: "#fff",
                bulletColor: NAVY,
                items: [
                  "106학점 이상 보유 시 응시 가능",
                  "전공 자격증 중 최대 학점 인정",
                  "필기 + 실기 시험",
                  "취업·승진에서 가장 높은 활용도",
                ],
              },
              {
                emoji: "🔧",
                name: "산업기사 (정보처리산업기사 등)",
                badge: "16학점 인정",
                badgeBg: "#C2410C",
                badgeText: "#fff",
                headerBg: "#FFF7ED",
                headerTextColor: "#C2410C",
                bulletColor: "#C2410C",
                items: [
                  "41학점 이상 보유 시 응시 가능",
                  "학위 취득 중간에 도전 가능",
                  "필기 + 실기 시험",
                  "기사 도전 전 단계로 활용 가능",
                ],
              },
            ].map((card) => (
              <div key={card.name} style={{ borderRadius: 20, border: card.headerBg === NAVY ? `1.5px solid ${NAVY}` : "1px solid #e5e7eb", overflow: "hidden" }}>
                <div style={{ background: card.headerBg, padding: "24px 22px 18px" }}>
                  <span style={{ fontSize: 28 }}>{card.emoji}</span>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: card.headerTextColor, marginTop: 10, marginBottom: 8 }}>{card.name}</h3>
                  <div style={{ display: "inline-block", background: card.badgeBg, color: card.badgeText, fontSize: 12, fontWeight: 700, padding: "3px 12px", borderRadius: 20 }}>
                    {card.badge}
                  </div>
                </div>
                <div style={{ padding: "18px 22px 24px" }}>
                  <Bullets color={card.bulletColor} items={card.items} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 방통대/사이버대 비교 섹션 ── */}
      <section className="w-full bg-[#F8F9FA] py-20 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-medium text-[#1a1aad] bg-[#EEF2FF] px-3 py-1 rounded-full mb-4 tracking-widest">
              제도 비교
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-black md:text-4xl mb-3">
              학점은행제 vs 방통대·사이버대,<br />뭐가 다를까?
            </h2>
            <p className="text-sm text-gray-500">제도 차이를 이해하면 더 빠른 길이 보입니다</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* 방통대/사이버대 */}
            <div style={{ borderRadius: 20, background: "#ffffff", border: "1px solid #e5e7eb", overflow: "hidden" }}>
              <div style={{ background: "#F8F9FA", padding: "24px 24px 18px", borderBottom: "1px solid #e5e7eb" }}>
                <p style={{ fontSize: 17, fontWeight: 700, color: "#555" }}>방통대 · 사이버대</p>
              </div>
              <div style={{ padding: "22px 24px 28px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {[
                    { label: "운영 방식", value: "학년제 운영" },
                    { label: "이수 조건", value: "정해진 학년 순서대로 이수 필요" },
                    { label: "기간 단축", value: "자격증·독학사 활용 불가, 단축 어려움" },
                    { label: "자격증 인정", value: "학점으로 인정되지 않음" },
                    { label: "예상 기간", value: "2~4년 (단축 불가)" },
                  ].map((row) => (
                    <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, paddingBottom: 12, borderBottom: "1px solid #f0f0f0" }}>
                      <span style={{ fontSize: 12, color: "#888", fontWeight: 600, flexShrink: 0 }}>{row.label}</span>
                      <span style={{ fontSize: 13, color: "#555", textAlign: "right" }}>{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 학점은행제 */}
            <div style={{ borderRadius: 20, background: "#ffffff", border: "1.5px solid " + NAVY, overflow: "hidden" }}>
              <div style={{ background: NAVY, padding: "24px 24px 18px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <p style={{ fontSize: 17, fontWeight: 700, color: "#fff" }}>학점은행제</p>
                  <span style={{ fontSize: 12, fontWeight: 600, background: "#FFD700", color: "#111", padding: "3px 10px", borderRadius: 20 }}>추천</span>
                </div>
              </div>
              <div style={{ padding: "22px 24px 28px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {[
                    { label: "운영 방식", value: "학점제 운영" },
                    { label: "이수 조건", value: "필요한 학점만 자유롭게 채우면 OK" },
                    { label: "기간 단축", value: "자격증·독학사 병행으로 획기적 단축 가능" },
                    { label: "자격증 인정", value: "최대 20학점까지 인정" },
                    { label: "예상 기간", value: "최단 1~2년 (조합에 따라 유동적)" },
                  ].map((row) => (
                    <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, paddingBottom: 12, borderBottom: "1px solid #f0f0f0" }}>
                      <span style={{ fontSize: 12, color: "#888", fontWeight: 600, flexShrink: 0 }}>{row.label}</span>
                      <span style={{ fontSize: 13, color: NAVY, fontWeight: 600, textAlign: "right" }}>{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 강조 배너 */}
          <div style={{ background: "#EEF2FF", border: "1.5px solid #C7D2FE", borderRadius: 14, padding: "18px 24px", display: "flex", alignItems: "center", gap: 12, textAlign: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 20 }}>🎯</span>
            <p style={{ fontSize: 15, color: NAVY, fontWeight: 700 }}>
              빠른 학위 취득이 목적이라면 학점은행제가 가장 적합합니다
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ 섹션 ── */}
      <FAQSection />

      {/* ── 하단 CTA 섹션 ── */}
      <section className="py-24" style={{ background: NAVY }}>
        <div className="mx-auto max-w-6xl px-4 md:px-6 text-center">
          <h2 className="text-2xl font-extrabold text-white md:text-3xl">
            내 상황에 맞는 컴퓨터공학 플랜이 궁금하다면
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
        <div className="mx-auto max-w-6xl px-4 md:px-6 text-center text-xs" style={{ color: "rgba(0,0,0,0.4)" }}>
          <p className="font-semibold" style={{ color: "rgba(0,0,0,0.6)" }}>서플라이에듀케이션</p>
          <p className="mt-1">© {new Date().getFullYear()} Supply Education. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
