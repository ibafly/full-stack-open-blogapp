import { type FormData } from "@/components/home/add-blog-form"

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
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid 1px black",
    marginBottom: 5,
  }
  return (
    <li data-id={blog.id} style={blogStyle}>
      {blog.title} {blog.author}
      <button className="mx-auto mt-2 inline-flex w-full items-center justify-center space-x-2 rounded-full border border-black bg-black px-5 py-2 text-sm text-white transition-colors hover:bg-white hover:text-black" onClick={toggleBtnOnClick}>
        {blog.toggle ? "hide" : "view"}
      </button>
      <div
        style={{ display: blog.toggle ? "" : "none" }}
        className={"togglableContent"}
      >
        <div>{blog.url}</div>
        <div className="inline-flex justify-between items-center w-full">
          Likes: {blog.likes}
          <button className="space-x-2 rounded-full border border-black bg-black px-5 py-2 text-sm text-white transition-colors hover:bg-white hover:text-black" onClick={likeBtnOnClick}>
            👍
          </button>
        </div>
        <div className="inline-flex justify-between items-center w-full mt-2">
          {typeof blog.userId === "object" && <div>Uploader: {blog.userId.name}</div>}
          {showRemoveBtn && (
            <button className="space-x-2 rounded-full border border-black bg-black px-5 py-2 text-sm text-white transition-colors hover:bg-white hover:text-black" onClick={removeBtnOnClick}>
              🗑
            </button>
          )}
        </div>
      </div>
    </li>
  )
}