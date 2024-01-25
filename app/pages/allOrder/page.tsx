'use server'
import {cookies} from "next/headers";
import ContenerClientAllOrder from "@/app/commponents/allOrder/contenerClientAllOrder";
import {fetchData} from "@/app/server/redDataQuery";
import {dataInOut, dataStoryType} from "@/app/type/typeDataFirebase";


const AllOrder = async ()=>{
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
        dataOut:await fetchData(`/${coc}/Input and output data/Output`),
        dataStore:await fetchData(`/${coc}/Store`)
    }

    let dataOut :dataInOut= data.dataOut?data.dataOut:Error;
    let dataStore :dataStoryType= data.dataStore?data.dataStore:ErrorS;


    return (
        <div>
            <ContenerClientAllOrder AllOutput={dataOut} dataStore={dataStore} coc={cookie}/>
        </div>
    )
}
export default AllOrder


type dataRes = {
    dataOut:dataInOut,
    dataStore:dataStoryType
}