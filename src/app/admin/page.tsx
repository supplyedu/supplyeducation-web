"use client";

import { useEffect, useState } from "react";

interface Submission {
  no: number;
  name: string;
  phone: string;
  status: string;
  utm: string;
  date: string;
  course: string;
  calculatorData: string;
}

interface CalcData {
  course?: string;
  edu?: string;
  credits?: string;
  certs?: string;
  period?: string;
  cost?: string;
}

const PASS = "supply2024";

export default function AdminPage() {
  const [auth, setAuth] = useState(false);
  const [pw, setPw] = useState("");
  const [pwError, setPwError] = useState(false);
  const [data, setData] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");

  useEffect(() => {
    if (!auth) return;
    setLoading(true);
    fetch("/api/get-submissions")
      .then((r) => r.json())
      .then((json) => {
        if (json.success) setData(json.data);
        else setFetchError(json.error ?? "데이터 조회 실패");
      })
      .catch(() => setFetchError("네트워크 오류가 발생했습니다"))
      .finally(() => setLoading(false));
  }, [auth]);

  function handleLogin() {
    if (pw === PASS) {
      setAuth(true);
      setPwError(false);
    } else {
      setPwError(true);
    }
  }

  if (!auth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="w-80 rounded-2xl bg-white p-8 shadow-lg">
          <h1 className="mb-6 text-xl font-bold text-gray-800">관리자</h1>
          <input
            type="password"
            placeholder="비밀번호"
            value={pw}
            onChange={(e) => { setPw(e.target.value); setPwError(false); }}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          />
          {pwError && <p className="mt-2 text-xs text-red-500">비밀번호가 올바르지 않습니다</p>}
          <button
            onClick={handleLogin}
            className="mt-4 w-full rounded-lg py-3 text-sm font-bold text-white"
            style={{ background: "#1B2A4A" }}
          >
            확인
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">상담 신청 현황</h1>
          <span className="text-sm text-gray-400">총 {data.length}건</span>
        </div>

        {loading && <p className="text-gray-500">불러오는 중...</p>}
        {fetchError && <p className="text-red-500">{fetchError}</p>}

        <div className="space-y-3">
          {data.map((row) => {
            let calc: CalcData | null = null;
            try {
              if (row.calculatorData) calc = JSON.parse(row.calculatorData);
            } catch { /* invalid JSON */ }
            const hasCalc = calc && Object.values(calc).some(Boolean);

            return (
              <div key={row.no} className="rounded-xl bg-white p-5 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs text-gray-400">#{row.no}</span>
                    <span className="font-bold text-gray-800">{row.name}</span>
                    <span className="text-sm text-gray-600">{row.phone}</span>
                    {row.course && (
                      <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs text-blue-600">
                        {row.course}
                      </span>
                    )}
                    {row.status && (
                      <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
                        {row.status}
                      </span>
                    )}
                  </div>
                  <div className="text-right text-xs text-gray-400">
                    <p>{row.date}</p>
                    {row.utm && row.utm !== "-" && <p className="mt-0.5 text-gray-300">{row.utm}</p>}
                  </div>
                </div>

                {hasCalc && (
                  <div
                    className="mt-3 rounded-lg p-3"
                    style={{ background: "#F8FAFF", border: "1px solid #e0e7ff" }}
                  >
                    <p className="mb-1.5 font-semibold" style={{ fontSize: 12, color: "#555" }}>계산기 입력 정보</p>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-0.5" style={{ fontSize: 12, color: "#666" }}>
                      {calc!.course   && <span>관심 과정: {calc!.course}</span>}
                      {calc!.edu      && <span>최종 학력: {calc!.edu}</span>}
                      {calc!.credits  && <span>보유 학점: {calc!.credits === "0" ? "없음" : `${calc!.credits}학점 내외`}</span>}
                      {calc!.certs    && <span>보유 자격증: {calc!.certs}</span>}
                      {calc!.period && calc!.period !== "—" && <span>예상 기간: {calc!.period}</span>}
                      {calc!.cost   && calc!.cost   !== "—" && <span>예상 비용: {calc!.cost}</span>}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
