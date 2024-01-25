"use client"
import style from "../../cssModuls/logIn.module.css"
import {useState} from "react";
import singIn from "@/app/hooks/authHandler";
import { useCookies } from 'next-client-cookies';



const FormLogIn = ()=>{
    const [email , setEmail ] = useState<string>('')
    const [password ,setPassword] = useState<string>('')
    const cookies = useCookies();
    return(
        <form >
            <div className={style.userBox}>
                <input type="email" name="email" onChange={e=>setEmail(e.target.value)} autoComplete='off' required />
                <label htmlFor="">Email</label>
            </div>
            <div className={style.userBox}>
                <input type="password" name="password" onChange={e=>setPassword(e.target.value)}  autoComplete='off' required />
                <label htmlFor="">Password</label>
            </div>
            <button onClick={(e)=> {
                e.preventDefault()
                return singIn(email,password,cookies)
            }}
                    disabled={!email || !password}
                    className={style.btn} type="submit">Send</button>
        </form>
    )
}








export default FormLogIn