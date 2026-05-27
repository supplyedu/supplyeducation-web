"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const NAVY = "#1B2A4A";
const ACCENT = "#7A9EC7";
const BLUE = "#2563EB";

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 3) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
}

export default function ApplyPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    course: "",
    status: "",
    privacy: false,
  });
  const [fromCalc, setFromCalc] = useState(false);
  const [utm, setUtm] = useState({
    source: "",
    medium: "",
    campaign: "",
  });
  const [calcData, setCalcData] = useState({ course: "", edu: "", credits: "", certs: "", period: "", cost: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setUtm({
      source: params.get("utm_source") ?? "",
      medium: params.get("utm_medium") ?? "",
      campaign: params.get("utm_campaign") ?? "",
    });
    const cd = {
      course:  params.get("course")  ?? "",
      edu:     params.get("edu")     ?? "",
      credits: params.get("credits") ?? "",
      certs:   params.get("certs")   ?? "",
      period:  params.get("period")  ?? "",
      cost:    params.get("cost")    ?? "",
    };
    setCalcData(cd);
    const isFromCalc = params.get("from") === "calculator";
    setFromCalc(isFromCalc);
    if (cd.course) setForm((prev) => ({ ...prev, course: cd.course }));
  }, []);

  const isValid =
    form.name.trim() !== "" &&
    form.phone.replace(/\D/g, "").length >= 10 &&
    (fromCalc || (form.course !== "" && form.status !== "")) &&
    form.privacy;

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setForm((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else if (name === "phone") {
      setForm((prev) => ({ ...prev, phone: formatPhone(value) }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isValid || submitting) return;
    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          course: form.course,
          status: form.status,
          calculatorData: Object.values(calcData).some(Boolean) ? JSON.stringify(calcData) : undefined,
          utm_source: utm.source,
          utm_medium: utm.medium,
          utm_campaign: utm.campaign,
        }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error ?? "오류가 발생했습니다");

      // Meta Pixel 리드 전환 이벤트
      if (typeof fbq !== "undefined") {
        fbq("track", "Lead");
      }
      // GTM dataLayer 이벤트
      if (typeof window !== "undefined" && window.dataLayer) {
        window.dataLayer.push({
          event: "form_submit",
          form_type: "consultation",
          page: "physical-education",
        });
      }

      setSubmitted(true);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "오류가 발생했습니다. 다시 시도해주세요."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen font-sans antialiased" style={{ background: "#F9FAFB" }}>
      <div className="mx-auto max-w-lg px-4 py-8">

        {/* ① 돌아가기 링크 */}
        <Link
          href="/"
          className="mb-5 inline-block text-sm text-gray-400 hover:text-gray-600"
        >
          ← 메인으로 돌아가기
        </Link>

        {submitted ? (
          /* 성공 화면 */
          <div className="rounded-2xl bg-white p-10 text-center shadow-lg">
            <div className="mb-4 text-5xl">🎉</div>
            <h2 className="text-xl font-bold" style={{ color: NAVY }}>
              상담 신청이 완료되었습니다!
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-500">
              빠른 시일 내에 연락드리겠습니다.
              <br />
              전담 컨설턴트가 24시간 이내에 연락드릴 예정입니다.
            </p>
            <Link
              href="/"
              className="mt-8 inline-block rounded-lg px-6 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
              style={{ background: NAVY }}
            >
              랜딩 페이지로 돌아가기
            </Link>
          </div>
        ) : (
          <>
            {/* ② 헤더 카드 */}
            <div className="rounded-t-2xl px-6 py-8" style={{ background: NAVY }}>
              <p className="mb-3 text-sm font-semibold" style={{ color: ACCENT }}>
                서플라이에듀
              </p>
              <h1 className="text-2xl font-bold leading-snug text-white">
                1:1 맞춤 상담 신청
              </h1>
              <p className="mt-2 text-sm text-white/70">
                24시간 이내에 전담 컨설턴트가 직접 연락드립니다
              </p>
            </div>

            {/* ③ 신뢰 배지 바 */}
            <div
              className="flex flex-wrap justify-center gap-x-8 gap-y-1.5 px-6 py-3"
              style={{ background: "#EEF2FF" }}
            >
              {["누적 수강생 8,000명+", "학위·자격증 취득률 97.3%"].map((badge) => (
                <span key={badge} className="text-sm font-medium text-gray-600">
                  <span style={{ color: BLUE }}>✓</span> {badge}
                </span>
              ))}
            </div>

            {/* ④ 폼 카드 */}
            <form
              onSubmit={handleSubmit}
              className="rounded-b-2xl bg-white px-6 py-8 shadow-lg"
              noValidate
            >
              {/* 계산기 입력 정보 — from=calculator 일 때만 표시 */}
              {fromCalc && Object.values(calcData).some(Boolean) && (
                <div className="mb-5 rounded-lg border p-3" style={{ background: "#EEF2FF", borderColor: "#1a1aad", fontSize: 13 }}>
                  <p className="mb-1.5 font-semibold text-gray-700">계산기 입력 정보</p>
                  {calcData.course   && <p className="text-gray-600">관심 과정: {calcData.course}</p>}
                  {calcData.edu      && <p className="text-gray-600">최종 학력: {calcData.edu}</p>}
                  {calcData.credits  && <p className="text-gray-600">보유 학점: {calcData.credits === "0" ? "없음" : `${calcData.credits}학점 내외`}</p>}
                  {calcData.certs    && <p className="text-gray-600">보유 자격증: {calcData.certs}</p>}
                  {calcData.period && calcData.period !== "—" && <p className="text-gray-600">예상 기간: {calcData.period}</p>}
                </div>
              )}

              {/* 관심 과정 — 직접 유입 시만 표시 */}
              {!fromCalc && (
                <div className="mb-5">
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                    관심 과정 <span className="text-red-400">*</span>
                  </label>
                  <select
                    name="course"
                    value={form.course}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                    style={{ color: form.course === "" ? "#9ca3af" : "#111827" }}
                  >
                    <option value="" disabled>선택해주세요</option>
                    <option value="기사·산업기사 응시자격">기사·산업기사 응시자격</option>
                    <option value="사회복지사 2급">사회복지사 2급</option>
                    <option value="보육교사 2급">보육교사 2급</option>
                    <option value="체육학사">체육학사</option>
                    <option value="미용학위(종합미용면허증)">미용학위(종합미용면허증)</option>
                    <option value="컴퓨터공학사">컴퓨터공학사</option>
                    <option value="전기공학사">전기공학사</option>
                    <option value="빠른 학위취득">빠른 학위취득</option>
                    <option value="아동학 학위">아동학 학위</option>
                    <option value="심리학 학위">심리학 학위</option>
                    <option value="사이버대 편입">사이버대 편입</option>
                    <option value="방통대 편입">방통대 편입</option>
                    <option value="기타">기타</option>
                  </select>
                </div>
              )}

              {/* 이름 */}
              <div className="mb-5">
                <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                  이름 <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="홍길동"
                  required
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition-colors focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* 연락처 */}
              <div className="mb-5">
                <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                  연락처 <span className="text-red-400">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="010-0000-0000"
                  required
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition-colors focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* 현재 상태 — 직접 유입 시만 표시 */}
              {!fromCalc && (
                <div className="mb-5">
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                    현재 상태 <span className="text-red-400">*</span>
                  </label>
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                    style={{ color: form.status === "" ? "#9ca3af" : "#111827" }}
                  >
                    <option value="" disabled>선택해주세요</option>
                    <option value="high_school">고등학교 졸업</option>
                    <option value="college">대학교 중퇴·재학</option>
                    <option value="worker">직장인</option>
                    <option value="athlete">선수·코치 출신</option>
                    <option value="other">기타</option>
                  </select>
                </div>
              )}

              {/* 개인정보 동의 */}
              <div className="mb-7 rounded-lg border border-gray-100 bg-gray-50 p-4">
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    name="privacy"
                    checked={form.privacy}
                    onChange={handleChange}
                    className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-blue-600"
                  />
                  <div>
                    <span className="text-sm font-semibold text-gray-700">
                      [필수] 개인정보 수집 및 이용에 동의합니다.
                    </span>
                    <p className="mt-1 text-xs leading-relaxed text-gray-400">
                      수집된 정보는 상담 목적으로만 사용되며, 상담 완료 후 안전하게 폐기됩니다.
                    </p>
                  </div>
                </label>
              </div>

              {/* 에러 메시지 */}
              {submitError && (
                <p className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                  {submitError}
                </p>
              )}

              {/* 제출 버튼 */}
              <button
                type="submit"
                disabled={!isValid || submitting}
                className="w-full rounded-lg py-4 text-base font-bold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
                style={{ background: NAVY }}
              >
                {submitting ? "신청 중…" : "상담 신청 완료"}
              </button>
            </form>

            {/* 개인정보 보호 안내 */}
            <p className="mt-4 text-center text-xs text-gray-400">
              🔒 개인정보는 안전하게 보호합니다
            </p>
          </>
        )}
      </div>
    </div>
  );
}
