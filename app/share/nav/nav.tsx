"use client"

import Mnu from "@/app/commponents/nav/mnu";
import Link from "next/link";

const Nav = ()=>{


    return(
        <div className='w-full h-[70px] bg-slate-900
                       flex flex-row justify-center items-center z-4  msm:justify-between'>
            <div className='w-1/4 h-full flex items-center justify-center msm:w-2/4 '>
                <Link href='/' className='text-center text-2xl font-bold'>My Store</Link>
            </div>
            <Mnu />

        </div>
    )
}
export default Nav