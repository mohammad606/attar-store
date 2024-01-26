'use server'
import Nav from "@/app/share/nav/nav";
import { getCookies } from 'next-client-cookies/server';
import ClientHome from "@/app/commponents/home/contenarClientHome";
import {fetchData, fetchDataWithLimit} from "@/app/server/redDataQuery";
import { dataInOut, dataStoryType} from "@/app/type/typeDataFirebase";


const Home =async  ()=>{
    const coc:string|undefined = getCookies().get('token')
    const data:dataRes = {
        dataOutLimit: await fetchDataWithLimit(`/${coc}/Input and output data/Output`,4),
        dataInputLimit: await fetchDataWithLimit(`/${coc}/Input and output data/Input`,4),
        dataInput :await fetchData(`/${coc}/Input and output data/Input`),
        dataOut : await fetchData(`/${coc}/Input and output data/Output`),
        dataStore :await fetchData(`/${coc}/Store`)
    }

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

    let dataOutLimit:dataInOut = data.dataOutLimit?data.dataOutLimit:Error
    let dataInputLimit :any= Array.isArray(data.dataInputLimit)?data.dataInputLimit:Object.values(data.dataInputLimit)?Object.values(data.dataInputLimit):Error
    let dataInput :dataInOut= data.dataInput?data.dataInput:Error
    let dataOut :dataInOut= data.dataOut?data.dataOut:Error
    let dataStore :dataStoryType= data.dataStore?data.dataStore:ErrorS


    return(
        <div className='h-full w-full flex flex-col flex-1'>
            <Nav/>
            <ClientHome dataInput={dataInput} dataOut={dataOut} dataOutLimit={dataOutLimit} dataInputLimit={dataInputLimit} dataStore={dataStore}/>

        </div>
    )
}

export default Home


type dataRes = {
    dataOutLimit:dataInOut,
    dataInputLimit:dataInOut,
    dataInput:dataInOut,
    dataOut:dataInOut,
    dataStore:dataStoryType
}
