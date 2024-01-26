
import HandleDeletOrder from "@/app/hooks/handleDeletOrder";
import React, {useState, useTransition} from "react";
// @ts-ignore
import DataTable from "react-data-table-component";
import {useRouter} from "next/navigation";
import Swal from "sweetalert2";
import {data, dataInOut, dataStoryType, items} from "@/app/type/typeDataFirebase";
import Link from "next/link";

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

    const typeEditOrder:string = typeOrder == 'order'?'output':'input'

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
            selector:(row:any)=>{
                return(
                    <p style={row.delete?{color:'#ff5757'}:{color:'#fff'}}>{row.sender}</p>
                )
            },
            style:{
                paddingTop:"15px"
            }
        },
        {
            name:'Client',
            selector:(row:any)=>{
                return(
                    <p style={row.delete?{color:'#ff5757'}:{color:'#fff'}}>{row.client}</p>
                )
            },
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
            sortFunction:caseInsensitiveSortDate,
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
            sortFunction:caseInsensitiveSortNoa,
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
            sortFunction:caseInsensitiveSortId,
            style:{
                paddingTop:"15px"
            }

        },
        {
            name:"Edite",
            selector:(row:data)=>{
                return(
                    <Link href={`/pages/editOrder/${row.id}/${typeEditOrder}`} >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" data-name="Layer 1" viewBox="0 0 24 24" id="Edit"><path d="M3.5,24h15A3.51,3.51,0,0,0,22,20.487V12.95a1,1,0,0,0-2,0v7.537A1.508,1.508,0,0,1,18.5,22H3.5A1.508,1.508,0,0,1,2,20.487V5.513A1.508,1.508,0,0,1,3.5,4H11a1,1,0,0,0,0-2H3.5A3.51,3.51,0,0,0,0,5.513V20.487A3.51,3.51,0,0,0,3.5,24Z" fill="#00c6ff" className="color000000 svgShape"></path><path d="M9.455,10.544l-.789,3.614a1,1,0,0,0,.271.921,1.038,1.038,0,0,0,.92.269l3.606-.791a1,1,0,0,0,.494-.271l9.114-9.114a3,3,0,0,0,0-4.243,3.07,3.07,0,0,0-4.242,0l-9.1,9.123A1,1,0,0,0,9.455,10.544Zm10.788-8.2a1.022,1.022,0,0,1,1.414,0,1.009,1.009,0,0,1,0,1.413l-.707.707L19.536,3.05Zm-8.9,8.914,6.774-6.791,1.4,1.407-6.777,6.793-1.795.394Z" fill="#00c6ff" className="color000000 svgShape"></path></svg>
                    </Link>
                )
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



    let allOrder:dataInOut | []= []
    dataOrder?.forEach((e:data)=>{
        var arrayitem:items =[...e.items]
        arrayitem.forEach((f:string)=>{
            if(f == id ){
                // @ts-ignore
                allOrder.push(e)
            }else {

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
