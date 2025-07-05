"use client";

import { ReactNode } from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

export default function Tabs(
    {
        ariaLabel,
        triggers
    }: {
        ariaLabel: string,
        triggers: { name: string, children: ReactNode }[]
    }
) {
    return (
        <TabsPrimitive.Root className="flex w-full flex-col" defaultValue="tab1" orientation="horizontal">
            <TabsPrimitive.List className="flex shrink-0 border-b " aria-label={ariaLabel}>
                {
                    triggers.map(({ name }, i) => (
                        <TabsPrimitive.Trigger className=" flex h-[45px] flex-1 cursor-default select-none items-center justify-center bg-white text-[15px] leading-none text-gray-600 outline-none first:rounded-tl-md last:rounded-tr-md hover:text-blue-500 data-[state=active]:text-blue-500  data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[inset_0_-1px_0_0,0_1px_0_0]" value={`tab${i + 1}`}>
                            {name}
                        </TabsPrimitive.Trigger>
                    ))}
            </TabsPrimitive.List>

            {triggers.map(({ children }, i) => (
                <TabsPrimitive.Content className="
                grow rounded-b-md bg-white py-5 outline-none " value={`tab${i + 1}`}>
                    {/* // a div must be wrapped here to use flexbox to center children, if flexbox used on TabsPrimitive.Content directly, it will conflict with `display: none` of inactive tab */}
                    <div className="flex justify-center w-full">
                        {children}
                    </div>
                </TabsPrimitive.Content>
            ))
            }
        </TabsPrimitive.Root>
    )
}