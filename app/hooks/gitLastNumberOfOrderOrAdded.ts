import {data, dataInOut, dataStoryType, storyObjType} from "@/app/type/typeDataFirebase";


export const GitLastNumberOfOrderOrAdded = (data:dataInOut|dataStoryType)=>{
    var arrayKeys:number[] = []
    data?.map((e:data|storyObjType)=>{
        const key = [e?.id]
        arrayKeys.push(...key)
    })
    return  arrayKeys.length?Math.max(...arrayKeys) + 1:0;
}