"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import { MessageCircle, ClipboardList, Laptop, Award, ChevronRight, ChevronDown } from "lucide-react";

const CreditCalculator = dynamic(
  () => import("@/components/CreditCalculator"),
  { loading: () => <div className="h-96" />, ssr: false }
);

const NAVY = "#1a1aad";


/* ── 오도미터: 단일 자릿수 ── */
function OdometerDigit({
  digit,
  duration,
  trigger,
}: {
  digit: number;
  duration: number;
  trigger: boolean;
}) {
  const stripRef = useRef<HTMLSpanElement>(null);
  const didAnimate = useRef(false);

  useEffect(() => {
    // 초기 표시: 최종값으로 즉시 세팅 / 라이브 업데이트: 부드럽게 전환
    const strip = stripRef.current;
    if (!strip) return;
    strip.style.transition = didAnimate.current ? "transform 350ms ease-out" : "none";
    strip.style.transform = `translateY(-${20 + digit}em)`;
  }, [digit]);

  useEffect(() => {
    // trigger 시 0으로 리셋 후 최종값까지 오도미터 애니메이션
    const strip = stripRef.current;
    if (!strip || !trigger) return;
    strip.style.transition = "none";
    strip.style.transform = "translateY(-10em)";
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        strip.style.transition = `transform ${duration}ms cubic-bezier(0.25, 1, 0.5, 1)`;
        strip.style.transform = `translateY(-${20 + digit}em)`;
        setTimeout(() => { didAnimate.current = true; }, duration);
      });
    });
  }, [trigger]);

  return (
    <span
      style={{
        display: "inline-block",
        height: "1em",
        lineHeight: "1em",
        overflow: "hidden",
        verticalAlign: "top",
      }}
    >
      <span
        ref={stripRef}
        style={{ display: "block" }}
      >
        {Array.from({ length: 30 }, (_, i) => i % 10).map((n, i) => (
          <span
            key={i}
            style={{ display: "block", height: "1em", lineHeight: "1em" }}
          >
            {n}
          </span>
        ))}
      </span>
    </span>
  );
}

/* ── 통계 항목 (Intersection Observer + 오도미터) ── */
function StatItem({
  final,
  label,
  stopAt,
  divider,
}: {
  final: string;
  label: string;
  stopAt: number;
  divider?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        requestAnimationFrame(() => setTrigger(true));
      },
      { threshold: 0.3 }
    );
    const timer = setTimeout(() => observer.observe(el), 100);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  const parts = final.split("").map((c) =>
    /\d/.test(c)
      ? { type: "digit" as const, value: parseInt(c, 10) }
      : { type: "fixed" as const, value: c }
  );

  return (
    <div
      ref={ref}
      className="flex flex-col items-center justify-center px-6 py-4 text-center"
      style={divider ? { borderRight: "0.5px solid #e5e5e5" } : undefined}
    >
      <p
        className="text-3xl font-bold md:text-5xl"
        style={{ lineHeight: 1.1, color: NAVY }}
      >
        {parts.map((part, i) =>
          part.type === "digit" ? (
            <OdometerDigit
              key={i}
              digit={part.value}
              duration={stopAt}
              trigger={trigger}
            />
          ) : (
            <span
              key={i}
              style={{
                display: "inline-block",
                verticalAlign: "top",
                lineHeight: "1em",
              }}
            >
              {part.value}
            </span>
          )
        )}
      </p>
      <p className="mt-3 text-xs font-bold text-black md:text-sm">{label}</p>
    </div>
  );
}

/* ── 실시간 누적 수강생 카운터 ── */
function LiveCounter() {
  const count = 8200;
  const ref = useRef<HTMLDivElement>(null);
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        requestAnimationFrame(() => setTrigger(true));
      },
      { threshold: 0.3 }
    );
    const timer = setTimeout(() => observer.observe(el), 100);
    return () => { clearTimeout(timer); observer.disconnect(); };
  }, []);

  const formatted = count.toLocaleString("ko-KR"); // "8,200"
  const parts = formatted.split("").map((c) =>
    /\d/.test(c)
      ? { type: "digit" as const, value: parseInt(c, 10) }
      : { type: "fixed" as const, value: c }
  );

  return (
    <div ref={ref} className="flex flex-col items-center justify-center px-6 py-4 text-center" style={{ borderRight: "0.5px solid #e5e5e5" }}>
      <p className="whitespace-nowrap text-3xl font-bold md:text-5xl" style={{ lineHeight: 1.1, color: NAVY }}>
        {parts.map((part, i) =>
          part.type === "digit" ? (
            <OdometerDigit key={i} digit={part.value} duration={1500} trigger={trigger} />
          ) : (
            <span key={i} style={{ display: "inline-block", verticalAlign: "top", lineHeight: "1em" }}>
              {part.value}
            </span>
          )
        )}
        <span style={{ display: "inline-block", verticalAlign: "top", lineHeight: "1em" }}>+</span>
      </p>
      <p className="mt-3 text-xs font-bold text-black md:text-sm">실시간 누적 수강생</p>
    </div>
  );
}

/* ── 후기 ticker ── */
const reviewData = [
  { src: "/reviews/review-1.png" },
  { src: "/reviews/review-2.png" },
  { src: "/reviews/review-3.png" },
  { src: "/reviews/review-4.png" },
  { src: "/reviews/review-5.png" },
  { src: "/reviews/review-6.png" },
  { src: "/reviews/review-7.png" },
  { src: "/reviews/review-8.png" },
  { src: "/reviews/review-9.png" },
  { src: "/reviews/review-10.png" },
  { src: "/reviews/review-11.png" },
  { src: "/reviews/review-12.png" },
  { src: "/reviews/review-13.png" },
  { src: "/reviews/review-14.png" },
  { src: "/reviews/review-15.png" },
  { src: "/reviews/review-16.png" },
  { src: "/reviews/review-17.png" },
  { src: "/reviews/review-18.png" },
  { src: "/reviews/review-19.png" },
  { src: "/reviews/review-20.png" },
  { src: "/reviews/review-21.png" },
  { src: "/reviews/review-22.png" },
  { src: "/reviews/review-23.png" },
  { src: "/reviews/review-24.png" },
  { src: "/reviews/review-25.png" },
  { src: "/reviews/review-26.png" },
  { src: "/reviews/review-27.png" },
  { src: "/reviews/review-28.png" },
  { src: "/reviews/review-29.png" },
  { src: "/reviews/review-30.png" },
  { src: "/reviews/review-31.png" },
  { src: "/reviews/review-32.png" },
  { src: "/reviews/review-33.png" },
  { src: "/reviews/review-34.png" },
  { src: "/reviews/review-35.png" },
  { src: "/reviews/review-36.png" },
  { src: "/reviews/review-37.png" },
  { src: "/reviews/review-38.png" },
  { src: "/reviews/review-39.png" },
  { src: "/reviews/review-40.png" },
  { src: "/reviews/review-41.png" },
  { src: "/reviews/review-42.png" },
  { src: "/reviews/review-43.png" },
  { src: "/reviews/review-44.png" },
  { src: "/reviews/review-45.png" },
  { src: "/reviews/review-46.png" },
  { src: "/reviews/review-47.png" },
  { src: "/reviews/review-48.png" },
  { src: "/reviews/review-49.png" },
  { src: "/reviews/review-50.png" },
  { src: "/reviews/review-51.png" },
  { src: "/reviews/review-52.png" },
  { src: "/reviews/review-53.png" },
  { src: "/reviews/review-54.png" },
  { src: "/reviews/review-55.png" },
  { src: "/reviews/review-56.png" },
  { src: "/reviews/review-57.png" },
  { src: "/reviews/review-58.png" },
  { src: "/reviews/review-59.png" },
  { src: "/reviews/review-60.png" },
  { src: "/reviews/review-61.png" },
  { src: "/reviews/review-62.png" },
  { src: "/reviews/review-63.png" },
  { src: "/reviews/review-64.png" },
  { src: "/reviews/review-65.png" },
  { src: "/reviews/review-66.png" },
  { src: "/reviews/review-67.png" },
  { src: "/reviews/review-68.png" },
  { src: "/reviews/review-69.png" },
  { src: "/reviews/review-70.png" },
  { src: "/reviews/review-71.png" },
  { src: "/reviews/review-72.png" },
  { src: "/reviews/review-73.png" },
  { src: "/reviews/review-74.png" },
  { src: "/reviews/review-75.png" },
  { src: "/reviews/review-76.png" },
  { src: "/reviews/review-77.png" },
  { src: "/reviews/review-78.png" },
  { src: "/reviews/review-79.png" },
  { src: "/reviews/review-80.png" },
  { src: "/reviews/review-81.png" },
  { src: "/reviews/review-82.png" },
  { src: "/reviews/review-83.png" },
  { src: "/reviews/review-84.png" },
  { src: "/reviews/review-85.png" },
  { src: "/reviews/review-86.png" },
];

/* 1행: review-1~6, 2행: review-44~49 (6장 × 4복사 = 24개씩) */
const ROW1 = reviewData.slice(0, 6);
const ROW2 = reviewData.slice(43, 49);

/* 이미지 1장 너비(135) + gap(10) = 145px, 6장 = 870px */
const IMG_W = 135;
const GAP   = 10;
const SET_W = (IMG_W + GAP) * 6; // 870px

function ReviewTicker() {
  const [lightbox, setLightbox] = useState<{ src: string } | null>(null);
  const [paused, setPaused]     = useState(false);
  const sectionRef              = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setLightbox(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setPaused(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const playState = paused ? "paused" : "running";
  const row1Items = [...ROW1, ...ROW1, ...ROW1, ...ROW1];
  const row2Items = [...ROW2, ...ROW2, ...ROW2, ...ROW2];

  return (
    <section
      ref={sectionRef}
      className="bg-[#F8F9FA] pb-20 pt-10"
      style={{ contain: "layout style paint", overflow: "hidden" }}
    >
      <style>{`
        @keyframes ticker-ltr {
          from { transform: translateX(0); }
          to   { transform: translateX(-${SET_W}px); }
        }
        @keyframes ticker-rtl {
          from { transform: translateX(-${SET_W}px); }
          to   { transform: translateX(0); }
        }
      `}</style>

      {/* 1행: 왼쪽으로 흐름 */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        <div
          style={{
            display: "flex",
            gap: GAP,
            width: "max-content",
            willChange: "transform",
            transform: "translateZ(0)",
            animation: `ticker-ltr 60s linear infinite`,
            animationPlayState: playState,
          }}
        >
          {row1Items.map((item, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src={item.src}
              alt=""
              loading="lazy"
              decoding="async"
              onClick={() => setLightbox(item)}
              style={{
                height: 180,
                width: "auto",
                borderRadius: 10,
                flexShrink: 0,
                cursor: "pointer",
              }}
            />
          ))}
        </div>
      </div>

      {/* 2행: 오른쪽으로 흐름 */}
      <div style={{ position: "relative", overflow: "hidden", marginTop: 10 }}>
        <div
          style={{
            display: "flex",
            gap: GAP,
            width: "max-content",
            willChange: "transform",
            transform: "translateZ(0)",
            animation: `ticker-rtl 60s linear infinite`,
            animationPlayState: playState,
          }}
        >
          {row2Items.map((item, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src={item.src}
              alt=""
              loading="lazy"
              decoding="async"
              onClick={() => setLightbox(item)}
              style={{
                height: 180,
                width: "auto",
                borderRadius: 10,
                flexShrink: 0,
                cursor: "pointer",
              }}
            />
          ))}
        </div>
      </div>

      {/* 인용 텍스트 */}
      <div style={{ paddingTop: "40px", paddingBottom: "64px", paddingLeft: "20px", paddingRight: "20px", textAlign: "center" }}>
        <div style={{ marginBottom: "48px" }}>
          <p style={{ fontSize: "20px", fontWeight: 500, color: "#1a1aad", lineHeight: 1.8, textAlign: "center" }}>"진짜 감사합니다!"</p>
          <p style={{ fontSize: "20px", fontWeight: 500, color: "#1a1aad", lineHeight: 1.8, textAlign: "center" }}>"멘토님이랑 하길 잘했어요!"</p>
          <p style={{ fontSize: "20px", fontWeight: 500, color: "#1a1aad", lineHeight: 1.8, textAlign: "center" }}>"덕분에 잘 마무리했어요!"</p>
        </div>
        <p className="text-2xl font-bold tracking-tight md:text-3xl" style={{ color: "#000000", marginBottom: "8px" }}>
          포기만 하지마세요!
        </p>
        <p className="text-2xl font-bold tracking-tight md:text-3xl" style={{ color: "#000000", textDecoration: "underline", textUnderlineOffset: "6px" }}>
          서플라이에듀는 끝까지 책임집니다
        </p>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.85)",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            zIndex: 9999,
            overflowY: "auto",
            paddingTop: "40px",
            paddingBottom: "40px",
            paddingLeft: "20px",
            paddingRight: "20px",
          }}
        >
          <button
            onClick={() => setLightbox(null)}
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              background: "none",
              border: "none",
              color: "#FFFFFF",
              fontSize: 32,
              lineHeight: 1,
              cursor: "pointer",
            }}
            aria-label="닫기"
          >
            ×
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={lightbox.src}
            alt=""
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "90vw",
              width: "auto",
              height: "auto",
              objectFit: "contain",
              borderRadius: "12px",
              display: "block",
            }}
          />
        </div>
      )}
    </section>
  );
}

const TEAM = [
  "/team/team-01.png", "/team/team-02.png", "/team/team-03.png",
  "/team/team-04.png", "/team/team-05.png", "/team/team-06.png",
  "/team/team-07.png", "/team/team-08.png", "/team/team-09.jpg",
  "/team/team-10.png", "/team/team-11.png",
];

const faqs = [
  {
    q: "일반 대학교 졸업장이랑 똑같이 인정되나요?",
    a: "네, 법적으로 100% 똑같은 학력으로 인정받습니다. 취업할 때 이력서에 당당하게 쓸 수 있고, 다른 대학교로 편입하거나 대학원에 진학할 때도 일반 대학교 졸업자와 완벽하게 똑같은 자격을 갖춥니다. 불이익이 있을까 걱정하지 않으셔도 됩니다!"
  },
  {
    q: "어떻게 기간을 줄일 수 있는건가요?",
    a: "수업을 듣는 것 외에도 관련 자격증을 따거나 시험을 보면 학위를 따는 기간을 절반 가까이 줄일 수 있습니다. 고등학교 졸업자 기준으로 4년제 학위도 보통 2년에서 2년 반이면 충분히 취득할 수 있습니다. 이게 학점은행제의 가장 큰 장점이죠!"
  },
  {
    q: "수업은 전부 온라인으로 듣나요?",
    a: "네, 대부분의 과정이 100% 온라인으로 진행됩니다. 가장 많이 선택하시는 경영학, 심리학, 아동학 등의 전공은 일부 실습 과목을 제외하면 직접 출석할 필요가 없습니다. 집에서 컴퓨터나 스마트폰으로 편하게 수강하실 수 있습니다."
  },
  {
    q: "비용이 중간에 추가로 드는 건 없나요?",
    a: "맞습니다. 플랜에 포함된 과목 외 추가 비용은 없어요. 처음 상담에서 전체 비용을 투명하게 안내해드려요."
  },
  {
    q: "직장 다니면서도 가능할까요?",
    a: "물론입니다! 실제로 정말 많은 직장인 분들이 일과 학업을 병행하고 있습니다. 정해진 시간표가 없기 때문에 퇴근 후 늦은 밤이나 주말에 몰아서 수업을 들을 수 있습니다. 스마트폰으로도 수강이 가능해서 출퇴근 자투리 시간을 활용하기 아주 좋습니다."
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
                  : { border: "0.5px solid #e5e7eb", background: "transparent", padding: "0 4px" }
                ),
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
                  }}
                />
              </button>
              {openIndex === i && (
                <div className="px-5 pb-4 text-sm leading-relaxed text-gray-500">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamSection() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(4);
  const prev = (activeIndex - 1 + 11) % 11;
  const next = (activeIndex + 1) % 11;

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((p) => (p + 1) % 11);
    }, 3500);
    return () => clearInterval(id);
  }, []);

  return (
    <section style={{ background: "#1a1aad", padding: "72px 32px" }}>
      {/* 상단 텍스트 */}
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            background: "rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.7)",
            fontSize: 11,
            padding: "4px 12px",
            borderRadius: 20,
            marginBottom: 20,
          }}
        >
          직접 움직이는 팀
        </div>
        <p style={{ fontSize: 28, fontWeight: 700, color: "#ffffff", lineHeight: 1.35, marginBottom: 12 }}>
          믿을 수 있는 담당자,<br />서플라이에듀가 유일합니다
        </p>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>
          저희는 직접 발로 뛰며 보여드립니다.<br />학점은행제 정보부터 학습자 인터뷰까지<br />신뢰를 최우선으로 생각합니다.
        </p>
      </div>

      {/* 캐러셀 */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginTop: 40 }}>
        {/* prev */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={TEAM[prev]}
          alt=""
          loading="lazy"
          decoding="async"
          onClick={() => setActiveIndex(prev)}
          className="w-[120px] h-[75px] md:w-[180px] md:h-[113px]"
          style={{ opacity: 0.45, borderRadius: 12, objectFit: "cover", cursor: "pointer", transition: "all 0.5s ease" }}
        />
        {/* curr */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={TEAM[activeIndex]}
          alt=""
          loading="lazy"
          decoding="async"
          className="w-[220px] h-[138px] md:w-[340px] md:h-[213px]"
          style={{ opacity: 1, borderRadius: 14, objectFit: "cover", border: "2px solid rgba(255,255,255,0.3)", transition: "all 0.5s ease" }}
        />
        {/* next */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={TEAM[next]}
          alt=""
          loading="lazy"
          decoding="async"
          onClick={() => setActiveIndex(next)}
          className="w-[120px] h-[75px] md:w-[180px] md:h-[113px]"
          style={{ opacity: 0.45, borderRadius: 12, objectFit: "cover", cursor: "pointer", transition: "all 0.5s ease" }}
        />
      </div>

      {/* 인디케이터 */}
      <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 24 }}>
        {TEAM.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            style={{
              width: i === activeIndex ? 16 : 6,
              height: 6,
              borderRadius: 9999,
              background: i === activeIndex ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.3)",
              border: "none",
              padding: 0,
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>

      {/* 상담 버튼 */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: 28 }}>
        <button
          onClick={() => router.push("/apply")}
          style={{
            background: "#ffffff",
            color: "#1a1aad",
            fontSize: 14,
            fontWeight: 600,
            padding: "12px 28px",
            borderRadius: 30,
            border: "none",
            cursor: "pointer",
          }}
        >
          1:1 상담 바로가기 →
        </button>
      </div>
    </section>
  );
}

/* ── 페이지 ── */
export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDegreesOpen, setIsDegreesOpen] = useState(false);
  const [isDegreesLocked, setIsDegreesLocked] = useState(false);
  const degreesRef = useRef<HTMLDivElement>(null);
  const [isQualOpen, setIsQualOpen] = useState(false);
  const [isQualLocked, setIsQualLocked] = useState(false);
  const qualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isDegreesLocked) return;
    const handler = (e: MouseEvent) => {
      if (degreesRef.current && !degreesRef.current.contains(e.target as Node)) {
        setIsDegreesOpen(false);
        setIsDegreesLocked(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isDegreesLocked]);

  useEffect(() => {
    if (!isQualLocked) return;
    const handler = (e: MouseEvent) => {
      if (qualRef.current && !qualRef.current.contains(e.target as Node)) {
        setIsQualOpen(false);
        setIsQualLocked(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isQualLocked]);

  return (
    <div className="flex min-h-screen flex-col font-sans text-black antialiased">

      {/* ── 네비게이션 바 ── */}
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
            style={{
              color: isScrolled ? "#000000" : "#FFFFFF",
              transition: "color 0.3s",
            }}
          >
            서플라이에듀케이션
          </Link>
          <div className="flex items-center gap-6">
            <div
              ref={degreesRef}
              className="relative hidden sm:block"
              onMouseEnter={() => { if (!isDegreesLocked) setIsDegreesOpen(true); }}
              onMouseLeave={() => { if (!isDegreesLocked) setIsDegreesOpen(false); }}
            >
              <button
                className="flex items-center gap-1 text-sm font-medium hover:opacity-70"
                style={{ color: isScrolled ? "#000000" : "#FFFFFF", transition: "color 0.3s", background: "none", border: "none", cursor: "pointer", padding: 0 }}
                onClick={() => {
                  const next = !isDegreesLocked;
                  setIsDegreesLocked(next);
                  setIsDegreesOpen(next);
                }}
              >
                학위취득
                <ChevronDown
                  size={14}
                  style={{ transition: "transform 0.2s", transform: isDegreesOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                />
              </button>
              {isDegreesOpen && (
                <div style={{ position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)", marginTop: 8, background: "#ffffff", borderRadius: 10, boxShadow: "0 4px 20px rgba(0,0,0,0.12)", overflow: "hidden", minWidth: 130, zIndex: 100 }}>
                  <Link href="/majors" className="block px-5 py-3 text-sm text-gray-800 hover:text-[#1a1aad] hover:bg-gray-50 whitespace-nowrap transition-colors">경영 아동 심리 등</Link>
                  <Link href="/sports" className="block px-5 py-3 text-sm text-gray-800 hover:text-[#1a1aad] hover:bg-gray-50 border-t border-gray-100 transition-colors">체육학</Link>
                  <Link href="/electrical" className="block px-5 py-3 text-sm text-gray-800 hover:text-[#1a1aad] hover:bg-gray-50 border-t border-gray-100 transition-colors">전기공학</Link>
                  <Link href="/computer" className="block px-5 py-3 text-sm text-gray-800 hover:text-[#1a1aad] hover:bg-gray-50 border-t border-gray-100 transition-colors">컴퓨터공학</Link>
                </div>
              )}
            </div>
            <div
              ref={qualRef}
              className="relative hidden sm:block"
              onMouseEnter={() => { if (!isQualLocked) setIsQualOpen(true); }}
              onMouseLeave={() => { if (!isQualLocked) setIsQualOpen(false); }}
            >
              <button
                className="flex items-center gap-1 text-sm font-medium hover:opacity-70"
                style={{ color: isScrolled ? "#000000" : "#FFFFFF", transition: "color 0.3s", background: "none", border: "none", cursor: "pointer", padding: 0 }}
                onClick={() => {
                  const next = !isQualLocked;
                  setIsQualLocked(next);
                  setIsQualOpen(next);
                }}
              >
                국가자격증
                <ChevronDown
                  size={14}
                  style={{ transition: "transform 0.2s", transform: isQualOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                />
              </button>
              {isQualOpen && (
                <div style={{ position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)", marginTop: 8, background: "#ffffff", borderRadius: 10, boxShadow: "0 4px 20px rgba(0,0,0,0.12)", overflow: "hidden", minWidth: 130, zIndex: 100 }}>
                  <Link href="#" className="block px-5 py-3 text-sm text-gray-800 hover:text-[#1a1aad] hover:bg-gray-50 whitespace-nowrap transition-colors">사회복지사2급 보육교사2급</Link>
                  <Link href="#" className="block px-5 py-3 text-sm text-gray-800 hover:text-[#1a1aad] hover:bg-gray-50 border-t border-gray-100 whitespace-nowrap transition-colors">산업기사 기사 자격증</Link>
                  <Link href="#" className="block px-5 py-3 text-sm text-gray-800 hover:text-[#1a1aad] hover:bg-gray-50 border-t border-gray-100 whitespace-nowrap transition-colors">종합미용면허증</Link>
                </div>
              )}
            </div>
            <a
              href="#"
              className="hidden text-sm font-medium hover:opacity-70 sm:block"
              style={{ color: isScrolled ? "#000000" : "#FFFFFF", transition: "color 0.3s" }}
            >
              대졸자전형
            </a>
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
        </div>
      </header>

      {/* ── 히어로 섹션 ── */}
      <section className="relative flex min-h-screen flex-col justify-center">
        {/* 영상 배경 */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 0,
          }}
        >
          <source src="/videos/hero-video.webm" type="video/webm" />
        </video>

        {/* 어두운 오버레이 */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(10, 15, 40, 0.65)",
            zIndex: 1,
          }}
        />

        {/* 텍스트 콘텐츠 — 중앙 왼쪽 */}
        <div className="relative mx-auto w-full max-w-6xl px-4 md:px-6" style={{ zIndex: 2 }}>
          <div className="max-w-2xl" style={{ wordBreak: "keep-all" }}>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl">
              <span className="block">90%는 손해보는 학점은행제,</span>
              <span className="block whitespace-nowrap">
                <span
                  className="inline px-2 py-1 text-white"
                  style={{ background: NAVY }}
                >
                  서플라이에듀
                </span>
                와 함께 하면 다릅니다
              </span>
            </h1>
            <div className="mt-14 space-y-1">
              <p className="text-xl font-semibold text-white md:text-2xl">
                돈과 시간을 아끼는 정확한 플랜,
              </p>
              <p className="text-xl font-semibold text-white md:text-2xl">
                <span className="font-bold underline underline-offset-2">상위 10%만 아는 지름길</span>을 알려드립니다
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 숫자 신뢰 섹션 ── */}
      <section className="bg-white pb-20 pt-10">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="mb-12 text-center">
            <p className="text-2xl font-bold tracking-tight text-black md:text-3xl">압도적인 수치의 비밀</p>
            <p className="text-2xl font-bold tracking-tight md:text-3xl" style={{ color: NAVY }}>단 3분이면 확인 됩니다.</p>
          </div>
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            <LiveCounter />
            <StatItem final="97.3%" label="학위 취득률" stopAt={1500} divider />
            <StatItem final="4개월~" label="최단 취득 기간" stopAt={1500} />
          </div>
        </div>
      </section>

      {/* ── 후기 ticker 섹션 ── */}
      <ReviewTicker />

      {/* ── 팀 소개 섹션 ── */}
      <TeamSection />

      {/* ── 비교 섹션 ── */}
      <section className="w-full bg-white py-20 px-6">
        <div className="text-center">
          <span className="inline-block text-xs font-medium text-[#1a1aad] bg-[#EEF2FF] px-3 py-1 rounded-full mb-4 tracking-widest">
            왜 서플라이에듀인가요?
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-black md:text-4xl" style={{ marginBottom: 8 }}>
            학점은행제,<br />어떻게 하느냐에 따라<br />
            <span className="text-[#1a1aad]">비용이 2배 달라집니다</span>
          </h2>
          <p className="text-sm text-gray-500 mb-12">잘못된 플랜이 시간과 돈을 낭비하게 만듭니다</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {/* 왼쪽: 혼자 준비하면 */}
          <div style={{ background: "#F8F9FA", borderRadius: 16, padding: "28px 24px" }}>
            <p style={{ fontSize: 17, fontWeight: 700, color: "#888888", marginBottom: 20 }}>혼자 준비하면</p>
            {[
              "어떤 과목을 들어야 할지 처음부터 스스로 알아봐야 합니다",
              "자격증·학점 인정 여부를 직접 확인해야 합니다",
              "잘못된 과목 선택으로 시간과 비용을 낭비하기 쉽습니다",
              "중간에 문제가 생겨도 혼자 해결해야 합니다",
              "정보가 넘쳐 오히려 더 혼란스러워집니다",
              "중도 포기하는 경우가 많습니다",
            ].map((text) => (
              <div key={text} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 12 }}>
                <div style={{ flexShrink: 0, width: 18, height: 18, borderRadius: "50%", background: "#e5e5e5", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 10, color: "#999", fontWeight: 700, lineHeight: 1 }}>✕</span>
                </div>
                <span style={{ fontSize: 13, lineHeight: 1.6, color: "#555" }}>{text}</span>
              </div>
            ))}
          </div>

          {/* 오른쪽: 서플라이에듀와 함께하면 */}
          <div style={{ background: "#1a1aad", borderRadius: 16, padding: "28px 24px" }}>
            <p style={{ fontSize: 17, fontWeight: 700, color: "#ffffff", marginBottom: 20 }}>서플라이에듀와 함께하면</p>
            {[
              "목표에 맞는 최단 기간·최저 비용 플랜을 처음부터 설계해드립니다",
              "자격증으로 학점을 대체해 기간과 비용을 절감합니다",
              "전담 컨설턴트가 처음부터 취득까지 1:1로 함께합니다",
              "중간에 문제가 생겨도 빠르게 대응해드립니다",
              "복잡한 정보를 정리해 명확하게 안내해드립니다",
              "목표 달성까지 끝까지 책임집니다",
            ].map((text) => (
              <div key={text} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 12 }}>
                <div style={{ flexShrink: 0, width: 18, height: 18, borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 10, color: "#fff", fontWeight: 700, lineHeight: 1 }}>✓</span>
                </div>
                <span style={{ fontSize: 13, lineHeight: 1.6, color: "rgba(255,255,255,0.9)" }}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 진행 프로세스 섹션 ── */}
      <section className="w-full bg-[#F8F9FA] px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <span className="mb-4 inline-block rounded-full bg-[#EEF2FF] px-3 py-1 text-xs font-medium tracking-widest text-[#1a1aad]">진행 과정</span>
          <h2 className="mb-12 text-3xl font-bold tracking-tight text-black md:text-4xl">복잡한 학점은행제,<br />가장 쉽고 가장 빠르게</h2>
          <div className="grid grid-cols-4 gap-3 max-w-4xl mx-auto">
            {/* STEP 01 */}
            <div className="relative flex flex-col items-center px-1 text-center">
              <p className="mb-4 text-[10px] font-semibold tracking-widest text-[#1a1aad] md:text-xs">STEP 01</p>
              <div className="relative z-10 mb-4 flex h-12 w-12 items-center justify-center rounded-3xl bg-[#EEF2FF] md:h-16 md:w-16">
                <MessageCircle size={20} className="md:hidden" color="#1a1aad" />
                <MessageCircle size={28} className="hidden md:block" color="#1a1aad" />
              </div>
              <p className="mb-1 text-xs font-medium text-gray-900 md:text-sm">무료 상담 신청</p>
              <p className="text-[10px] leading-relaxed text-gray-500 md:text-xs">3분이면 충분해요</p>
              <span className="absolute right-0 top-8 hidden md:block" style={{ transform: "translateX(50%)" }}>
                <ChevronRight size={20} color="#1a1aad" />
              </span>
            </div>

            {/* STEP 02 */}
            <div className="relative flex flex-col items-center px-1 text-center">
              <p className="mb-4 text-[10px] font-semibold tracking-widest text-[#1a1aad] md:text-xs">STEP 02</p>
              <div className="relative z-10 mb-4 flex h-12 w-12 items-center justify-center rounded-3xl bg-[#EEF2FF] md:h-16 md:w-16">
                <ClipboardList size={20} className="md:hidden" color="#1a1aad" />
                <ClipboardList size={28} className="hidden md:block" color="#1a1aad" />
              </div>
              <p className="mb-1 text-xs font-medium text-gray-900 md:text-sm">1:1 플랜 설계</p>
              <p className="text-[10px] leading-relaxed text-gray-500 md:text-xs">최단기간 최저비용 맞춤 설계</p>
              <span className="absolute right-0 top-8 hidden md:block" style={{ transform: "translateX(50%)" }}>
                <ChevronRight size={20} color="#1a1aad" />
              </span>
            </div>

            {/* STEP 03 */}
            <div className="relative flex flex-col items-center px-1 text-center">
              <p className="mb-4 text-[10px] font-semibold tracking-widest text-[#1a1aad] md:text-xs">STEP 03</p>
              <div className="relative z-10 mb-4 flex h-12 w-12 items-center justify-center rounded-3xl bg-[#EEF2FF] md:h-16 md:w-16">
                <Laptop size={20} className="md:hidden" color="#1a1aad" />
                <Laptop size={28} className="hidden md:block" color="#1a1aad" />
              </div>
              <p className="mb-1 text-xs font-medium text-gray-900 md:text-sm">온라인 수강</p>
              <p className="text-[10px] leading-relaxed text-gray-500 md:text-xs">언제 어디서든 편하게</p>
              <span className="absolute right-0 top-8 hidden md:block" style={{ transform: "translateX(50%)" }}>
                <ChevronRight size={20} color="#1a1aad" />
              </span>
            </div>

            {/* STEP 04 */}
            <div className="relative flex flex-col items-center px-1 text-center">
              <p className="mb-4 text-[10px] font-semibold tracking-widest text-[#1a1aad] md:text-xs">STEP 04</p>
              <div className="relative z-10 mb-4 flex h-12 w-12 items-center justify-center rounded-3xl bg-[#EEF2FF] md:h-16 md:w-16">
                <Award size={20} className="md:hidden" color="#1a1aad" />
                <Award size={28} className="hidden md:block" color="#1a1aad" />
              </div>
              <p className="mb-1 text-xs font-medium text-gray-900 md:text-sm">학위·자격증 취득</p>
              <p className="text-[10px] leading-relaxed text-gray-500 md:text-xs">끝까지 함께합니다</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 학점은행제 계산기 섹션 ── */}
      <CreditCalculator />

      {/* ── FAQ 섹션 ── */}
      <FAQSection />

      {/* ── 하단 CTA 섹션 ── */}
      <section className="py-24" style={{ background: NAVY }}>
        <div className="mx-auto max-w-6xl px-4 md:px-6 text-center">
          <h2 className="text-2xl font-extrabold text-white md:text-3xl">
            지금 바로 시작하세요
          </h2>
          <p
            className="mt-3 text-sm md:text-base"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
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
      <footer
        className="border-t bg-white py-8"
        style={{ borderColor: "rgba(0,0,0,0.08)" }}
      >
        <div
          className="mx-auto max-w-6xl px-4 md:px-6 text-center text-xs"
          style={{ color: "rgba(0,0,0,0.4)" }}
        >
          <p className="font-semibold" style={{ color: "rgba(0,0,0,0.6)" }}>
            서플라이에듀케이션
          </p>
          <p className="mt-1">
            © {new Date().getFullYear()} Supply Education. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
