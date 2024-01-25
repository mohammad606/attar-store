
import ContenarClientStore from "@/app/commponents/store/contenarClientStore";
import {cookies} from "next/headers";
import {fetchData} from "@/app/server/redDataQuery";
import {dataInOut, dataStoryType} from "@/app/type/typeDataFirebase";


const Store =async ()=>{
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
        dataInput :await fetchData(`/${cookie}/Input and output data/Input`),
        dataOut : await fetchData(`/${cookie}/Input and output data/Output`),
        dataStore :await fetchData(`/${cookie}/Store`)
    }


    let dataStore :dataStoryType= data.dataStore?data.dataStore:ErrorS
    let AllOutput :dataInOut= data.dataOut?data.dataOut:Error
    let AllInput :dataInOut= data.dataInput?data.dataInput:Error


    return (
        <>

            <ContenarClientStore AllOutput={AllOutput} AllInput={AllInput} dataStore={dataStore} coc={cookie} />
        </>
    )
}
export default Store


type dataRes = {
    dataInput:dataInOut,
    dataOut:dataInOut,
    dataStore:dataStoryType
}