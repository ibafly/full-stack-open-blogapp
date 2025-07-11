"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState, useRef } from "react"
import { getCookie } from "cookies-next/client"
import ScrollArea from "@/components/shared/scrollArea"
import Togglable, { type ToggleRef } from "@/components/shared/togglable"
import Modal from "@/components/shared/modal"
import NavMenu from "@/components/home/nav-menu"
import AddBlogForm, { type FormData } from "@/components/home/add-blog-form"
import BlogEntry, { type BlogData } from "@/components/home/blog-entry"
// import { GetServerSideProps } from 'next';
// import { getSession } from 'next-auth/react';

import { User, ScrollText, SquarePen, LogOut, PenSquare } from "lucide-react"

interface User {
  username: string;
  userId: string;
  name: string;
}


export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [blogs, setBlogs] = useState<BlogData[]>([])
  const [showPostModal, setShowPostModal] = useState<boolean>(false)
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

      togglableBlogFormRef.current?.toggleVisibility() // fold blog form after successfully post s link
      showPostModal && setShowPostModal(false) // close post modal after successfully posting a link

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
        <div className="flex h-screen">
          <div className="grow overflow-hidden border-r border-gray-200">

            {/* --Left Header */}
            <div className="flex h-16 items-center justify-between border-b border-gray-200 p-4">
              <h1 className="flex items-center space-x-1 shrink-0 text-xl font-semibold capitalize">
                {/* {folderName} */}
                <ScrollText size={30} />
                <span>
                  Blog Pool
                </span>
                <span className="ml-2 text-sm text-gray-400">
                  {/* {count} */}
                  {blogs.length}
                </span>
              </h1>

              <NavMenu className="justify-end md:hidden"
                barSide="right"
                headerNode={
                  < h1 className="justify-self-end flex items-center space-x-1 text-xl font-bold">
                    <User size={30} />
                    <span>
                      {user ? user.name : "Guest"}
                    </span>
                  </h1>
                }
                actionsNode={
                  <button type="button" onClick={handleLogout} className="flex items-center space-x-2   rounded p-2 text-gray-700 hover:bg-gray-100">
                    <LogOut size={20} />
                    <span className="pointer-events-none">
                      Sign out
                    </span>
                  </button>
                }
              />

              {/* <div className="flex items-center space-x-2">
                <Link
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
                </Link>
              </div> */}
            </div>

            {/* --Left Entry List */}
            <ScrollArea
              className="h-[calc(100vh-8rem)]"
              children={
                // <div className="h-[calc(100vh-8rem)] overflow-auto">
                // divide-y is border settings of <li> in tailwindcss
                <ul className="pb-8 divide-y divide-gray-200">
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
                // </div>
              } />

            {/* floating action button here when on small size screen*/}
            <button
              onClick={() => { setShowPostModal(true) }}
              className="z-10 fixed bottom-8 right-4 flex items-center rounded-full md:hidden border border-black bg-black px-4 py-4 whitespace-nowrap text-sm text-white transition-colors hover:bg-white hover:text-black" 
            >
              <SquarePen size={20} />
            </button>

            <Modal showModal={showPostModal} setShowModal={setShowPostModal}>
              <div className="w-full overflow-hidden md:max-w-md md:rounded-2xl md:border md:border-gray-100 ">
                <div className="flex flex-col items-center justify-center space-y-3 bg-white px-4 pb-6 pt-20 text-center md:px-16">
                  <h3 className="font-display text-2xl font-bold">Post New Link</h3>
                    <div className="relative flex justify-center mt-10">
                      <AddBlogForm
                        opAfterSubmit={addBlog} // do operation after form on submit
                      />
                    </div>
                </div>
              </div>
            </Modal>
          </div>
        </div>
      </div>

      {/* <Notification message={msg} /> */}

      {/* -Right Sidebar */}
      <div className="hidden w-1/3  min-w-[300px] md:flex flex-col shrink-0 grow-0 space-x-2 overflow-auto bg-neutral-50 p-6 ">
        {/* <div className="max-w-md"> */}

        <h1 className="justify-self-end flex items-center space-x-1 text-xl font-bold">
          <User size={30} />
          <span>
            {user ? user.name : "Guest"}
          </span>
        </h1>


        {user ?
          <button type="button" onClick={handleLogout} className="mt-9 mx-auto inline-flex items-center justify-center space-x-1 rounded-full border border-black bg-black px-5 py-2 whitespace-nowrap text-sm text-white transition-colors hover:bg-white hover:text-black">
            <span className="pointer-events-none">
              Sign out
            </span>
            <LogOut size={20} />
          </button>
          : ""}

        <div className="mt-4">
          <Togglable
            btnLabelNode={
              <>
                <span>Post new link</span>
                <SquarePen size={20} />
              </>
            }
            ref={togglableBlogFormRef}
          >
            <button onClick={() => {
              togglableBlogFormRef.current?.toggleVisibility()
            }}
              className="mx-auto mb-2 w-full inline-flex  items-center justify-center space-x-2 rounded-full border border-black bg-black px-5 py-2 text-sm text-white transition-colors hover:bg-white hover:text-black">
              ×
            </button>

            <div className="flex justify-center">
              <AddBlogForm
                opAfterSubmit={addBlog} // do operation after form on submit
              />
            </div>
          </Togglable >
        </div>

        {/* </div> */}
      </div>


    </div >
  )
}