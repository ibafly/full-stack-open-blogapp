"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { deleteCookie, getCookie } from "cookies-next/client";
import Togglable, { type ToggleRef } from "@/components/shared/togglable";
import AddBlogForm, { type FormData } from "@/components/home/add-blog-form";
import BlogEntry, { type BlogData } from "@/components/home/blog-entry";
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
            : null;

        if (loggedUser) {
            setUser(loggedUser);
            console.log(loggedUser)

            fetch('/api/blogs', { method: 'GET' })
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
    }, [])


    const handleLogout = async () => {
        // deleteCookie("auth-token") not work bc we cannot touch http-only cookie at client side
        await fetch('/api/logout', { method: "POST" })
        // await deleteCookie("logged-user")
        // window.localStorage.removeItem("loggedUser")
        setUser(null)

        router.push("/")
    }


    const addBlog = async (blog: FormData) => {
        try {
            console.log("ADD_BLOG:::::::::", user, user?.userId)
            await fetch('/api/blogs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
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
        const blogId = ((event.target as HTMLElement).parentNode as HTMLElement)?.getAttribute("data-id")
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
                throw new Error('blog not found');
            }

            const blogLikesPlusOne = {
                // remote DB data structure, userId is not expanded
                title: foundBlog.title,
                author: foundBlog.author,
                url: foundBlog.url,
                likes: foundBlog.likes + 1,
                userId: typeof foundBlog.userId === 'object' ? (foundBlog.userId as { id: string }).id : foundBlog.userId, // handle both string and object cases
            }

            fetch(`/api/blogs/${foundBlog.id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
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
            throw new Error('blog not found');
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
        <>
            <h2>Blog Pool</h2>
            {/* <Notification message={msg} /> */}
            <h3>
                {user ? user.name : ""} logged in
                <button type="button" onClick={handleLogout} className="mx-auto mt-2 inline-flex w-full items-center justify-center space-x-2 rounded-full border border-black bg-black px-5 py-2 text-sm text-white transition-colors hover:bg-white hover:text-black">
                    logout
                </button>
            </h3>
            <h2>create new</h2>
            <Togglable btnLabel={"create new blog"} ref={togglableBlogFormRef}>
                <AddBlogForm
                    opAfterSubmit={addBlog} // do operation after form on submit
                />

                <button onClick={() => {
                    togglableBlogFormRef.current?.toggleVisibility()
                }}
                    className="mx-auto mt-2 inline-flex w-full items-center justify-center space-x-2 rounded-full border border-black bg-black px-5 py-2 text-sm text-white transition-colors hover:bg-white hover:text-black">
                    Cancel
                </button>

            </Togglable >
            <ul>
                {[...blogs]
                    .sort((blogA, blogB) => blogB.likes - blogA.likes)
                    .map(blog => (
                        <>
                            <BlogEntry
                                key={blog.id}
                                blog={blog}
                                toggleBtnOnClick={changeBlogToggle}
                                opAfterLikeBtnOnClick={plusOneLike}
                                opAfterRemoveBtnOnClick={deleteBlog}
                                showRemoveBtn={
                                    blog.userId && user?.userId && typeof blog.userId === 'object' && blog.userId.id === user.userId ? true : false
                                }
                            />
                            {/* <div>{JSON.stringify(blog.userId)}  {blog.userId.id}    {user?.userId}</div> */}
                        </>
                    ))}
            </ul>
        </>
    )
}