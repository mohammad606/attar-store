import { ref,update} from "firebase/database";
import {data} from "@/app/lib/firebaseConfig";
import {dataInOut, dataStoryType} from "@/app/type/typeDataFirebase";

const HandleDeletOrder = (allData:dataInOut,dataStore:dataStoryType,id:number,items:string[],qtn:number[],url:string,coc:string|undefined,type:string)=>{

            const HandleType = (i:any,e:any)=>{
                if(type == "order"){
                    return {qtn: Number(i.qtn) + Number(e.qtn)}
                }else {
                    return {qtn: Number(i.qtn) - Number(e.qtn)}
                }
            }
            allData.forEach((e:any)=>{
                if(e.id === id){
                    const mergedArrasy = items.map((key:string, index:number) => ({'name' : key ,'qtn' : qtn[index]}))
                    console.log(mergedArrasy)
                    mergedArrasy.map(e=>{
                        dataStore.forEach(i=>{
                            if(i.item === e.name ){
                                return   update(ref(data,`${coc}/Store/${i.id}`),HandleType(i,e));
                            }
                        })
                    })
                      update(ref(data, `${coc}/${url}/${e.id}`), {
                          delete: true
                      }).then (r =>r)
                }
            })


}

export default HandleDeletOrder