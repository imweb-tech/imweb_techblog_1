import Link from "next/link"
import Layout from "@/components/layout/Layout"

export default function NotFoundPage() {
  return (
    <Layout>
      <section className="container mx-auto py-32 text-center">
        <div className="text-6xl font-extrabold tracking-tight text-ink-900">404</div>
        <div className="mt-3 text-lg text-ink-700">찾으시는 페이지가 없어요.</div>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-ink-900 px-5 py-3 text-sm font-semibold text-base hover:opacity-90 transition-opacity"
        >
          처음으로 돌아가기
        </Link>
      </section>
    </Layout>
  )
}
