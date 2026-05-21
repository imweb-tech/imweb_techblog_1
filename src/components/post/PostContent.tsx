import dynamic from "next/dynamic"
import type { ExtendedRecordMap } from "notion-types"
import { NotionRenderer } from "react-notion-x"

// react-notion-x 의 고급 블록(code highlight, collection, equation, pdf) 는
// 별도 번들이므로 dynamic import 로 SSR 시 무거워지지 않게 분리합니다.
const Code = dynamic(() =>
  import("react-notion-x/build/third-party/code").then((m) => m.Code)
)
const Collection = dynamic(() =>
  import("react-notion-x/build/third-party/collection").then((m) => m.Collection)
)
const Equation = dynamic(() =>
  import("react-notion-x/build/third-party/equation").then((m) => m.Equation)
)
const Modal = dynamic(
  () => import("react-notion-x/build/third-party/modal").then((m) => m.Modal),
  { ssr: false }
)

// Notion 페이지의 recordMap 을 그대로 렌더링합니다.
export default function PostContent({
  recordMap,
}: {
  recordMap: ExtendedRecordMap
}) {
  return (
    <article className="container mx-auto max-w-prose pb-20">
      <NotionRenderer
        recordMap={recordMap}
        fullPage={false}
        darkMode={false}
        components={{
          Code,
          Collection,
          Equation,
          Modal,
          nextImage: undefined,
          nextLink: undefined,
        }}
      />
    </article>
  )
}
