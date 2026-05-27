import { useState } from "react"
import type { TPost } from "@/types"
import PostCard from "./PostCard"
import PostListItem from "./PostListItem"

type ViewMode = "grid" | "list"

// 본문 영역의 포스트 리스트. 그리드/리스트 토글 지원.
// 사이드바 우측 메인 컬럼 안에서 사용됩니다.
export default function PostGrid({
  posts,
  title = "전체 글",
}: {
  posts: TPost[]
  title?: string
}) {
  const [viewMode, setViewMode] = useState<ViewMode>("list")

  if (!posts.length) {
    return (
      <section className="py-16 text-center text-ink-500">
        조건에 맞는 글이 아직 없어요.
      </section>
    )
  }

  return (
    <section>
      <div className="mb-6 flex items-end justify-between gap-4">
        <div className="flex items-baseline gap-3">
          <h2 className="text-h2 sm:text-[1.75rem] font-bold tracking-[-0.025em] text-ink-900">
            {title}
          </h2>
          <span className="text-sm text-ink-500">{posts.length}개</span>
        </div>
        <ViewToggle value={viewMode} onChange={setViewMode} />
      </div>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {posts.map((post) => (
            <PostListItem key={post.id} post={post} />
          ))}
        </div>
      )}
    </section>
  )
}

function ViewToggle({
  value,
  onChange,
}: {
  value: ViewMode
  onChange: (next: ViewMode) => void
}) {
  const itemClass = (active: boolean) =>
    `inline-flex h-8 w-8 items-center justify-center rounded-md transition-colors ${
      active
        ? "bg-card text-ink-900 shadow-sm"
        : "text-ink-500 hover:text-ink-900"
    }`

  return (
    <div
      role="group"
      aria-label="보기 방식"
      className="inline-flex items-center rounded-lg bg-surface p-1 border border-line"
    >
      <button
        type="button"
        aria-pressed={value === "grid"}
        aria-label="그리드로 보기"
        onClick={() => onChange("grid")}
        className={itemClass(value === "grid")}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      </button>
      <button
        type="button"
        aria-pressed={value === "list"}
        aria-label="리스트로 보기"
        onClick={() => onChange("list")}
        className={itemClass(value === "list")}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <line x1="8" y1="6" x2="21" y2="6" />
          <line x1="8" y1="12" x2="21" y2="12" />
          <line x1="8" y1="18" x2="21" y2="18" />
          <circle cx="4" cy="6" r="1" />
          <circle cx="4" cy="12" r="1" />
          <circle cx="4" cy="18" r="1" />
        </svg>
      </button>
    </div>
  )
}
