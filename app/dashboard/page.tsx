"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState, useRef } from "react"
import { getCookie } from "cookies-next/client"
import Togglable, { type ToggleRef } from "@/components/shared/togglable"
import AddBlogForm, { type FormData } from "@/components/home/add-blog-form"
import BlogEntry, { type BlogData } from "@/components/home/blog-entry"
// import { GetServerSideProps } from 'next';
// import { getSession } from 'next-auth/react';

interface User {
  username: string;
  userId: string;
  name: string;
}


export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [blogs, setBlogs] = useState<BlogData[]>([])
  const togglableBlogFormRef = useRef<ToggleRef>(null)
  const router = useRouter()

  useEffect(() => {

    // client side can only access cookie logged-user, but not token!!
    console.log(document.cookie)

    const loggedUser = getCookie("logged-user")
      ? JSON.parse(getCookie("logged-user") as string)
      : null


    if (loggedUser) {
      setUser(loggedUser)

      fetch("/api/blogs", { method: "GET" })
        .then(res => res.json())
        .then(blogs =>
          setBlogs(
            blogs.map((blog: BlogData) => {
              return { ...blog, toggle: false }
            })
          )
        )
        .catch(err => {
          console.log(err)
        })
    }
    // // put random access redirect logic to middleware.ts
    // else {
    //   console.log("no logged user found, redirect to login(home) page")
    //   router.push("/")
    // }

  }, [])


  const handleLogout = async () => {
    // deleteCookie("auth-token") not work bc we cannot touch http-only cookie at client side
    await fetch("/api/logout", { method: "POST" })
    // await deleteCookie("logged-user")
    // window.localStorage.removeItem("loggedUser")
    setUser(null)

    router.push("/")
  }


  const addBlog = async (blog: FormData) => {
    try {
      console.log("ADD_BLOG:::::::::", user, user?.userId)
      await fetch("/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blog),
      })
        .then(res => {
          console.log("res::::::::", res)
          return res.json()
        })
        .then(returnedBlog => {
          console.log("returned blog::::::::", returnedBlog)
          setBlogs(blogs.concat({ ...returnedBlog, toggle: false })) // add new blog to the end of blogs array
        })
        .catch(err => {
          console.log(err)
        })

      togglableBlogFormRef.current?.toggleVisibility() // fold blog form after successfully create a blog

      // setMsg(`a new blog ${blog.title} by ${blog.author} added`)
      // setTimeout(() => {
      //     setMsg(null)
      // }, 5000)
    } catch (excep) {
      console.log("exception:", excep)
    }
  }

  const changeBlogToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    const blogId = ((event.target as HTMLElement).parentNode?.parentNode as HTMLElement)?.getAttribute("data-id")
    const modifiedBlogs = blogs.map(blog =>
      blog.id === blogId ? { ...blog, toggle: !blog.toggle } : blog
    )
    setBlogs(modifiedBlogs)
  }

  const plusOneLike = async (blogId: string) => {
    try {
      const foundBlog = blogs.find(blog => blog.id === blogId)

      if (!foundBlog) {
        console.log("blog not found")
        throw new Error("blog not found")
      }

      const blogLikesPlusOne = {
        // remote DB data structure, userId is not expanded
        title: foundBlog.title,
        author: foundBlog.author,
        url: foundBlog.url,
        likes: foundBlog.likes + 1,
        userId: typeof foundBlog.userId === "object" ? (foundBlog.userId as { id: string }).id : foundBlog.userId, // handle both string and object cases
      }

      fetch(`/api/blogs/${foundBlog.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blogLikesPlusOne),
      })
      const modifiedBlogs = blogs.map(blog => {
        return blog.id === foundBlog.id
          ? { ...blog, likes: blog.likes + 1 }
          : blog
      }) // local blogs data structure, userId is expanded with user detail info.
      setBlogs(modifiedBlogs)
    } catch (excep) {
      console.log("exception:", excep)
    }
  }

  const deleteBlog = async (blogId: string) => {
    const foundBlog = blogs.find(blog => blog.id === blogId)
    if (!foundBlog) {
      console.log("blog not found")
      throw new Error("blog not found")
    }

    const confirmed = window.confirm(
      `Remove blog ${foundBlog.title} by ${foundBlog.author}?`
    )
    if (confirmed) {
      try {
        fetch(`/api/blogs/${foundBlog.id}`, {
          method: "DELETE",
        })
        const mutatedBlogs = blogs.filter(blog => blog.id !== foundBlog.id)
        setBlogs(mutatedBlogs)
      } catch (excep) {
        console.log("exception:", excep)
      }
    }
  }


  return (


    // <div className="mt-10 grid grid-cols-1 md:grid-cols-[auto_250px] gap-4 bg-gray-200 p-4">
    <div className="flex h-[calc(100vh-4rem)] w-full">
      <div className="grow overflow-hidden">

        {/* -Left Sidebar */}
        <div className="flex h-screen bg-blue-50">
          <div className="grow overflow-hidden border-r border-gray-200">

            {/* --Left Header */}
            <div className="flex h-16 items-center justify-between border-b border-gray-200 p-4">
              <div className="flex items-center">
                {/* <NavMenu /> */}
                <h1 className="flex items-center text-xl font-semibold capitalize">
                  {/* {folderName} */}
                  Blog Pool
                  <span className="ml-2 text-sm text-gray-400">
                    {/* {count} */}
                    {blogs.length}
                  </span>
                </h1>
              </div>
              <div className="flex items-center space-x-2">
                {/* <Link
            href={`/f/${folderName}/new`}
            className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-gray-100"
          >
            <PenSquare size={18} />
          </Link>
          <Link
            href="/search"
            className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-gray-100"
          >
            <Search size={18} />
          </Link> */}
              </div>
            </div>

            {/* --Left Entry List */}
            <div className="h-[calc(100vh-8rem)] overflow-auto">
              <ul className="pb-8">
                {[...blogs]
                  .sort((blogA, blogB) => blogB.likes - blogA.likes)
                  .map(blog => (
                    <BlogEntry
                      key={blog.id}
                      blog={blog}
                      toggleBtnOnClick={changeBlogToggle}
                      opAfterLikeBtnOnClick={plusOneLike}
                      opAfterRemoveBtnOnClick={deleteBlog}
                      showRemoveBtn={
                        blog.userId && user?.userId && typeof blog.userId === "object" && blog.userId.id === user.userId ? true : false
                      }
                    />
                  ))}
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* <Notification message={msg} /> */}

      {/* -Right Sidebar */}
      <div className="hidden w-[350px] shrink-0 overflow-auto bg-neutral-50 p-6 sm:flex">
        <div className="max-w-md">

          <h3 className="justify-self-end text-2xl font-bold">
            {user ? user.name : "Guest"}
            {user ?
              <button type="button" onClick={handleLogout} className="mx-auto ml-2 inline-flex items-center justify-center space-x-2 rounded-full border border-black bg-black px-5 py-2 text-sm text-white transition-colors hover:bg-white hover:text-black">
                Sign out
              </button>
              : ""}
          </h3>

          <div className="mt-9">

            <Togglable btnLabel={"create new blog"} ref={togglableBlogFormRef}>
              <button onClick={() => {
                togglableBlogFormRef.current?.toggleVisibility()
              }}
                className="mx-auto mb-4 inline-flex w-full items-center justify-center space-x-2 rounded-full border border-black bg-black px-5 py-2 text-sm text-white transition-colors hover:bg-white hover:text-black">
                ×
              </button>
              <div className="flex justify-center">
                <AddBlogForm
                  opAfterSubmit={addBlog} // do operation after form on submit
                />

              </div>

            </Togglable >

          </div>

        </div>
      </div>


    </div>
  )
}