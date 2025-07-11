"use client"

import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";

import { cn } from "@/lib/utils";


export default function ScrollArea({
    children,
    className

}: {
    children?: React.ReactNode;
    className?: string;
}) {
    return (
        <ScrollAreaPrimitive.Root type="hover" className={cn("overflow-hidden rounded", className)}>
            <ScrollAreaPrimitive.Viewport className="h-full rounded">
                {children}
            </ScrollAreaPrimitive.Viewport>
            <ScrollAreaPrimitive.Scrollbar
                className="flex touch-none select-none bg-gray-200 p-0.5 transition-colors duration-[160ms] ease-out hover:bg-gray-300 data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
                orientation="vertical"
            >
                <ScrollAreaPrimitive.Thumb className="relative flex-1 rounded-[10px] bg-opacity-50 bg-blue-800 before:absolute before:left-1/2 before:top-1/2 before:size-full before:min-h-11 before:min-w-11 before:-translate-x-1/2 before:-translate-y-1/2" />
            </ScrollAreaPrimitive.Scrollbar>
            <ScrollAreaPrimitive.Scrollbar
                className="flex touch-none select-none bg-gray-200 p-0.5 transition-colors duration-[160ms] ease-out hover:bg-gray-300 data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
                orientation="horizontal"
            >
                <ScrollAreaPrimitive.Thumb className="relative flex-1 rounded-[10px] bg-opacity-50 bg-blue-800 before:absolute before:left-1/2 before:top-1/2 before:size-full before:min-h-[44px] before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2" />
            </ScrollAreaPrimitive.Scrollbar>
            <ScrollAreaPrimitive.Corner className="bg-gray-300" />
        </ScrollAreaPrimitive.Root>
    )
}

