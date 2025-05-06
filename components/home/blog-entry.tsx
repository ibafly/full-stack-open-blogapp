
export default function BlogEntry({
    blog,
    toggleBtnOnClick,
    opAfterLikeBtnOnClick,
    opAfterRemoveBtnOnClick,
    showRemoveBtn,
}) {
    const likeBtnOnClick = event => {
        const blogId =
            event.target.parentNode.parentNode.parentNode.getAttribute("data-id")
        opAfterLikeBtnOnClick(blogId)
    }
    const removeBtnOnClick = event => {
        const blogId = event.target.parentNode.parentNode.getAttribute("data-id")
        opAfterRemoveBtnOnClick(blogId)
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
                <div>
                    likes: {blog.likes}
                    <button className="mx-auto mt-2 inline-flex w-full items-center justify-center space-x-2 rounded-full border border-black bg-black px-5 py-2 text-sm text-white transition-colors hover:bg-white hover:text-black" onClick={likeBtnOnClick}>
                        like
                    </button>
                </div>
                {blog.userId && <div>{blog.userId.name}</div>}
                {showRemoveBtn && (
                    <button className="mx-auto mt-2 inline-flex w-full items-center justify-center space-x-2 rounded-full border border-black bg-black px-5 py-2 text-sm text-white transition-colors hover:bg-white hover:text-black" onClick={removeBtnOnClick}>
                        remove
                    </button>
                )}
            </div>
        </li>
    )
}