'use client'
import React, {useState, useTransition} from "react"
// @ts-ignore
import DataTable from "react-data-table-component";
import HandleDeletOrder from "@/app/hooks/handleDeletOrder";
import {useRouter} from "next/navigation";
import Swal from "sweetalert2";
import {data, dataInOut, dataStoryType, items, qtn} from "@/app/type/typeDataFirebase";
import {RemoveUndefinedFromArray} from "@/app/hooks/removeUndfindFromArray";

const DataTablesAdded = ({AllAdded,dataStore,coc}:
{
 AllAdded :dataInOut,
 dataStore:dataStoryType
 ,coc:string
})=>{
    let rot = useRouter()
    const [isPending, setPending] = useState(false);
    const [isTransitionStarted, startTransition] = useTransition();
    const isMutating = isPending || isTransitionStarted;
    const caseInsensitiveSortId = (rowA:data, rowB:data) => {
        const a = rowA.id;
        const b = rowB.id;

        if (a > b) {
            return 1;
        }

        if (b > a) {
            return -1;
        }

        return 0;
    };
    const caseInsensitiveSortNoa = (rowA:data, rowB:data) => {
        const a = Number(rowA.noa);
        const b = Number(rowB.noa);

        if (a > b) {
            return 1;
        }

        if (b > a) {
            return -1;
        }

        return 0;
    };
    const caseInsensitiveSortDate = (rowA:data, rowB:data) => {
        const a = rowA.date;
        const b = rowB.date;

        if (a > b) {
            return 1;
        }

        if (b > a) {
            return -1;
        }

        return 0;
    };






    const columns :any[] = [
        {
            name:'Items',
            selector:(row:data)=>{
                const items:items = row.items?row.items:['noData']
                return(
                    <div className='flex flex-col justify-evenly h-full' style={row.delete?{color:'#ff5757'}:{color:'#fff'}}>
                        {Array.isArray(items) ?items?.map((e:string)=>(
                            <p className='my-2'>{e}</p>
                        )):false}
                    </div>
                )
            },

        },
        {
            name:'Qtn',
            selector:(row:data)=>{
                const qtn:qtn = row.qtn?row.qtn:[1]
                return(
                    <div className='flex flex-col justify-evenly h-full' style={row.delete?{color:'#ff5757'}:{color:'#fff'}}>
                        {Array.isArray(qtn) ?qtn?.map((e:number)=>(
                            <p className='my-2'>{e}</p>
                        )):false}
                    </div>
                )
            }
        },
        {
            name:'Client',
            selector:(row:data)=>{
                return(
                    <p style={row.delete?{color:'#ff5757'}:{color:'#fff'}}>{row.client?row.client:'أنتاج'}</p>
                )
            },
            style:{
                paddingTop:"15px"
            }
        },
        {
            name:'Date',
            sortable:true,
            selector:(row:data)=>{
                return(
                    <p style={row.delete?{color:'#ff5757'}:{color:'#fff'}}>{row.date}</p>
                )
            },
            sortFunction:caseInsensitiveSortDate,
            style:{
                paddingTop:"15px"
            }
        },
        {
            name:'Noa',
            sortable:true,
            selector:(row:data)=>{
                return(
                    <p style={row.delete?{color:'#ff5757'}:{color:'#fff'}}>{row.noa}</p>
                )
            },
            sortFunction:caseInsensitiveSortNoa,
            style:{
                paddingTop:"15px"
            }
        },
        {
            name:'Id',
            sortable:true,
            selector:(row:data)=>{
                return(
                    <p style={row.delete?{color:'#ff5757'}:{color:'#fff'}}>{row.id}</p>
                )
            },
            sortFunction:caseInsensitiveSortId,
            style:{
                paddingTop:"15px"
            }

        },
        {
            name:'Delete',
            selector:(row:data)=>{
                return(
                    <button type="button"
                            onClick={(e)=>{
                                e.preventDefault()
                                Swal.fire({
                                    title: "Are you sure?",
                                    text: `You Wont To Add This !!`,
                                    icon: "warning",
                                    showCancelButton: true,
                                    confirmButtonColor: "#3085d6",
                                    cancelButtonColor: "#d33",
                                    confirmButtonText: "Yes"
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                HandleDeletOrder(AllAdded,dataStore,row.id,row.items,row.qtn,`Input and output data/Input`,coc,'add')
                                setPending(true);
                                startTransition(rot.refresh);
                                setPending(false);
                                    }
                                });
                            }}
                            className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 msm:!px-3 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
                        Delete</button>

                )
            },
            style:{
                padding:'0px',
            }
        },


    ]

    const customStyles = {
        rows:{

            style:{
                borderWidth:'1px',
                borderStyle: 'soled',
                borderColor: '#fff',

                minHeight:'120px'
            }
        },
        headCells:{
            style: {
                backgroundColor:'#0f172a'
            }
        },
        pagination:{
            style:{
                backgroundColor:'#0f172a'
            }
        }

    }
    const removeUnd =  RemoveUndefinedFromArray(AllAdded)
    const [search ,setSearch] =useState<string | undefined> ()

    const data = !search?removeUnd:removeUnd.filter((e:data)=>{
        return  e.date.includes(search)
    })
    const err = [
        {
            id:0,
            items:['no Data'],
            qtn:[0],
            client:'no Data',
            date : 'no Data',
            noa : 0
        }
    ]

    const checkData :any = data?data:err




    return(
        <div className='mx-8 mt-8'>
            <form className='flex flex-row bg-blue-950 w-full h-[80px] items-center pl-10 rounded-t-2xl'>
                <label className='mr-5'>Search : </label>
                <input value={search} type='text' onChange={(e):void=>{setSearch(e.target.value)}}
                       className='w-[200px] msm:w-[150px] h-1/2 text-black  rounded-2xl border-2 border-black mr-5 pl-4' placeholder='day or month ... '/>
            </form>
            <DataTable
                columns={columns}
                data={isMutating?[{items:'update...'}]:checkData}
                pagination
                highlightOnHover
                theme='dark'
                customStyles={customStyles}


            />
        </div>
    )
}



export default DataTablesAdded