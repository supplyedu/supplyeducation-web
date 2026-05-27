"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const NAVY = "#1a1aad";

const EDU_LABELS: Record<string, string> = {
  고졸: "고졸",
  전문대졸2: "전문대졸 2년제",
  전문대졸3: "전문대졸 3년제",
  중퇴: "대학 중퇴·재학",
  graduated: "대졸",
};

const CALC_GOALS = [
  { label: "빠른 학위취득",               type: "학사" },
  { label: "기사 응시자격",               type: "기사" },
  { label: "산업기사 응시자격",           type: "산업기사" },
  { label: "사회복지사 2급",              type: "사복" },
  { label: "보육교사 2급",                type: "보육" },
  { label: "체육학사",                    type: "학사" },
  { label: "미용학위(종합미용면허증)",     type: "미용" },
  { label: "아동학 학위",                 type: "학사" },
  { label: "심리학 학위",                 type: "학사" },
  { label: "컴퓨터공학사",               type: "학사" },
  { label: "전기공학사",                  type: "학사" },
  { label: "사이버대 편입",               type: "편입" },
  { label: "방통대 편입",                 type: "편입" },
];

const CALC_CERTS = [
  { name: "매경TEST S·1급",   credit: 18 },
  { name: "SMAT 1급",         credit: 10 },
  { name: "SMAT 2급",         credit:  6 },
  { name: "한경TESAT S·1급",  credit: 18 },
  { name: "기타 자격증",       credit: 10 },
];

const EDU_CREDITS: Record<string, number> = {
  고졸: 0, 전문대졸2: 80, 전문대졸3: 120, 중퇴: 0, graduated: 0,
};

export default function CreditCalculator() {
  const [goal, setGoal]           = useState("");
  const [edu, setEdu]             = useState("");
  const [ownCredit, setOwnCredit] = useState(0);
  const [certs, setCerts]         = useState<Set<string>>(new Set());
  const router = useRouter();

  const goalType    = CALC_GOALS.find((g) => g.label === goal)?.type ?? "";
  const eduCredit   = EDU_CREDITS[edu] ?? 0;
  const certCredits = certs.has("없음")
    ? 0
    : CALC_CERTS.filter((c) => certs.has(c.name)).reduce((s, c) => s + c.credit, 0);
  const held        = Math.min(ownCredit + eduCredit + certCredits, 130);

  let period = "—";
  let cost   = "—";

  if ((goalType === "기사" || goalType === "산업기사") && edu === "graduated") {
    period   = "확인 필요";
    cost     = "확인 필요";
  } else if (goalType === "보육") {
    period   = "최대 1년";
    cost     = "약 105만원";
  } else if (goalType === "사복") {
    if (edu === "고졸" && ownCredit === 0) {
      period   = "최대 1.5년";
      cost     = "약 63만원";
    } else {
      period   = "최대 1년";
      cost     = "약 54만원";
    }
  } else if (goalType === "편입") {
    period   = "최대 6개월";
    cost     = "약 75만원";
  } else if (goalType === "기사") {
    const remain    = Math.max(106 - held, 0);
    const subjects  = Math.max(Math.ceil(remain / 3), 6);
    const semesters = Math.ceil(subjects / 7);
    const perSem    = Math.ceil(subjects / semesters) * 9;
    cost   = `약 ${perSem}만원`;
    period =
      remain <= 24 ? "약 4개월" :
      remain <= 48 ? "약 8개월" :
      remain <= 90 ? "약 1년"   :
                     "약 1.5년";
  } else if (goalType === "산업기사") {
    const remain   = Math.max(41 - held, 0);
    const subjects = Math.ceil(remain / 3);
    if (remain === 0) {
      period = "조건 충족";
      cost   = "추가 수강 불필요";
    } else {
      const semesters = Math.ceil(subjects / 7);
      const perSem    = Math.ceil(subjects / semesters) * 9;
      cost   = `약 ${perSem}만원`;
      period =
        remain <= 24 ? "약 4개월" :
        remain <= 48 ? "약 8개월" :
        remain <= 90 ? "약 1년"   :
                       "약 1.5년";
    }
  } else if (goalType === "학사" || goalType === "미용") {
    const unitCost  = goalType === "미용" ? 12 : 9;
    const remain    = Math.max(140 - held, 0);
    const subjects  = Math.ceil(remain / 3);
    const semesters = Math.ceil(subjects / 7);
    const perSem    = Math.ceil(subjects / semesters) * unitCost;

    if (remain === 0) {
      period = "조건 충족";
      cost   = "추가 수강 불필요";
    } else {
      cost   = `약 ${perSem}만원`;
      period =
        remain <= 24 ? "약 4개월"  :
        remain <= 48 ? "약 8개월"  :
        remain <= 90 ? "약 1년"    :
                       "약 1.5년";
    }
  }

  function handleConsult() {
    const certList = Array.from(certs).filter((c) => c !== "없음").join(",");
    const params = new URLSearchParams({
      from: "calculator",
      course: goal,
      edu: EDU_LABELS[edu] ?? edu,
      credits: String(ownCredit),
      certs: certList,
      period,
      cost,
    });
    router.push("/apply?" + params.toString());
  }

  const selCls =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100";

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-2xl px-6">
        {/* 뱃지 + 타이틀 */}
        <div className="mb-8 flex flex-col items-center text-center">
          <span
            className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-semibold"
            style={{ background: "#EEF2FF", color: NAVY }}
          >
            무료 견적 계산기
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-black md:text-4xl">
            내 상황에 맞는 기간과 비용 확인하기
          </h2>
          <p className="mt-2 text-sm" style={{ color: "rgba(0,0,0,0.5)" }}>
            목표와 현재 상황을 입력하면 바로 계산됩니다.
          </p>
        </div>

        {/* 결과 박스 */}
        <style>{`
          @keyframes slotRoll {
            0%   { transform: translateY(-100%); opacity: 0; }
            60%  { transform: translateY(8px);   opacity: 1; }
            100% { transform: translateY(0);     opacity: 1; }
          }
        `}</style>
        <div className="mb-8 rounded-xl px-6 py-5" style={{ background: NAVY }}>
          <div className="grid grid-cols-2">
            <div className="border-r border-white/20 pr-6">
              <p className="mb-1 text-xs font-medium" style={{ color: "rgba(255,255,255,0.6)" }}>예상 기간</p>
              <div style={{ overflow: "hidden" }}>
                <p
                  key={period}
                  className="text-2xl font-bold text-white md:text-3xl"
                  style={{ animation: "slotRoll 0.4s ease-out" }}
                >
                  {period}
                </p>
              </div>
            </div>
            <div className="pl-6">
              <p className="mb-1 text-xs font-medium" style={{ color: "rgba(255,255,255,0.6)" }}>예상 비용</p>
              <div style={{ overflow: "hidden" }}>
                <p
                  key={cost}
                  className="text-2xl font-bold text-white md:text-3xl"
                  style={{ animation: "slotRoll 0.4s ease-out" }}
                >
                  <span>{cost}</span>
                  {cost.includes("만원") && (
                    <span style={{ fontSize: "12px", opacity: 0.7, marginLeft: "4px" }}>/ 학기당</span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Step 1 */}
        <div className="mb-5">
          <p className="mb-2 text-sm font-semibold text-black">Step 1. 목표 과정</p>
          <select
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className={selCls}
            style={{ color: goal === "" ? "#9ca3af" : "#111827" }}
          >
            <option value="">목표 과정을 선택하세요</option>
            {CALC_GOALS.map((g) => (
              <option key={g.label} value={g.label}>{g.label}</option>
            ))}
          </select>
        </div>

        {/* Step 2 */}
        <div className="mb-5">
          <p className="mb-2 text-sm font-semibold text-black">Step 2. 현재 상황</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <select
              value={edu}
              onChange={(e) => setEdu(e.target.value)}
              className={selCls}
              style={{ color: edu === "" ? "#9ca3af" : "#111827" }}
            >
              <option value="">최종 학력</option>
              <option value="고졸">고졸</option>
              <option value="전문대졸2">전문대졸 2년제</option>
              <option value="전문대졸3">전문대졸 3년제</option>
              <option value="graduated">대졸</option>
              <option value="중퇴">대학 중퇴·재학</option>
            </select>
            <select
              value={ownCredit}
              onChange={(e) => setOwnCredit(Number(e.target.value))}
              className={selCls}
              style={{ color: "#111827" }}
            >
              <option value={0}>보유 학점: 없음</option>
              <option value={10}>보유 학점: 10학점 내외</option>
              <option value={20}>보유 학점: 20학점 내외</option>
              <option value={30}>보유 학점: 30학점 내외</option>
              <option value={40}>보유 학점: 40학점 내외</option>
              <option value={50}>보유 학점: 50학점 내외</option>
              <option value={60}>보유 학점: 60학점 내외</option>
              <option value={80}>보유 학점: 80학점 내외</option>
              <option value={100}>보유 학점: 100학점 내외</option>
            </select>
          </div>
        </div>

        {/* Step 3 */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold text-black">Step 3. 보유 자격증 <span className="font-normal" style={{ color: "rgba(0,0,0,0.4)" }}>(복수 선택 가능)</span></p>
          <div className="flex flex-wrap gap-2">
            {/* 없음 칩 */}
            <button
              onClick={() => setCerts(new Set(["없음"]))}
              className="rounded-full px-4 py-2 text-sm font-medium transition-colors"
              style={
                certs.has("없음")
                  ? { backgroundColor: "#1a1aad", color: "#ffffff", border: "1.5px solid #1a1aad" }
                  : { background: "#FFFFFF", color: "#000000", border: "1.5px solid #d1d5db" }
              }
            >
              없음
            </button>

            {CALC_CERTS.map((cert) => {
              const on = certs.has(cert.name);
              return (
                <button
                  key={cert.name}
                  onClick={() =>
                    setCerts((prev) => {
                      const next = new Set(prev);
                      next.delete("없음");
                      on ? next.delete(cert.name) : next.add(cert.name);
                      if (next.size === 0) next.add("없음");
                      return next;
                    })
                  }
                  className="rounded-full px-4 py-2 text-sm font-medium transition-colors"
                  style={
                    on
                      ? { backgroundColor: "#1a1aad", color: "#ffffff", border: "1.5px solid #1a1aad" }
                      : cert.name === "기타 자격증"
                      ? { background: "#FFFFFF", color: "#000000", border: "1.5px dashed #d1d5db" }
                      : { background: "#FFFFFF", color: "#000000", border: "1.5px solid #d1d5db" }
                  }
                >
                  {cert.name === "기타 자격증"
                    ? "기타 자격증"
                    : <>{cert.name} <span style={{ color: on ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.4)" }}>+{cert.credit}학점</span></>
                  }
                </button>
              );
            })}
          </div>
        </div>


        {/* 주의사항 */}
        <p style={{ fontSize: "12px", color: "#888888", textAlign: "center", lineHeight: 1.8, marginBottom: "12px" }}>
          ※ 위 견적은 입력 정보 기반의 예상 수치로,<br />
          실제 비용 및 기간은 보유 학점 인정 여부에 따라 달라질 수 있습니다.<br />
          정확한 견적은 무료 상담을 통해 확인해드립니다.
        </p>

        {/* CTA */}
        <button
          onClick={handleConsult}
          className="block w-full rounded-xl py-4 text-center text-base font-bold text-white transition-colors"
          style={{ background: "#000000" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = NAVY)}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#000000")}
        >
          무료 상담 신청하기 →
        </button>
      </div>
    </section>
  );
}
