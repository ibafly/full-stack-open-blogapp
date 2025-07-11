"use client"

import { FormEvent, Children, Dispatch, ReactNode, SetStateAction } from "react"
import * as FormPrimitive from "@radix-ui/react-form"

import { Loader } from "lucide-react"

interface Field {
    name: string;
    label: string;
    children: ReactNode;
    required: boolean;
}

export default function Form({
    // children,
    submitButtonText,
    fields,
    fireOnSubmit,
    isLoading,
    // openPopover,
    // setOpenPopover,
}: {
    // children: ReactNode;
    submitButtonText: String;
    fields: Field[];
    fireOnSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
    isLoading: boolean;
    // openPopover: boolean;
    // setOpenPopover: Dispatch<SetStateAction<boolean>>;

}) {
    return (
        <FormPrimitive.Root onSubmit={fireOnSubmit} className="w-[200px]">
            {fields.map(({ name, label, children, required }) => (
                <FormPrimitive.Field key={name} className="relative mb-2.5 grid" name={name}>
                    <div className="flex items-baseline justify-between">
                        <FormPrimitive.Label className="leading-[30px] font-mono text-base" htmlFor={name}>
                            {label}
                        </FormPrimitive.Label>
                    </div>
                    <FormPrimitive.Control className="" asChild>
                        {/* <input className="" type="email" required /> */}
                        {children}
                    </FormPrimitive.Control>
                    {required && (
                        <FormPrimitive.Message className="absolute pointer-events-none left-4 bottom-3  text-xs opacity-50" match="valueMissing">
                            Please enter your {name}.
                        </FormPrimitive.Message>
                    )}
                </FormPrimitive.Field>
            ))}

            <FormPrimitive.Submit asChild>
                <button type="submit" className="mx-auto mt-2 inline-flex w-full items-center justify-center space-x-2 rounded-full border border-black bg-black px-5 py-2 text-sm text-white transition-colors hover:bg-white hover:text-black" disabled={isLoading}>
                    {/* {isLoading && */}
                    {/* <Loader size={20} /> */}
                    {/* } */}

                    {isLoading ? <Loader size={20} /> : submitButtonText}
                    
                    {/* {submitButtonText} */}
                </button>
            </FormPrimitive.Submit>
        </FormPrimitive.Root>
    )
}










