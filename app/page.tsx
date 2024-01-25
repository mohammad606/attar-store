

import Nav from "@/app/share/nav/nav";
import Link from "next/link";

export default function DashBord() {
  return (
    <>
      <Nav/>
        <main className="flex min-h-screen w-full flex-col items-center justify-center p-24">
            <h1 className="text-white text-2xl">Welcome</h1>
            <Link className="text-red-700 text-2xl" href="/pages/home">To Home
            ..</Link>
        </main>
    </>
  )
}
