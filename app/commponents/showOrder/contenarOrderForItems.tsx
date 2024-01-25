'use client'
import DataTables from "@/app/commponents/showOrder/dataTebleShowOrder";
import Nav from "@/app/share/nav/nav";
import {data, dataInOut, dataStoryType} from "@/app/type/typeDataFirebase";
import {RemoveUndefinedFromArray} from "@/app/hooks/removeUndfindFromArray";


const ContenarOrderForItems =({typeOrder,dataOrder,dataStore,coc,id}:
{
    typeOrder :string,
    dataOrder :dataInOut,
    dataStore :dataStoryType,
    coc :string,
    id :string
})=>{

    const removeUnd :dataInOut= RemoveUndefinedFromArray(dataOrder)
    const removeUndStore :dataStoryType= RemoveUndefinedFromArray(dataStore)

    return (
        <div>
            <Nav/>
            <DataTables dataOrder={removeUnd} dataStore={removeUndStore} coc={coc} typeOrder={typeOrder} id={id}/>
        </div>
    )
}
export default ContenarOrderForItems

