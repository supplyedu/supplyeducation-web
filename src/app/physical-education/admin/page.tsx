"use client";

import { useState } from "react";

const NAVY = "#1B2A4A";
const ACCENT = "#7A9EC7";
const PASSWORD = "supply2026";

type Submission = {
  no: number;
  name: string;
  phone: string;
  status: string;
  utm: string;
  date: string;
};

export default function AdminPage() {
  const [pw, setPw] = useState("");
  const [pwError, setPwError] = useState("");
  const [authed, setAuthed] = useState(false);

  const [data, setData] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");

  async function fetchData() {
    setLoading(true);
    setFetchError("");
    try {
      const res = await fetch("/api/get-submissions");
      const json = await res.json();
      if (!json.success) throw new Error(json.error ?? "조회 실패");
      setData(json.data);
    } catch (err) {
      setFetchError(
        err instanceof Error ? err.message : "데이터를 불러오지 못했습니다."
      );
    } finally {
      setLoading(false);
    }
  }

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (pw === PASSWORD) {
      setAuthed(true);
      fetchData();
    } else {
      setPwError("비밀번호가 올바르지 않습니다.");
    }
  }

  /* ── 비밀번호 화면 ── */
  if (!authed) {
    return (
      <div
        className="flex min-h-screen items-center justify-center font-sans antialiased"
        style={{ background: "#F9FAFB" }}
      >
        <div className="w-full max-w-sm rounded-2xl bg-white px-8 py-10 shadow-lg">
          <div
            className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl text-white"
            style={{ background: NAVY }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <h1 className="mb-1 text-xl font-bold" style={{ color: NAVY }}>
            관리자 로그인
          </h1>
          <p className="mb-6 text-sm text-gray-400">상담 신청 내역을 확인합니다</p>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={pw}
              onChange={(e) => { setPw(e.target.value); setPwError(""); }}
              placeholder="비밀번호 입력"
              className="mb-3 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              autoFocus
            />
            {pwError && (
              <p className="mb-3 text-xs text-red-500">{pwError}</p>
            )}
            <button
              type="submit"
              className="w-full rounded-lg py-3 text-sm font-bold text-white"
              style={{ background: NAVY }}
            >
              확인
            </button>
          </form>
        </div>
      </div>
    );
  }

  /* ── 관리자 테이블 화면 ── */
  return (
    <div className="min-h-screen font-sans antialiased" style={{ background: "#F9FAFB" }}>
      {/* 헤더 */}
      <header className="px-6 py-5 shadow-sm" style={{ background: NAVY }}>
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div>
            <p className="text-xs font-semibold" style={{ color: ACCENT }}>
              서플라이에듀 관리자
            </p>
            <h1 className="mt-0.5 text-lg font-bold text-white">
              상담 신청 내역
            </h1>
          </div>
          <div className="flex items-center gap-3">
            {!loading && (
              <span className="rounded-full px-3 py-1 text-xs font-semibold text-white" style={{ background: "rgba(255,255,255,0.15)" }}>
                총 {data.length}건
              </span>
            )}
            <button
              onClick={fetchData}
              disabled={loading}
              className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-80 disabled:opacity-50"
              style={{ background: ACCENT }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 2v6h-6" /><path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
                <path d="M3 22v-6h6" /><path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
              </svg>
              새로고침
            </button>
          </div>
        </div>
      </header>

      {/* 본문 */}
      <main className="mx-auto max-w-6xl px-4 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-24 text-gray-400">
            <svg className="mr-2 animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
            불러오는 중…
          </div>
        ) : fetchError ? (
          <div className="rounded-xl bg-red-50 px-6 py-5 text-sm text-red-600">
            {fetchError}
          </div>
        ) : data.length === 0 ? (
          <div className="py-24 text-center text-sm text-gray-400">
            신청 내역이 없습니다.
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl bg-white shadow-md">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ background: NAVY }}>
                    {["번호", "이름", "연락처", "현재 상태", "UTM", "신청일시"].map((h) => (
                      <th
                        key={h}
                        className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-white/80"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, i) => (
                    <tr
                      key={row.no}
                      className="border-b border-gray-100 last:border-0"
                      style={{ background: i % 2 === 0 ? "#fff" : "#F9FAFB" }}
                    >
                      <td className="px-4 py-3 text-gray-400">{row.no}</td>
                      <td className="px-4 py-3 font-medium text-gray-800">{row.name}</td>
                      <td className="px-4 py-3 text-gray-600">{row.phone}</td>
                      <td className="px-4 py-3">
                        <span
                          className="rounded-full px-2.5 py-0.5 text-xs font-medium"
                          style={{ background: `${ACCENT}20`, color: NAVY }}
                        >
                          {row.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-400">{row.utm || "-"}</td>
                      <td className="px-4 py-3 text-gray-500">{row.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
