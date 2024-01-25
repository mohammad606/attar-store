'use client'
import DataTablesOrder from "@/app/commponents/allOrder/dataTablesOrder";
import Nav from "@/app/share/nav/nav";
import {dataInOut, dataStoryType} from "@/app/type/typeDataFirebase";


const ContenerClientAllOrder = ({AllOutput,dataStore,coc}
: {
AllOutput :dataInOut,
dataStore :dataStoryType,
coc :string
})=>{


    return(
        <div>
            <Nav/>
            <DataTablesOrder AllOutput={AllOutput} dataStore={dataStore} coc={coc}/>

        </div>
    )
}

export default ContenerClientAllOrder
