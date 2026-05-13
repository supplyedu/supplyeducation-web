"use client";

import { useState } from "react";
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
    status: "",
    privacy: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const isValid =
    form.name.trim() !== "" &&
    form.phone.replace(/\D/g, "").length >= 10 &&
    form.status !== "" &&
    form.privacy;

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setForm((prev) => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else if (name === "phone") {
      setForm((prev) => ({ ...prev, phone: formatPhone(value) }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isValid || submitting) return;
    setSubmitting(true);
    setTimeout(() => {
      console.log("상담 신청 데이터:", form);
      setSubmitting(false);
      setSubmitted(true);
    }, 800);
  }

  return (
    <div className="min-h-screen font-sans antialiased" style={{ background: "#F9FAFB" }}>
      <div className="mx-auto max-w-lg px-4 py-8">

        {/* ① 돌아가기 링크 */}
        <Link
          href="/physical-education"
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
              href="/physical-education"
              className="mt-8 inline-block rounded-lg px-6 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
              style={{ background: NAVY }}
            >
              랜딩 페이지로 돌아가기
            </Link>
          </div>
        ) : (
          <>
            {/* ② 헤더 카드 */}
            <div
              className="rounded-t-2xl px-6 py-8"
              style={{ background: NAVY }}
            >
              <p className="mb-3 text-sm font-semibold" style={{ color: ACCENT }}>
                서플라이에듀
              </p>
              <h1 className="text-2xl font-bold leading-snug text-white">
                체육학 학위 1:1 맞춤 상담 신청
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
              {["누적 수강생 8,000명+", "학위 취득률 96%"].map((badge) => (
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

              {/* 현재 상태 */}
              <div className="mb-6">
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
