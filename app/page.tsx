import Card from "@/components/home/card"
import { DEPLOY_URL } from "@/lib/constants"
import { Github, Twitter } from "@/components/shared/icons"
import LoginForm from "@/components/home/login-form"
import ComponentGrid from "@/components/home/component-grid"
import Image from "next/image"
import { nFormatter } from "@/lib/utils"

export default async function Home() {
  const { stargazers_count: stars } = await fetch(
    "https://api.github.com/repos/steven-tey/precedent",
    {
      ...(process.env.GITHUB_OAUTH_TOKEN && {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_OAUTH_TOKEN}`,
          "Content-Type": "application/json",
        },
      }),
      // data will revalidate every 24 hours
      next: { revalidate: 86400 },
    },
  )
    .then((res) => res.json())
    .catch((e) => console.log(e))

  return (
    <>
      {/* <div className="my-10 grid w-full max-w-screen-xl animate-fade-up grid-cols-1 gap-5 px-5 md:grid-cols-3 xl:px-0">
        {[features[0]].map(({ title, description, demo, large }) => (
          <Card
            key={title}
            title={title}
            description={description}
            demo={(demo)}
            large={large}
          />
        ))}
      </div> */}

      <div className="my-10 grid w-full max-w-screen-xl animate-fade-up grid-cols-1 gap-5 px-5 md:grid-cols-3 xl:px-0">
        <div
          className={`relative col-span-1 md:col-start-2 h-96 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md
      }`}
        >
          <div className="mt-10 mb-4 mx-auto max-w-lg text-center">
            <h2 className="bg-gradient-to-br from-black to-stone-500 bg-clip-text font-display text-xl font-bold text-transparent [text-wrap:balance] md:text-3xl md:font-normal">
              {features[0].title}
            </h2>
            <div className="prose-sm mt-3 leading-normal text-gray-500 [text-wrap:balance] md:prose">
            </div>
          </div>
          <div className="flex h-60 items-center justify-center">{<LoginForm />}</div>

        </div>
      </div>

      <h1
        className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm [text-wrap:balance] md:text-7xl md:leading-[5rem]"
        style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
      >
        Fullstackopen Blogapp refactored with next.js
      </h1>
      <p
        className="mt-6 animate-fade-up text-center text-gray-500 opacity-0 [text-wrap:balance] md:text-xl"
        style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
      >
        Tech stack: React next.js Tailwind RadixUI MongoDB Vercel...Precedent code as starter kit
      </p>

      <div className="my-10 grid w-full max-w-screen-xl animate-fade-up grid-cols-1 gap-5 px-5 md:grid-cols-3 xl:px-0">
        {features.slice(1).map(({ title, description, demo, large }) => (
          <Card
            key={title}
            title={title}
            description={description}
            demo={(demo)}
            large={large}
          />
        ))}
      </div>

      <div className="z-10 w-full max-w-xl px-5 xl:px-0">

        <a
          href="https://twitter.com/steventey/status/1613928948915920896"
          target="_blank"
          rel="noreferrer"
          className="mx-auto my-5 flex max-w-fit animate-fade-up items-center justify-center space-x-2 overflow-hidden rounded-full bg-blue-100 px-7 py-2 transition-colors hover:bg-blue-200"
        >
          <Twitter className="h-5 w-5 text-[#1d9bf0]" />
          <p className="text-sm font-semibold text-[#1d9bf0]">
            Introducing Precedent (starter kit of this page)
          </p>
        </a>
        <div
          className="mx-auto mt-6 flex animate-fade-up items-center justify-center space-x-5 opacity-0"
          style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
        >
          <a
            className="group flex max-w-fit items-center justify-center space-x-2 rounded-full border border-black bg-black px-5 py-2 text-sm text-white transition-colors hover:bg-white hover:text-black"
            href={DEPLOY_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              className="h-4 w-4 group-hover:text-black"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 4L20 20H4L12 4Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p>Deploy to Vercel</p>
          </a>
          <a
            className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-5 py-2 text-sm text-gray-600 shadow-md transition-colors hover:border-gray-800"
            href="https://github.com/steven-tey/precedent"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github />
            <p>
              <span className="hidden sm:inline-block">Star on</span> GitHub{" "}
              <span className="font-semibold">{nFormatter(stars)}</span>
            </p>
          </a>
        </div>
      </div>
    </>
  )
}

const features = [
  {
    title: "Welcome",
    description:
      "Input form to log in to blog pool.",
    large: false,
    demo: <LoginForm />,
  },
  {
    title: "Components",
    description:
      "Powered by [Tailwind CSS](https://tailwindcss.com), [Radix UI](https://www.radix-ui.com), and [Framer Motion](https://framer.com/motion).",
    large: true,
    demo: <ComponentGrid />
  },
  // {
  //   title: "Performance first",
  //   description:
  //     "Built on [Next.js](https://nextjs.org/) primitives like `@next/font` and `next/image` for stellar performance.",
  //   demo: <WebVitals />,
  // },
  // {
  //   title: "Deploy",
  //   description:
  //     "Jumpstart your next project by deploying Blog App Demo to [Vercel](https://vercel.com/) in one click.",
  //   demo: (
  //     <a href={DEPLOY_URL}>
  //       <Image
  //         src="https://vercel.com/button"
  //         alt="Deploy with Vercel"
  //         width={120}
  //         height={30}
  //         unoptimized
  //       />
  //     </a>
  //   ),
  // },
  {
    title: "Hooks, utilities, and more",
    description:
      "A collection of hooks, utilities, and `@vercel/og`",
    demo: (
      <div className="grid grid-flow-col grid-rows-3 gap-10 p-10">
        <span className="font-mono font-semibold">useIntersectionObserver</span>
        <span className="font-mono font-semibold">useLocalStorage</span>
        <span className="font-mono font-semibold">useScroll</span>
        <span className="font-mono font-semibold">nFormatter</span>
        <span className="font-mono font-semibold">capitalize</span>
        <span className="font-mono font-semibold">truncate</span>
      </div>
    ),
  },
]
