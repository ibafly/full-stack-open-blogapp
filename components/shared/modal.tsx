"use client"

import { Dispatch, SetStateAction } from "react"
import { cn } from "@/lib/utils"
// import { Drawer } from "vaul"
import * as Dialog from "@radix-ui/react-dialog"
import { XIcon } from "lucide-react";
import { Button } from '@/components/shared/button';
// import useMediaQuery from "@/lib/hooks/use-media-query"

export default function Modal({
  children,
  className,
  showModal,
  setShowModal,
}: {
  children: React.ReactNode;
  className?: string;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}) {
  // const { isMobile } = useMediaQuery()

  // if (isMobile) {
  //   return (
  //     <Drawer.Root open={showModal} onOpenChange={setShowModal} >
  //       <Drawer.Overlay className="fixed inset-0 z-40 bg-gray-100 bg-opacity-10 backdrop-blur" />
  //       <Drawer.Portal>
  //         <Drawer.Content
  //           className={cn(
  //             "fixed bottom-0 left-0 right-0 z-50 mt-24 rounded-t-[10px] border-t border-gray-200 bg-white",
  //             className,
  //           )}
  //         >
  //           <div className="sticky top-0 z-20 flex w-full items-center justify-center rounded-t-[10px] bg-inherit">
  //             <div className="my-3 h-1 w-12 rounded-full bg-gray-300" />
  //           </div>
  //           {children}
  //           <input type="text" placeholder="F1" />
  //           <input type="text" placeholder="F2" />
  //           <input type="text" placeholder="F3" />
  //         </Drawer.Content>
  //         <Drawer.Overlay />
  //       </Drawer.Portal>
  //     </Drawer.Root>
  //   )
  // }


  return (
    <Dialog.Root open={showModal} onOpenChange={setShowModal}
      // maybe bugs in Dialog somewhere, don't know how to address it. 
      // WORKAROUND: model={false} and write a 'overlay' div instead of default Overlay
      // then no more focus/text-range-selection problems with Form/text in Dialog 
      // this workaround is not work for vaul Drawer so we have to drop whole Drawer
      modal={false}
    >
      <Dialog.Portal>
        {/* <Dialog.Overlay */}
        <div
          id="modal-backdrop"
          className="animate-fade-in fixed inset-0 z-40 bg-gray-100 bg-opacity-50 backdrop-blur-md"
        // className="fixed inset-0 z-40 bg-black/80 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0"
        />


        {/* keep .Content z-index >= .Layer, the point is we have to set the height/width of .Layer to leave blank to touch back*/}
        <Dialog.Content
          onOpenAutoFocus={(e) => e.preventDefault()}
          // onCloseAutoFocus={(e) => e.preventDefault()}
          className={cn(
            "animate-scale-in fixed inset-0 z-40 m-auto max-h-fit w-full max-w-md border border-gray-200 bg-white p-0 shadow-xl md:rounded-2xl",

            // 'fixed z-40 flex flex-col gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=closed]:animate-out data-[state=open]:duration-500 data-[state=open]:animate-in',
            // 'inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm',
            className,
          )}
        >
          <Dialog.Title />
          {children}

          <Dialog.Close asChild>
            <Button
              className="absolute bottom-6 right-6 p-8 cursor-pointer rounded-full"
              size="other"
              variant="ghost"
              aria-label="Close"
            >
              <XIcon size={40} />
              <span className="sr-only">Close</span>
            </Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
