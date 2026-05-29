import { useEffect, useState } from "react"

const CONFIG = require("../../../site.config")

// 메인 페이지 이벤트 홍보 팝업.
// - site.config.js 의 eventPopup.enabled 가 true 일 때만 노출
// - "오늘 하루 보지 않기" 클릭 시 24시간 동안 안 보임(localStorage)
// - 일반 닫기(X / 배경 클릭 / ESC)는 저장 없이 닫음 → 다음 진입 때 다시 노출
const STORAGE_KEY = "eventPopupDismissedUntil"

export default function EventPopup() {
  const ev = CONFIG.eventPopup
  const [open, setOpen] = useState(false)

  // 마운트 시 표시 여부 결정 (SSR 과 일치시키려고 기본 false 후 effect 에서 true)
  useEffect(() => {
    if (!ev?.enabled) return
    try {
      const until = parseInt(localStorage.getItem(STORAGE_KEY) || "0", 10)
      if (Date.now() < until) return
    } catch {
      /* localStorage 비활성 환경 무시 */
    }
    setOpen(true)
  }, [ev?.enabled])

  // ESC 로 닫기
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open])

  if (!ev?.enabled || !open) return null

  const closeForDay = () => {
    try {
      localStorage.setItem(STORAGE_KEY, String(Date.now() + 24 * 60 * 60 * 1000))
    } catch {
      /* noop */
    }
    setOpen(false)
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="event-popup-title"
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
    >
      {/* 배경 (클릭 시 닫힘) */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setOpen(false)}
        aria-hidden
      />

      {/* 카드 — 사이즈 적당히, 화면 너무 안 가리게 */}
      <div className="event-popup-card relative w-full max-w-md rounded-2xl border border-line bg-card p-6 shadow-2xl sm:p-7">
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="닫기"
          className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-md text-ink-500 transition-colors hover:bg-surface hover:text-ink-900"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        {ev.badge && (
          <div className="text-[11px] font-semibold uppercase tracking-wider text-brand">
            {ev.badge}
          </div>
        )}
        <h2
          id="event-popup-title"
          className="mt-2 text-xl font-bold leading-tight tracking-[-0.02em] text-ink-900 sm:text-2xl"
        >
          {ev.title}
        </h2>
        {ev.description && (
          <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-ink-700">
            {ev.description}
          </p>
        )}

        {(ev.date || ev.place) && (
          <dl className="mt-5 grid grid-cols-1 gap-1.5 text-sm">
            {ev.date && (
              <div className="flex gap-3">
                <dt className="w-10 shrink-0 text-ink-500">일시</dt>
                <dd className="font-medium text-ink-900">{ev.date}</dd>
              </div>
            )}
            {ev.place && (
              <div className="flex gap-3">
                <dt className="w-10 shrink-0 text-ink-500">장소</dt>
                <dd className="font-medium text-ink-900">{ev.place}</dd>
              </div>
            )}
          </dl>
        )}

        <a
          href={ev.ctaHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-ink-900 px-5 py-3 text-sm font-semibold text-base transition-opacity hover:opacity-90"
        >
          {ev.ctaLabel}
          <span aria-hidden>→</span>
        </a>

        <button
          type="button"
          onClick={closeForDay}
          className="mt-3 block w-full text-center text-xs text-ink-500 hover:text-ink-700"
        >
          오늘 하루 보지 않기
        </button>
      </div>
    </div>
  )
}
