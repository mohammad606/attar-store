'use client'
import Link from "next/link";
import HandleDeletOrder from "@/app/hooks/handleDeletOrder"
import {useCookies} from "next-client-cookies";
import {useRouter} from "next/navigation";
import Swal from "sweetalert2";
import {data, dataInOut, dataStoryType, items, qtn} from "@/app/type/typeDataFirebase";
import {RemoveUndefinedFromArray} from "@/app/hooks/removeUndfindFromArray";


const RedDataInput = ({dataInputLimit,dataStore,isMutating,setPending,startTransition}
:
{
dataInputLimit :dataInOut,
dataStore :dataStoryType,
isMutating : boolean,
setPending : any,
startTransition : any
})=>{
    const coc = useCookies().get('token')
    let rot = useRouter()
    const removeUndLimit :dataInOut= RemoveUndefinedFromArray(dataInputLimit)
    const removeUndStore :dataStoryType= RemoveUndefinedFromArray(dataStore)

    const handleDelete = (e:data,items:items,qtn:qtn)=>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't Delete this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {
        HandleDeletOrder(removeUndLimit,removeUndStore,e.id,items,qtn,`Input and output data/Input`,coc,'add')
        setPending(true);
        startTransition(rot.refresh);
        setPending(false);
            }
        });

    }
    return (
        <div className='relative z-2 w-1/2 flex flex-col border-l-2  border-t-2 msm:w-full msm:border-2'>
            <div className='w-full h-16 flex justify-center items-center border-gray-900 border-b-2'>
                <h1 className='text-[lawngreen]  text-xl'>Items</h1>
            </div>
            <div className='w-full h-auto flex border-gray-900 border-l-2'>
                <div className='mx-2 flex flex-col-reverse w-full'>
                    {isMutating?<p className='p-5'>update....</p>:removeUndLimit.length >= 1?removeUndLimit?.map((e:any,index:number)=>{
                            const items = e.items
                            const qtn = e.qtn

                            return(
                                <div key={index} className='w-full bg-[#1f2937] flex flex-col my-2 py-2 rounded-2xl '>
                                    {e.client?
                                        <div className='w-full flex flex-row justify-evenly mb-2'>
                                            <p className='w-1/2 text-center smm:text-[13px]'>NOA<span className='text-green-700 text-2xl'>#</span>:{e.noa}</p>
                                            <p className='w-1/2 text-center pt-2 smm:text-[13px]' style={e?.delete?{color:'#ff5757'}:{color:'#fff'}}>OrderNumber : <span className='text-green-700 text-lg'>{e?.id}</span></p>
                                        </div>
                                        :
                                        <div className='w-full flex flex-row justify-evenly mb-2'>
                                            <p className='w-1/2 text-center self-center smm:text-[13px]'>{e.oop}</p>
                                            <p className='w-1/2 text-center pt-2 smm:text-[13px]' style={e?.delete?{color:'#ff5757'}:{color:'#fff'}}>OrderNumber : <span className='text-green-700 text-lg'>{e?.id}</span></p>
                                        </div>}
                                    <div className='w-full flex flex-row justify-around'>
                                        <div>

                                            <button type="submit"
                                                    onClick={()=>{handleDelete(e,items,qtn)}}
                                                    className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-1.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">

                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                     fill="currentColor" className="bi bi-trash3"
                                                     viewBox="0 0 16 16">
                                                    <path
                                                        d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                                                </svg>

                                            </button>

                                            <button type="button"
                                                    className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">
                                                <Link href={`editOrder/${e.id}/input`}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" data-name="Layer 1" viewBox="0 0 24 24" id="Edit"><path d="M3.5,24h15A3.51,3.51,0,0,0,22,20.487V12.95a1,1,0,0,0-2,0v7.537A1.508,1.508,0,0,1,18.5,22H3.5A1.508,1.508,0,0,1,2,20.487V5.513A1.508,1.508,0,0,1,3.5,4H11a1,1,0,0,0,0-2H3.5A3.51,3.51,0,0,0,0,5.513V20.487A3.51,3.51,0,0,0,3.5,24Z" fill="#00c6ff" className="color000000 svgShape"></path><path d="M9.455,10.544l-.789,3.614a1,1,0,0,0,.271.921,1.038,1.038,0,0,0,.92.269l3.606-.791a1,1,0,0,0,.494-.271l9.114-9.114a3,3,0,0,0,0-4.243,3.07,3.07,0,0,0-4.242,0l-9.1,9.123A1,1,0,0,0,9.455,10.544Zm10.788-8.2a1.022,1.022,0,0,1,1.414,0,1.009,1.009,0,0,1,0,1.413l-.707.707L19.536,3.05Zm-8.9,8.914,6.774-6.791,1.4,1.407-6.777,6.793-1.795.394Z" fill="#00c6ff" className="color000000 svgShape"></path></svg>                                            </Link>
                                            </button>

                                        </div>
                                        <p>{e.date}</p>
                                    </div>
                                    <table>
                                        <thead >
                                        <tr className='w-full flex flex-row justify-evenly bg-[#374151]'>
                                            <td className='w-1/2 text-center smm:text-[14px]'>ITEM</td>
                                            <td className='w-1/2 text-center smm:text-[14px]'>QTN</td>
                                        </tr>
                                        </thead>
                                        <tbody className='flex flex-row'>
                                        <tr className='flex flex-col w-1/2 '>
                                            {items?.map((f:string,indexF:number)=>(
                                                <td key={indexF} className='mb-2 border-b-2 pl-4 smm:text-[13px]'>{f}</td>
                                            ))
                                            }
                                        </tr>
                                        <tr className='flex flex-col w-1/2'>
                                            {qtn?.map((d:number,indexD:number)=> {
                                                return ( <td key={indexD} className='mb-2 border-b-2 w-full text-center smm:text-[13px]'>{d}</td>)
                                            })
                                            }
                                        </tr>
                                        </tbody>
                                        <tfoot >
                                        <tr className='w-full flex flex-row'>
                                            <td className='w-1/2 pl-4 text-blue-400 smm:text-[14px]'>All Qtn :</td>
                                            <td className='w-1/2 text-center text-blue-400 smm:text-[14px]'>{e.allQtn}</td>
                                        </tr>
                                        </tfoot>
                                    </table>

                                </div>

                            )}):
                        <div className='m-5 mt-12'>
                            <h1 className='text-red-500 '>We did not find any data,If you are sure it exists,please refresh the page ,Click :
                                <span onClick={()=>window.location.reload()} className='text-orange-600 cursor-pointer'> Here</span>
                            </h1>
                        </div>}
                </div>
            </div>

        </div>
    )
}

export default RedDataInput
