'use client'

import DataTablesAdded from "./dataTablesAdded"
import Nav from "@/app/share/nav/nav";
import {dataInOut, dataStoryType} from "@/app/type/typeDataFirebase";

const ContenarClientAllAdded = ({AllAdded,dataStore,coc}:
{
 AllAdded :dataInOut,
 dataStore:dataStoryType
 ,coc:string
})=>{

    return(
        <>
            <Nav/>
            <DataTablesAdded AllAdded={AllAdded} dataStore={dataStore} coc={coc}/>
        </>
    )
}

export default ContenarClientAllAdded

