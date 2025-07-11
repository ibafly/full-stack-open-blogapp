import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from '@/components/shared/sheet';
import ScrollArea from '@/components/shared/scrollArea';
import { Check, FileText, Menu, Scroll, Send, Star, Trash } from 'lucide-react';
import Link from 'next/link';
import { title } from 'process';
import React from 'react';

export default function NavMenu({
    className = '',
    barSide = 'right',
    headerNode = <h1 className="text-lg font-semibold">Menu</h1>,
    actionsNode
}: {
    className?: string;
    barSide?: 'top' | 'right' | 'bottom' | 'left';
    headerNode?: React.ReactNode;
    actionsNode?: React.ReactNode;
}) {
    return (
        <Sheet>
            <SheetTrigger className={className} asChild>
                <button className="mr-2 -ml-1 cursor-pointer rounded-full p-2 hover:bg-gray-100">
                    <Menu size={20} />
                </button>
            </SheetTrigger>
            <SheetContent
                side={barSide}
                className="w-[300px] transition-transform duration-200 ease-out data-[state=open]:duration-200 data-[state=open]:ease-out sm:w-[400px]"
            >
                <SheetTitle asChild>{headerNode}</SheetTitle>
                <ScrollArea
                    className="mt-4"
                    children={
                        <nav className="flex flex-col space-y-4">
                            {actionsNode}
                            {/* <Link
                        href="/f/inbox"
                        className="flex items-center space-x-2 rounded p-2 text-gray-700 hover:bg-gray-100"
                    >
                        <Menu size={20} />
                        <span>Inbox</span>
                    </Link>
                    <Link
                        href="/f/starred"
                        className="flex items-center space-x-2 rounded p-2 text-gray-700 hover:bg-gray-100"
                    >
                        <Star size={20} />
                        <span>Starred</span>
                    </Link>
                    <Link
                        href="/f/drafts"
                        className="flex items-center space-x-2 rounded p-2 text-gray-700 hover:bg-gray-100"
                    >
                        <FileText size={20} />
                        <span>Drafts</span>
                    </Link>
                    <Link
                        href="/f/sent"
                        className="flex items-center space-x-2 rounded p-2 text-gray-700 hover:bg-gray-100"
                    >
                        <Send size={20} />
                        <span>Sent Mail</span>
                    </Link>
                    <Link
                        href="/f/archive"
                        className="flex items-center space-x-2 rounded p-2 text-gray-700 hover:bg-gray-100"
                    >
                        <Check size={20} />
                        <span>Archive</span>
                    </Link>
                    <Link
                        href="/f/trash"
                        className="flex items-center space-x-2 rounded p-2 text-gray-700 hover:bg-gray-100"
                    >
                        <Trash size={20} />
                        <span>Trash</span>
                    </Link> */}
                        </nav>
                    } />
            </SheetContent>
        </Sheet>
    );
}
