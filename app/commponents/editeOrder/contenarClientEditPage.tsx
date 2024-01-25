'use client'
import {useState, useTransition} from "react";
import FormEdit from "@/app/commponents/editeOrder/formEdit";
import Nav from "@/app/share/nav/nav";
import {data, dataStoryType, items, qtn, storyObjType} from "@/app/type/typeDataFirebase";
import {RemoveUndefinedFromArray} from "@/app/hooks/removeUndfindFromArray";

const ContenarClientEditPage = ({typeOrder,dataOrder,coc,dataStore}:
{
    typeOrder :string,
    dataOrder :data,
    coc:string,
    dataStore:dataStoryType
})=>{

    const removeUndStore:dataStoryType = RemoveUndefinedFromArray(dataStore)

    const data = [dataOrder]

    const [show , setShow] = useState(false)
    const [dataEdit , serDataEdit] = useState({})
    const [isPending, setPending] = useState(false);
    const [isTransitionStarted, startTransition] = useTransition();
    const isMutating = isPending || isTransitionStarted;
    const handleShow =(data:number|string|undefined,type:string,id?:number)=>{
        setShow(true)
        serDataEdit({
            data,
            type,
            id
        })
    }

    const filteredStory :storyObjType[]= removeUndStore?.filter(e =>!dataOrder.items.includes(e.item));

    return (
        <div className='w-full h-[100vh] relative bg-black'>
            <Nav/>
            <div className='absolute top-1/2 right-1/2 w-[650px] dd:w-full p-5 border-blue-950 border-2 rounded-2xl ' style={{transform:'translate(50%, -50%)'}}>
                {isMutating?<p>update...</p>:data?data?.map((e:data)=>{
                    const qtn:qtn = e.qtn
                    const items:items = e.items

                    return(
                        <div key={e?.id} className='w-full bg-[#1f2937] flex flex-col my-2 py-2 rounded-2xl' id={`${e?.id}`}>
                            <div className='w-full flex flex-row justify-evenly mb-2'>
                                {e.noa?<p className='w-1/2 text-center cursor-pointer hover:bg-[#374151] rounded-xl' onClick={()=>handleShow(e?.noa,'noa')}>NOA<span className='text-green-700 text-2xl'>#</span> : {e?.noa}</p>
                                    :false}
                                <p className='w-1/2 text-center pt-2 vsm:text-[16px]'>OrderNumber : <span className='text-green-700 text-lg'>{e?.id}</span></p>
                            </div>
                            {e.client?
                                <div className='w-full flex flex-row justify-evenly mb-2'>
                                    {e.sender?<p className='w-1/2 text-center  cursor-pointer hover:bg-[#374151] rounded-xl ' onClick={()=>handleShow(e?.sender,'sender')}>Sender : <span className='text-green-700 text-lg'>{e?.sender}</span></p>
                                        :false}
                                    <p className='w-1/2 text-center cursor-pointer hover:bg-[#374151] rounded-xl ' onClick={()=>handleShow(e?.client,'client')}>Client : <span className='text-green-700 text-lg' >{e?.client}</span></p>
                                </div>:false}
                            <table>
                                <thead >
                                <tr className='w-full flex flex-row justify-evenly bg-[#374151]'>
                                    <td className='w-1/2 text-center'>ITEM</td>
                                    <td className='w-1/2 text-center'>QTY</td>
                                </tr>
                                </thead>
                                <tbody className='flex flex-row'>
                                <tr className='flex flex-col w-1/2 '>
                                    {items?.map((d:string,index:number)=>(
                                        <td key={index} onClick={()=>handleShow(d,'item',items.indexOf(d))}
                                            className='mb-2 border-b-2 pl-4  cursor-pointer hover:bg-[#374151] rounded-xl'>{d}</td>
                                    ))
                                    }
                                </tr>
                                <tr className='flex flex-col w-1/2'>
                                    {qtn?.map((f:number,index:number)=>(
                                        <td key={index} onClick={()=>handleShow(f,'qtn',qtn.indexOf(f))}
                                            className='mb-2 border-b-2 w-full text-center  cursor-pointer hover:bg-[#374151] rounded-xl'>{f}</td>
                                    ))
                                    }
                                </tr>
                                </tbody>
                                <tfoot >
                                <tr className='w-full flex flex-row'>
                                    <td className='w-1/2 pl-4 text-blue-400'>All Qtn :</td>
                                    <td className='w-1/2 text-center text-blue-400 ' >{e?.allQtn}</td>
                                </tr>
                                </tfoot>
                            </table>

                        </div>
                    )
                }):false}
            </div>
            <div className=' flex flex-col items-center
            px-6 pb-6 bg-white border-2 border-blue-950 rounded-2xl absolute top-1/2 right-1/2 z-10 w-[250px] h-[180px] ease-in-out  duration-500'
                 style={show?{transform:'translate(50%, -60%)'}:{transform:'translate(50%, -500%)'}}>
                <FormEdit dataEdit={dataEdit} setShow={setShow}  filteredStory={filteredStory}
                          dataOrder={dataOrder} dataStore={removeUndStore} coc={coc} typeOrder={typeOrder}
                          setPending={setPending} startTransition={startTransition}/>

            </div>
        </div>
    )
}

export default ContenarClientEditPage




