'use server'
import ContenarClientAllAdded from "@/app/commponents/allAdded/contenarClientAllAdded"
import {cookies} from "next/headers";
import {fetchData} from "@/app/server/redDataQuery";
import {dataInOut, dataStoryType} from "@/app/type/typeDataFirebase";

const AllProducts =async ()=>{

    const coc:string|undefined = cookies().get('token')?.value
    const cookie:string = typeof coc == 'string'?coc:'no token'

    const Error:dataInOut = [
        {
            items:['noData'],
            qtn:[0],
            id:0,
            date:'noData',
            allQtn:0
        }
    ]
    const ErrorS:dataStoryType = [
        {
            item:'noData',
            qtn:0,
            id:0,
            box:0
        }
    ]

    const data:dataRes = {
        dataInput:await fetchData(`${coc}/Input and output data/Input`),
        dataStore:await fetchData(`/${coc}/Store`)
    }

    let dataInput :dataInOut = data.dataInput?data.dataInput:Error
    let dataStore :dataStoryType= data.dataStore?data.dataStore:ErrorS;

    return (
        <div>

            <ContenarClientAllAdded AllAdded={dataInput} dataStore={dataStore} coc={cookie}/>
        </div>
    )
}
export default AllProducts


type dataRes = {
    dataInput:dataInOut,
    dataStore:dataStoryType
}