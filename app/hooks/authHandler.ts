'use client'
import {auth} from '@/app/lib/firebaseConfig'
import {useEffect, useState} from "react";
import {User as FirebaseUser,signOut , onAuthStateChanged} from "@firebase/auth";
import {signInWithEmailAndPassword } from "firebase/auth";



const  singIn=async (email:string,password:string,cookies:any)=>{
    await signInWithEmailAndPassword(auth,email,password)
        .then((userCredential) => {
        const user = userCredential.user;
        cookies.set('token',user.uid)
        return window.location.replace(`/pages/home`)
    })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
            return errorCode
        });
}

export default singIn

export async function sinOut(cookies:any){
    cookies.remove('token')
    await signOut(auth)
    return window.location.replace('/')
}

export function useUser(){
    const [user,setUser] = useState<FirebaseUser | null | false>(false)
    useEffect(()=>{
        return onAuthStateChanged(auth,(user)=>setUser(user))
    },[])
    return user
}