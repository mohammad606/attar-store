import {NextResponse} from "next/server";
import {getCookies} from "next-client-cookies/server";

const protectRoutesAllOrder = ['/pages/allOrder']
const protectRoutesHome = ['/pages/home']
const protectRoutesAllAdded = ['/pages/allAdded']
const protectRoutesEditOrder = ['/pages/editOrder']
const protectRoutesShowOrder = ['/pages/showOrder']
const protectRoutesStore = ['/pages/store']


export default function middleware(req:any){
    const coc:string|undefined = getCookies().get('token')

    if(!coc && protectRoutesAllOrder.includes(req.nextUrl.pathname)){
        const absolutURL = new URL("/pages/logIn",req.nextUrl.origin)
        return NextResponse.redirect(absolutURL.toString())
    }
    if(!coc && protectRoutesHome.includes(req.nextUrl.pathname)){
        const absolutURL = new URL("/pages/logIn",req.nextUrl.origin)
        return NextResponse.redirect(absolutURL.toString())
    }
    if(!coc && protectRoutesAllAdded.includes(req.nextUrl.pathname)){
        const absolutURL = new URL("/pages/logIn",req.nextUrl.origin)
        return NextResponse.redirect(absolutURL.toString())
    }
    if(!coc && protectRoutesEditOrder.includes(req.nextUrl.pathname)){
        const absolutURL = new URL("/pages/logIn",req.nextUrl.origin)
        return NextResponse.redirect(absolutURL.toString())
    }
    if(!coc && protectRoutesShowOrder.includes(req.nextUrl.pathname)){
        const absolutURL = new URL("/pages/logIn",req.nextUrl.origin)
        return NextResponse.redirect(absolutURL.toString())
    }
    if(!coc && protectRoutesStore.includes(req.nextUrl.pathname)){
        const absolutURL = new URL("/pages/logIn",req.nextUrl.origin)
        return NextResponse.redirect(absolutURL.toString())
    }
}