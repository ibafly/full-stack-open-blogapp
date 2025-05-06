"use client"

import Form from "@/components/shared/form";
import React, { useState } from "react"

export interface FormData {
    title: string;
    author: string;
    url: string;
}

export default function addBlogForm({ opAfterSubmit }: {
    opAfterSubmit: (formData: FormData) => Promise<void>;
}) {
    const [formData, setFormData] = useState<FormData>({
        title: "",
        author: "",
        url: "",
    })
    const [msg, setMsg] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false);

    const inputBoxCss = "box-border inline-flex w-full appearance-none items-center justify-center rounded px-2.5 leading-none shadow-[0_0_0_1px] shadow-blue-200 outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black]"

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        opAfterSubmit(formData) // async create blog
        setFormData({
            title: "",
            author: "",
            url: "",
        })
        setMsg(null)
        setIsLoading(false)
    }

    const fields = [
        {
            name: "title",
            label: "Title",
            children: (<input className={inputBoxCss} id="title" type="text" value={formData.title} onChange={handleChange} required />),
            required: true,
        },
        {
            name: "author",
            label: "Author",
            children: (<input className={inputBoxCss} id="author" type="text" value={formData.author} onChange={handleChange} required />),
            required: true,
        },
        {
            name: "url",
            label: "Url",
            children: (<input className={inputBoxCss} id="url" type="text" value={formData.url} onChange={handleChange} required />),
            required: true,
        },
    ];

    return (
        <Form fields={fields} fireOnSubmit={handleSubmit} submitButtonText={"Create"} isLoading={isLoading} />
    );
}
