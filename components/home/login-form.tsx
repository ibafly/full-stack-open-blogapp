"use client"

import Form from "@/components/shared/form";
import {
    useState,
    Dispatch,
    SetStateAction,
} from "react";



export default function LoginForm() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const followUsernameInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value)
    }
    const followPasswordInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

const inputBoxCss = "box-border inline-flex w-full appearance-none items-center justify-center rounded px-2.5 leading-none shadow-[0_0_0_1px] shadow-blue-200 outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black]"

    const fields = [
        {
            name: "username",
            label: "Username",
            children: (<input className={inputBoxCss} id="username" type="text" value={username} onChange={followUsernameInput} required />),
            required: true,
        },
        {
            name: "password",
            label: "Password",
            children: (<input className={inputBoxCss} id="password" type="password" value={password} onChange={followPasswordInput} required />),
            required: true,
        },
    ];

    return (
        <Form fields={fields} fireOnSubmit={handleLogin} submitButtonText={"Login"} />
    );
}

const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // try {
    //   const returnedUser = await loginService.login({ username, password })
    //   console.log(returnedUser)
    //   setUser(returnedUser)
    //   window.localStorage.setItem("loggedUser", JSON.stringify(returnedUser))
    //   blogService.setToken(returnedUser.token)

    //   setUsername("")
    //   setPassword("")
    // } catch (excep) {
    //   setMsg("wrong credentials (username or password)", excep)
    //   setTimeout(() => {
    //     setMsg(null)
    //   }, 5000)
    // }
}

