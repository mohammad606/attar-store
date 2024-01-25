import {updateData} from "@/app/server/firebaseQuery"
import {dataStoryType, items, qtn, storyObjType} from "@/app/type/typeDataFirebase";


export  const hundleAddeorReturnItems = (id:number,items:items,qtn:qtn,dataStore:dataStoryType,coc:string|undefined,type:string)=>{

            const handleType = (e:storyObjType,d:name_Qtn)=>{
                if(type == 'remove'){
                    return {qtn: e.qtn - d.qtn}
                }else {
                    return {qtn: e.qtn + d.qtn}
                }
            }
            dataStore.forEach((e:storyObjType)=>{
                const mergedArray:name_Qtn[] = items.map((key:string, index:number) => ({'name' : key ,'qtn' : qtn[index]}))
                mergedArray.forEach((d:name_Qtn)=>{
                    if(e.item == d.name){
                        updateData(`${coc}/Store/${e.id}`, handleType(e, d)).then(r  =>r)

                    }
                })
            })

}

type name_Qtn = {
    name:string,
    qtn:number
}