import { ref,set,update,remove} from "firebase/database";
import {data} from "@/app/lib/firebaseConfig";
import {storyObjType} from "@/app/type/typeDataFirebase";


export const sendInputData = (dataSend:any|storyObjType,url:string)=>{
    return set(ref(data, `${url}`), dataSend)
}

export const updateData = (url:string,req:any)=>{
    return update(ref(data,url),req);
}

export const deleteData = (url:string)=>{
    return remove(ref(data,url));
}












