import {useEffect, useState} from "react";
import {GitLastNumberOfOrderOrAdded} from "@/app/hooks/gitLastNumberOfOrderOrAdded";
import {sendInputData} from "@/app/server/firebaseQuery";
import {hundleAddeorReturnItems} from "@/app/hooks/hundleAddeorReturnItems";
import { useCookies } from 'next-client-cookies';
import Swal from "sweetalert2";
import {useRouter} from "next/navigation";
import {data, dataInOut, dataStoryType, items, qtn, storyObjType} from "@/app/type/typeDataFirebase";


const AddOrder = ({OutputLimit,dataStore,setPending,startTransition,setShowOrder}
: {
OutputLimit :dataInOut,
dataStore :dataStoryType,
setPending :any,
startTransition :any,
setShowOrder :any
})=>{
    const coc:string|undefined = useCookies().get('token')
    let rot = useRouter()

    const [addData , setAddData] = useState({
        item:'',
        qtn:0,
        date:'',
        noa:0,
        client:'',
        sender:''
    })
    const handleChange = (e:any) => setAddData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    const [arrayOfItems , setArrayOfItems] = useState<string[]>([])
    const [arrayOfQtn, setArrayOfQtn] = useState<number[]>([])
    let{ item, qtn, date,noa,client,sender}= addData
    const handelAddToOrder = (e:any) => {
        e.preventDefault()
        setArrayOfItems([...arrayOfItems,item])
        setArrayOfQtn([...arrayOfQtn,Number(qtn)])
    }
    const largestNumber =  GitLastNumberOfOrderOrAdded(OutputLimit)

    const allQtn = arrayOfQtn?arrayOfQtn.reduce((accumulator:number, currentValue:number) => accumulator + currentValue, 0):0;

    const dataSend:data = {
        id:largestNumber,
        items:arrayOfItems,
        qtn:arrayOfQtn,
        date:date,
        noa:Number(noa),
        client:client,
        allQtn:allQtn,
        sender:sender
    }
    const dataOnArray:dataInOut = [dataSend]
    const HandleAddToDatabase = (e:any)=>{
        e.preventDefault()
        Swal.fire({
            title: "Are you sure?",
            text: `You Wont To Remove This !!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {
                sendInputData(dataSend,`${coc}/Input and output data/Output/${dataSend.id}`).then((r:void) =>r)
                hundleAddeorReturnItems(dataSend.id,dataSend.items,dataSend.qtn,dataStore,coc,'remove')
                setShowOrder(false)
                setPending(true);
                startTransition(rot.refresh);
                setPending(false);
            }
        });


    }
    const [qtnAndBox ,setQtnAndBox ] = useState<{qtn:number,box:number}>({
        qtn:0,
        box:1
    })
    useEffect(()=>{
        dataStore.forEach((e:storyObjType):void=>{
            if(e.item == addData.item){
                setQtnAndBox({
                    qtn:e.qtn,
                    box:Number(e.box)
                })
            }
        })
    },[addData.item])


    return(
        < >
            <h1 className='text-black mt-4 mr-4 text-end'>Add Order</h1>
            <form className='flex flex-col mx-3 mt-5 max-h-[600px]'>

                <div className='flex flex-col my-4 border-b-2 border-blue-900'>
                    <label htmlFor="date" className='text-blue-950'>Date</label>
                    <input type="date" id='date' name='date' className='text-black border-black border-2 rounded-xl px-3 my-2' onChange={handleChange} required />
                </div>
                <div className='flex flex-col my-4 border-b-2 border-blue-900'>
                    <label htmlFor='noa' className='text-blue-950'>Noa<span className='text-green-700'>#</span>:</label>
                    <input id='noa' className='text-black border-black border-2 rounded-xl pl-3 my-2'  name='noa' onChange={handleChange} placeholder='noa...' type='number'/>
                </div>
                <div className='flex flex-col my-4 border-b-2 border-blue-900'>
                    <label htmlFor='client' className='text-blue-950'>Client:</label>
                    <input id='client' className='text-black border-black border-2 rounded-xl pl-3 my-2' name='client' onChange={handleChange} placeholder='client...' type='text'/>
                </div>
                <div className='flex flex-col my-4 border-b-2 border-blue-900'>
                    <label htmlFor='sender' className='text-blue-950'>Sender:</label>
                    <input id='sender' className='text-black border-black border-2 rounded-xl pl-3 my-2' name='sender' onChange={handleChange} placeholder='client...' type='text'/>
                </div>
                <div className='flex flex-col my-4 border-b-2 border-blue-900'>
                    <label htmlFor="item" className='text-blue-950'>item :</label>
                    <select name="item" id="item" className='text-black border-black border-2 rounded-xl pl-3 my-2'
                            onChange={handleChange}  required>
                        <option ></option>
                        <optgroup label="Items : ">
                            {dataStore?.map((e:storyObjType,index:number)=>(
                                <option value={e.item} key={index}>{e.item}</option>
                            ))}
                        </optgroup>
                    </select>
                </div>
                <div className='flex flex-col my-4 border-b-2 border-blue-900'>
                    <label htmlFor="quantity" className='text-blue-950'>Quantity :</label>
                    <p className='text-blue-800 pl-2'>{qtnAndBox.qtn}</p>
                    <p className='text-blue-800 pl-2'>{Math.floor(qtnAndBox?.qtn / Number(qtnAndBox?.box))} Plus/ {qtnAndBox?.qtn - Math.floor(qtnAndBox?.qtn / Number(qtnAndBox?.box)) * Number(qtnAndBox?.box)}</p>
                    <input type="number" id='quantity' name='qtn' className='text-black border-black border-2 rounded-xl pl-3 my-2 '
                           onChange={handleChange} placeholder='Quantity ...' required />
                </div>
                <div className='flex flex-row justify-center items-center my-2'>
                    <button
                        onClick={(e):void=>{handelAddToOrder(e)}}
                        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">
                        Added
                    </button>

                </div>
                <div className='flex flex-col'>
                    {dataOnArray?.map((e:data,index:number)=>{
                        const items:items = e.items
                        const qtn:qtn = e.qtn
                        return(
                            <div className='w-full bg-[#1f2937] ' key={index}>
                                <div className='w-full flex flex-row justify-between px-3'>
                                    <h1>{e.sender}</h1>
                                    <h1>{e.date}</h1>
                                </div>
                                <table className='w-full'>
                                    <thead >
                                    <tr className='w-full flex flex-row justify-evenly bg-[#374151]'>
                                        <td className='w-1/2 text-center'>ITEM</td>
                                        <td className='w-1/2 text-center'>QTY</td>
                                    </tr>
                                    </thead>
                                    <tbody className='flex flex-row'>
                                    <tr className='flex flex-col w-1/2 '>
                                        {items?.map((f:string,indexF:number)=>(
                                            <td key={indexF} className='mb-2 border-b-2 pl-4'>{f}</td>
                                        ))
                                        }
                                    </tr>
                                    <tr className='flex flex-col w-1/2'>
                                        {qtn?.map((d:number,indexD:number)=>(
                                            <td key={indexD} className='mb-2 border-b-2 w-full text-center'>{d}</td>
                                        ))
                                        }
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        )})}
                </div>
                <div className='flex flex-row justify-center items-center my-2'>
                    <button type="submit"
                            onClick={(e):void=> {
                                HandleAddToDatabase(e)
                            }}
                            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">
                        Save
                    </button>

                </div>
            </form>
        </>
    )
}

export default AddOrder
