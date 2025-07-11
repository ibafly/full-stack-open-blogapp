import { type FormData } from "@/components/home/add-blog-form"
import { ThumbsUp, Trash2, Link, ChevronDown } from "lucide-react"

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
    <li data-id={blog.id} className="flex items-center p-6 mx-8 
    hover:bg-gray-100
    ">
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
          {/* ensure url starts with http:// or https:// */}
          <a href={/^https?:\/\//i.test(blog.url) ? blog.url : `https://${blog.url.replace(/^\//, '').trim()}`}
            target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1 text-sm text-blue-600 hover:underline">
            <Link className="h-4 w-4 mt-1" />
            <span className="truncate text-gray-600">
              {blog.url}
            </span>
          </a>
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
            className={`pointer-events-none relative h-4 w-4 top-[2px] transition-all ${blog.toggle ? "rotate-180" : ""
              }`}
          />
        </button>


        <div
          style={{ display: blog.toggle ? "" : "none" }}
          className={"togglableContent absolute top-14 right-0 whitespace-pre inline-flex items-center"}
        >

          {showRemoveBtn ? (
            <button className="inline-flex items-center mr-2 rounded-full border border-black bg-black px-5 py-2 text-sm text-white transition-colors hover:bg-white hover:text-black" onClick={removeBtnOnClick}>
              {/* {"\u200B"} is zero-width blankspace inserted here to ensure the button has a text line height (which is higher than the icon) */}
              <span>{"\u200B"}</span>
              <Trash2 className="h-4 w-4 text-red-500" />
            </button>
          ) : typeof blog.userId === "object" && (
            <span className="mr-2 text-sm text-gray-500">
              OP: {blog.userId.name}
            </span>
          )}

          <button className="inline-flex items-center space-x-1 whitespace-pre space-x-2 rounded-full border border-black bg-black px-5 py-2 text-sm text-white transition-colors hover:bg-white hover:text-black" onClick={likeBtnOnClick}>
            <span className="">{blog.likes}</span>
            <ThumbsUp className="inline h-4 w-4 text-green-500" />
          </button>

        </div>
      </div>


    </li>
  )
}