import { type FormData } from "@/components/home/add-blog-form"
import { ChevronDown } from "lucide-react"

export interface BlogData extends FormData {
  id: string;
  // userId: string;
  userId: string | {
    username: string;
    id: string;
    name: string;
  };
  commentIds: string[] | [];
  likes: number;
  toggle?: boolean; // for togglable blog form
}

export default function BlogEntry({
  blog,
  toggleBtnOnClick,
  opAfterLikeBtnOnClick,
  opAfterRemoveBtnOnClick,
  showRemoveBtn,
}: {
  blog: BlogData;
  toggleBtnOnClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  opAfterLikeBtnOnClick: (blogId: string) => Promise<void>;
  opAfterRemoveBtnOnClick: (blogId: string) => Promise<void>;
  showRemoveBtn?: boolean;

}) {
  const likeBtnOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const blogId = event.currentTarget.closest("[data-id]")?.getAttribute("data-id")
    opAfterLikeBtnOnClick(blogId || "") // 处理可能的null值
  }
  const removeBtnOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const blogId = event.currentTarget.closest("[data-id]")?.getAttribute("data-id")
    opAfterRemoveBtnOnClick(blogId || "")
  }


  return (
    <li data-id={blog.id} className="flex items-center p-6 mx-8 border-b border-l border-r hover:bg-blue-200">
      <div className="flex grow items-center overflow-hidden p-4">
        <div className="mr-4 w-[200px] shrink-0">
          <span className="truncate font-medium">
            {blog.title}
          </span>
        </div>
        <div className="flex grow items-center overflow-hidden">
          <span className="mr-2 max-w-[400px] min-w-[175px] truncate font-medium">
            {blog.author}
          </span>
          <span className="truncate text-gray-600">
            {blog.url}
          </span>
        </div>
      </div>

      <div className="relative">

        <button className="mx-auto mt-2 inline-flex shrink-0 justify-end items-center space-x-2 rounded-full border border-black bg-black px-5 py-2 text-sm text-white transition-colors hover:bg-white hover:text-black" onClick={toggleBtnOnClick}>
          {/* {blog.toggle ? "hide" : "view"} */}
          <span className="pointer-events-none">
          more
          </span>
          <ChevronDown
            // USE pointer-events: none
            // to ensure the icon can be clicked to trigger button
            className={`pointer-events-none h-4 w-4 mt-1 transition-all ${blog.toggle ? "rotate-180" : ""
              }`}
          />
        </button>


        <div
          style={{ display: blog.toggle ? "" : "none" }}
          className={"togglableContent absolute top-14 right-0 whitespace-pre"}
        >
          <span className="mr-2">
            {typeof blog.userId === "object" &&
              !showRemoveBtn &&
              <span className="text-sm text-gray-500">
                OP: {blog.userId.name}
              </span>}

            {showRemoveBtn && (
              <button className="space-x-2 rounded-full border border-black bg-black px-5 py-2 text-sm text-white transition-colors hover:bg-white hover:text-black" onClick={removeBtnOnClick}>
                🗑
              </button>
            )}
          </span>
          <span className="inline">
            <button className="whitespace-pre space-x-2 rounded-full border border-black bg-black px-5 py-2 text-sm text-white transition-colors hover:bg-white hover:text-black" onClick={likeBtnOnClick}>
              {blog.likes} 👍
            </button>
          </span>
        </div>
      </div>


    </li>
  )
}