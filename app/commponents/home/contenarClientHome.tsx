'use client'

import RedDataOut from "@/app/commponents/home/redDataOut";
import RedDataInput from "@/app/commponents/home/redDataInput";
import BtnAddAndOut from "@/app/commponents/home/btnAddAndOut";
import {useState, useTransition} from "react";
import {dataInOut, dataStoryType} from "@/app/type/typeDataFirebase";
const  ClientHome =({dataInput,dataOut,dataOutLimit,dataInputLimit,dataStore}
:
{
dataInput :dataInOut,
dataOut :dataInOut,
dataOutLimit :dataInOut,
dataInputLimit :dataInOut,
dataStore :dataStoryType
})=> {
    const [isPending, setPending] = useState<boolean>(false);
    const [isTransitionStarted, startTransition] = useTransition();
    const isMutating:boolean = isPending || isTransitionStarted;



    return (
        <div className='m-0 p-0 font-serif w-full h-[calc(100%-70px)] bg-[#0c0825] '>
            <svg  className='absolute top-[70px]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099ff" fillOpacity="1" d="M0,224L11.4,213.3C22.9,203,46,181,69,181.3C91.4,181,114,203,137,229.3C160,256,183,288,206,272C228.6,256,251,192,274,170.7C297.1,149,320,171,343,186.7C365.7,203,389,213,411,192C434.3,171,457,117,480,128C502.9,139,526,213,549,213.3C571.4,213,594,139,617,138.7C640,139,663,213,686,250.7C708.6,288,731,288,754,282.7C777.1,277,800,267,823,250.7C845.7,235,869,213,891,218.7C914.3,224,937,256,960,250.7C982.9,245,1006,203,1029,192C1051.4,181,1074,203,1097,208C1120,213,1143,203,1166,202.7C1188.6,203,1211,213,1234,229.3C1257.1,245,1280,267,1303,229.3C1325.7,192,1349,96,1371,96C1394.3,96,1417,192,1429,240L1440,288L1440,0L1428.6,0C1417.1,0,1394,0,1371,0C1348.6,0,1326,0,1303,0C1280,0,1257,0,1234,0C1211.4,0,1189,0,1166,0C1142.9,0,1120,0,1097,0C1074.3,0,1051,0,1029,0C1005.7,0,983,0,960,0C937.1,0,914,0,891,0C868.6,0,846,0,823,0C800,0,777,0,754,0C731.4,0,709,0,686,0C662.9,0,640,0,617,0C594.3,0,571,0,549,0C525.7,0,503,0,480,0C457.1,0,434,0,411,0C388.6,0,366,0,343,0C320,0,297,0,274,0C251.4,0,229,0,206,0C182.9,0,160,0,137,0C114.3,0,91,0,69,0C45.7,0,23,0,11,0L0,0Z"></path></svg>
            <BtnAddAndOut dataInput={dataInput} dataOut={dataOut} dataStore={dataStore} setPending={setPending} startTransition={startTransition}/>
            <div className='w-full flex flex-row msm:flex-col min-h-[75vh]'>
                        <RedDataOut  dataOutLimit={dataOutLimit} dataStore={dataStore} isMutating={isMutating} setPending={setPending} startTransition={startTransition}/>
                        <RedDataInput dataInputLimit={dataInputLimit} dataStore={dataStore} isMutating={isMutating} setPending={setPending} startTransition={startTransition}/>
            </div>
        </div>
    );
}

export default ClientHome



