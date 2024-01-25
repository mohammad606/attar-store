import {updateData} from "@/app/server/firebaseQuery"
import {dataInOut, dataStoryType, data, storyObjType, items} from "@/app/type/typeDataFirebase";

const HandlechangeItemName = (dataInput:dataInOut , dataOut:dataInOut,dataStore :dataStoryType, itemOld:string,ItemNew:string,coc:string)=>{

            dataInput.map((e:data)=>{
                const items:items = e.items
                items.map((f:string,index:number)=>{
                    if(itemOld == f){
                        items.splice(index, 1, ItemNew);
                        return updateData(`${coc}/Input and output data/Input/${e.id}`, {items:items})
                    }
                })
            })
            dataOut.map((e:data)=>{
                const items:items = e.items
                items.map((f:string,index:number)=>{
                    if(itemOld == f){
                        items.splice(index, 1, ItemNew);
                        return updateData(`${coc}/Input and output data/Output/${e.id}`, {items:items})
                    }
                })
            })
            dataStore.map((e:storyObjType)=>{
                if(e.item == itemOld){
                    return updateData(`${coc}/Store/${e.id}`, {item:ItemNew})
                }
            })

}

export default HandlechangeItemName