"use client"

import Form from "@/components/shared/form"
import {
  useState,
  Dispatch,
  SetStateAction,
} from "react"
import { useRouter } from "next/navigation"

interface FormData {
    username: string;
    password: string;
}

export default function LoginForm() {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
  })
  const [msg, setMsg] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()


  const inputBoxCss = "box-border inline-flex w-full appearance-none items-center justify-center rounded px-2.5 leading-none shadow-[0_0_0_1px] shadow-blue-200 outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black]"
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }



  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setMsg(null)
    setIsLoading(true)

    console.log(formData)

    try {
      //   const returnedUser = await loginService.login({ username, password })
      const res = await fetch("/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      )

      console.log(res)
      // const data = await res.json();
      const data = await res.json()
      console.log(data)
      // if (!response.ok || !data.success) {
      if (!res.ok || !data.userId) {
        throw new Error("failed to login")
      }

      // const { token, ...loggedUser } = data
      // const loggedUser = data

      // setUser(data)
      // window.localStorage.setItem("loggedUser", JSON.stringify(loggedUser))

      // blogService.setToken(returnedUser.token)

      router.push("/dashboard")

      setFormData(
        {
          username: "",
          password: "",
        }
      )
    } catch (excep) {
      // setMsg("wrong credentials (username or password)", excep)
      setMsg(excep instanceof Error ? excep.message : "unknown error")
      setTimeout(() => {
        setMsg(null)
      }, 5000)
    } finally {
      setIsLoading(false)
    }
  }

  const fields = [
    {
      name: "username",
      label: "Username",
      children: (<input className={inputBoxCss} id="username" type="text" autoComplete="username" value={formData.username} onChange={handleChange} required />),
      required: true,
    },
    {
      name: "password",
      label: "Password",
      children: (<input className={inputBoxCss} id="password" type="password" autoComplete="current-password" value={formData.password} onChange={handleChange} required />),
      required: true,
    },
  ]

  return (
    <Form fields={fields} fireOnSubmit={handleLogin} submitButtonText={"Login"} isLoading={isLoading} />
  )
}


