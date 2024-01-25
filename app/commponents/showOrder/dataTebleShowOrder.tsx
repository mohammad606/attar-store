
import HandleDeletOrder from "@/app/hooks/handleDeletOrder";
import React, {useState, useTransition} from "react";
// @ts-ignore
import DataTable from "react-data-table-component";
import {useRouter} from "next/navigation";
import Swal from "sweetalert2";
import {data, dataInOut, dataStoryType, items} from "@/app/type/typeDataFirebase";

const DataTables = ({dataOrder,dataStore, coc,typeOrder,id}:
 {
     dataOrder :dataInOut,
     dataStore :dataStoryType,
     coc :string,
     typeOrder :string,
     id :string
 })=>{
    let rot = useRouter()
    const [isPending, setPending] = useState<boolean>(false);
    const [isTransitionStarted, startTransition] = useTransition();
    const isMutating = isPending || isTransitionStarted;


    const customSortFunction = (rowA:any,rowB:any)=>{
        if(rowA.sender){
            const a = rowA.sender.toLowerCase()
            const b = rowB.sender.toLowerCase()
            return  a>b?1:b>a?-1:0
        }else if(rowA.client){
            const a = rowA.client.toLowerCase()
            const b = rowB.client.toLowerCase()
            return  a>b?1:b>a?-1:0
        }else if(rowA.date){
            const a = rowA.date
            const b = rowB.date
            return  a>b?1:b>a?-1:0
        } else if(rowA.noa){
            const a = rowA.client
            const b = rowB.client
            return  a>b?1:b>a?-1:0
        }else if(rowA.id){
            const a = rowA.client
            const b = rowB.client
            return  a>b?1:b>a?-1:0
        }
    }

    const columns:any[] = [
        {
            name:'Items',
            selector:(row:any)=>{
                const items = row.items
                return(
                    <div className='flex flex-col justify-evenly h-full' style={row.delete?{color:'#ff5757'}:{color:'#fff'}}>
                        {items.map((e:any,key:number)=>(
                            <p key={key} className='my-2'>{e}</p>
                        ))}
                    </div>
                )
            },
        },
        {
            name:'Qtn',
            selector:(row:any)=>{
                const qtn = row.qtn
                return(
                    <div className='flex flex-col justify-evenly h-full' style={row.delete?{color:'#ff5757'}:{color:'#fff'}}>
                        {qtn.map((e:any,key:number)=>(
                            <p key={key} className='my-2'>{e}</p>
                        ))}
                    </div>
                )
            }
        },
        {
            name:'Sender',
            sortable:true,
            selector:(row:any)=>{
                return(
                    <p style={row.delete?{color:'#ff5757'}:{color:'#fff'}}>{row.sender}</p>
                )
            },
            sortFunction:customSortFunction,
            style:{
                paddingTop:"15px"
            }
        },
        {
            name:'Client',
            sortable:true,
            selector:(row:any)=>{
                return(
                    <p style={row.delete?{color:'#ff5757'}:{color:'#fff'}}>{row.client}</p>
                )
            },
            sortFunction:customSortFunction,
            style:{
                paddingTop:"15px"
            }
        },
        {
            name:'Date',
            sortable:true,
            selector:(row:any)=>{
                return(
                    <p style={row.delete?{color:'#ff5757'}:{color:'#fff'}}>{row.date}</p>
                )
            },
            sortFunction:customSortFunction,
            style:{
                paddingTop:"15px"
            }
        },
        {
            name:'Noa',
            sortable:true,
            selector:(row:any)=>{
                return(
                    <p style={row.delete?{color:'#ff5757'}:{color:'#fff'}}>{row.noa}</p>
                )
            },
            sortFunction:customSortFunction,
            style:{
                paddingTop:"15px"
            }
        },
        {
            name:'Id',
            sortable:true,
            selector:(row:any)=>{
                return(
                    <p style={row.delete?{color:'#ff5757'}:{color:'#fff'}}>{row.id}</p>
                )
            },
            sortFunction:customSortFunction,
            style:{
                paddingTop:"15px"
            }

        },
        {
            name:'Delete',
            selector:(row:any)=>{
                return(
                    <button type="button"
                            onClick={()=>{
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
                                const url = typeOrder == 'order'?'Input and output data/Output':'Input and output data/Input'
                                 HandleDeletOrder(dataOrder,dataStore,row.id,row.items,row.qtn,url,coc,typeOrder)
                                setPending(true);
                                startTransition(rot.refresh);
                                setPending(false);
                                    }
                                });
                            }}
                            className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
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



    const ItemSelect:string = id?.replace(/%20/g, ' ');
    let allOrder:dataInOut | []= []
    dataOrder?.forEach((e:data)=>{
        var arrayitem:items =[...e.items]
        arrayitem.forEach((f:string)=>{
            if(f == ItemSelect ){
                // @ts-ignore
                allOrder.push(e)
            }
        })
    })

    return(
        <div className='w-full h-full mt-8'>
            <DataTable
                columns={columns}
                data={isMutating?[{items:'update...'}]:allOrder}
                defaultSortFieldId={6}
                pagination
                highlightOnHover
                theme='dark'
                customStyles={customStyles}


            />
        </div>
    )
}
export default DataTables