'use client'
import AddItems from "@/app/commponents/store/inputFeld/addItems";
import AddQtnToItem from "@/app/commponents/store/inputFeld/addQtnToItem";
import HandleDeleteItemFromStore from "@/app/hooks/handleDeleteItemFromStore";
import ChangeItemName from '@/app/commponents/store/inputFeld/changeItemName';
import Link from "next/link";
import Nav from "@/app/share/nav/nav";
import {useRouter} from "next/navigation";
import {useState, useTransition} from "react";
import {dataInOut, dataStoryType, storyObjType} from "@/app/type/typeDataFirebase";
import {RemoveUndefinedFromArray} from "@/app/hooks/removeUndfindFromArray";




const ClientStore = ({dataStore,coc,AllOutput,AllInput}:
{
dataStore :dataStoryType,
coc :string,
AllOutput :dataInOut,
AllInput :dataInOut
})=>{
    let rot = useRouter()
    const [isPending, setPending] = useState <boolean>(false);
    const [isTransitionStarted, startTransition] = useTransition();
    const isMutating:boolean = isPending || isTransitionStarted;
    const removeUndIn :dataInOut= RemoveUndefinedFromArray(AllInput)
    const removeUndOut :dataInOut= RemoveUndefinedFromArray(AllOutput)
    const removeUndStore :dataStoryType= RemoveUndefinedFromArray(dataStore)
    return (
        <>
            <Nav/>
            <div className='w-full h-full'>
                <div className='w-full h-[100px] flex justify-center items-center border-b-2 border-y-blue-950'>
                    <h1 className=' text-2xl'>Store</h1>
                </div>
                <div className='mx-7 mt-4 vsm:mx-2 w-auto'>
                    <div className='w-full bg-[#1f2937] rounded-t-2xl' >
                        <table className='w-full'>
                            <thead >
                            <tr className='w-full bg-[#374151] rounded-t-2xl'>
                                <th className='w-[28.5%] text-center msm:text-[15px] rounded-tl-2xl'>ITEM</th>
                                <th className='w-[14.2%] text-center msm:text-[15px]'>QTN</th>
                                <th className='w-[14.2%] text-center msm:text-[15px]'>BOX</th>
                                <th className='w-[14.2%] text-center msm:text-[15px]'>Delete</th>
                                <th className='w-[14.2%] text-center msm:text-[15px]'>In Order</th>
                                <th className='w-[14.2%] text-center msm:text-[15px] rounded-tr-2xl'>In Added</th>
                            </tr>
                            </thead>
                            <tbody className=' '>
                            {isMutating?<p className='p-8'>update...</p>:removeUndStore.length >2?removeUndStore.map((e:storyObjType)=>{
                                return(
                                    <tr key={e.id} className=' text-center border-b-2 border-white '>
                                        <td className='w-[28.5%] text-start pl-2 vsm:text-[14px]'>{e.item?e.item:''}</td>
                                        <td className='w-[14.2%] vsm:text-[14px]'>{e?.qtn}</td>
                                        <td className='w-[14.2%] vsm:text-[13px]'>{Math.floor(e?.qtn / Number(e?.box))} Plus/ {e?.qtn-Math.floor(e?.qtn / Number(e?.box))*Number(e?.box)}</td>
                                        <td className='w-[14.2%] vsm:text-[14px] p-2'>
                                            <div className='flex justify-center'>
                                                <svg className='cursor-pointer'
                                                     onClick={()=>{
                                                         return HandleDeleteItemFromStore(`${coc}/Store/${e.id}`,rot,setPending,startTransition)
                                                     }}
                                                     xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="35" viewBox="0,0,256,256">
                                                    <g fill="#ce3838" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{mixBlendMode: "normal"}}><g transform="scale(5.12,5.12)"><path d="M21,0c-1.64453,0 -3,1.35547 -3,3v2h-7.8125c-0.125,-0.02344 -0.25,-0.02344 -0.375,0h-1.8125c-0.03125,0 -0.0625,0 -0.09375,0c-0.55078,0.02734 -0.98047,0.49609 -0.95312,1.04688c0.02734,0.55078 0.49609,0.98047 1.04688,0.95313h1.09375l3.59375,40.5c0.125,1.39844 1.31641,2.5 2.71875,2.5h19.1875c1.40234,0 2.59375,-1.10156 2.71875,-2.5l3.59375,-40.5h1.09375c0.35938,0.00391 0.69531,-0.18359 0.87891,-0.49609c0.17969,-0.3125 0.17969,-0.69531 0,-1.00781c-0.18359,-0.3125 -0.51953,-0.5 -0.87891,-0.49609h-10v-2c0,-1.64453 -1.35547,-3 -3,-3zM21,2h8c0.5625,0 1,0.4375 1,1v2h-10v-2c0,-0.5625 0.4375,-1 1,-1zM11.09375,7h27.8125l-3.59375,40.34375c-0.03125,0.34766 -0.40234,0.65625 -0.71875,0.65625h-19.1875c-0.31641,0 -0.6875,-0.30859 -0.71875,-0.65625zM18.90625,9.96875c-0.04297,0.00781 -0.08594,0.01953 -0.125,0.03125c-0.46484,0.10547 -0.79297,0.52344 -0.78125,1v33c-0.00391,0.35938 0.18359,0.69531 0.49609,0.87891c0.3125,0.17969 0.69531,0.17969 1.00781,0c0.3125,-0.18359 0.5,-0.51953 0.49609,-0.87891v-33c0.01172,-0.28906 -0.10547,-0.56641 -0.3125,-0.76172c-0.21094,-0.19922 -0.49609,-0.29687 -0.78125,-0.26953zM24.90625,9.96875c-0.04297,0.00781 -0.08594,0.01953 -0.125,0.03125c-0.46484,0.10547 -0.79297,0.52344 -0.78125,1v33c-0.00391,0.35938 0.18359,0.69531 0.49609,0.87891c0.3125,0.17969 0.69531,0.17969 1.00781,0c0.3125,-0.18359 0.5,-0.51953 0.49609,-0.87891v-33c0.01172,-0.28906 -0.10547,-0.56641 -0.3125,-0.76172c-0.21094,-0.19922 -0.49609,-0.29687 -0.78125,-0.26953zM30.90625,9.96875c-0.04297,0.00781 -0.08594,0.01953 -0.125,0.03125c-0.46484,0.10547 -0.79297,0.52344 -0.78125,1v33c-0.00391,0.35938 0.18359,0.69531 0.49609,0.87891c0.3125,0.17969 0.69531,0.17969 1.00781,0c0.3125,-0.18359 0.5,-0.51953 0.49609,-0.87891v-33c0.01172,-0.28906 -0.10547,-0.56641 -0.3125,-0.76172c-0.21094,-0.19922 -0.49609,-0.29687 -0.78125,-0.26953z"></path></g></g>
                                                </svg>
                                            </div>

                                        </td>
                                        <td className='w-[14.2%] vsm:text-[14px] '>
                                            <Link href={`showOrder/${e?.item}/order`}
                                                  className='flex justify-center '>
                                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="30" viewBox="0 0 48 48">
                                                    <linearGradient id="9iHXMuvV7brSX7hFt~tsna_Rdp3AydLFY2A_gr1" x1="12.066" x2="34.891" y1=".066" y2="22.891" gradientUnits="userSpaceOnUse"><stop offset=".237" stopColor="#3bc9f3"></stop><stop offset=".85" stopColor="#1591d8"></stop></linearGradient><path fill="url(#9iHXMuvV7brSX7hFt~tsna_Rdp3AydLFY2A_gr1)" d="M43,15H5c-1.1,0-2-0.9-2-2v-2c0-1.1,0.9-2,2-2h38c1.1,0,2,0.9,2,2v2C45,14.1,44.1,15,43,15z"></path><linearGradient id="9iHXMuvV7brSX7hFt~tsnb_Rdp3AydLFY2A_gr2" x1="12.066" x2="34.891" y1="12.066" y2="34.891" gradientUnits="userSpaceOnUse"><stop offset=".237" stopColor="#3bc9f3"></stop><stop offset=".85" stopColor="#1591d8"></stop></linearGradient><path fill="url(#9iHXMuvV7brSX7hFt~tsnb_Rdp3AydLFY2A_gr2)" d="M43,27H5c-1.1,0-2-0.9-2-2v-2c0-1.1,0.9-2,2-2h38c1.1,0,2,0.9,2,2v2C45,26.1,44.1,27,43,27z"></path><linearGradient id="9iHXMuvV7brSX7hFt~tsnc_Rdp3AydLFY2A_gr3" x1="12.066" x2="34.891" y1="24.066" y2="46.891" gradientUnits="userSpaceOnUse"><stop offset=".237" stopColor="#3bc9f3"></stop><stop offset=".85" stopColor="#1591d8"></stop></linearGradient><path fill="url(#9iHXMuvV7brSX7hFt~tsnc_Rdp3AydLFY2A_gr3)" d="M43,39H5c-1.1,0-2-0.9-2-2v-2c0-1.1,0.9-2,2-2h38c1.1,0,2,0.9,2,2v2C45,38.1,44.1,39,43,39z"></path>
                                                </svg>
                                            </Link>
                                        </td>
                                        <td className='w-[14.2%] vsm:text-[14px]'>
                                            <Link href={`showOrder/${e?.item}/input`}
                                                  className='flex justify-center'>
                                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="30" viewBox="0,0,256,256">
                                                    <defs><linearGradient x1="12.066" y1="0.066" x2="34.891" y2="22.891" gradientUnits="userSpaceOnUse" id="color-1_Rdp3AydLFY2A_gr1"><stop offset="0.237" stopColor="#8859f3"></stop><stop offset="0.85" stopColor="#1591d8"></stop></linearGradient><linearGradient x1="12.066" y1="12.066" x2="34.891" y2="34.891" gradientUnits="userSpaceOnUse" id="color-2_Rdp3AydLFY2A_gr2"><stop offset="0.237" stopColor="#8859f3"></stop><stop offset="0.85" stopColor="#1591d8"></stop></linearGradient><linearGradient x1="12.066" y1="24.066" x2="34.891" y2="46.891" gradientUnits="userSpaceOnUse" id="color-3_Rdp3AydLFY2A_gr3"><stop offset="0.237" stopColor="#8859f3"></stop><stop offset="0.85" stopColor="#1591d8"></stop></linearGradient></defs><g fill="none" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{mixBlendMode: 'normal'}}><g transform="scale(5.33333,5.33333)"><path d="M43,15h-38c-1.1,0 -2,-0.9 -2,-2v-2c0,-1.1 0.9,-2 2,-2h38c1.1,0 2,0.9 2,2v2c0,1.1 -0.9,2 -2,2z" fill="url(#color-1_Rdp3AydLFY2A_gr1)"></path><path d="M43,27h-38c-1.1,0 -2,-0.9 -2,-2v-2c0,-1.1 0.9,-2 2,-2h38c1.1,0 2,0.9 2,2v2c0,1.1 -0.9,2 -2,2z" fill="url(#color-2_Rdp3AydLFY2A_gr2)"></path><path d="M43,39h-38c-1.1,0 -2,-0.9 -2,-2v-2c0,-1.1 0.9,-2 2,-2h38c1.1,0 2,0.9 2,2v2c0,1.1 -0.9,2 -2,2z" fill="url(#color-3_Rdp3AydLFY2A_gr3)"></path></g></g>
                                                </svg>
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            }):<p className='p-8 text-red-600'>No Data Found</p>
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='w-auto  flex flex-row flex-wrap justify-around mx-7 mb-5 '>
                    <AddItems coc={coc} dataStore={removeUndStore} setPending={setPending} startTransition={startTransition}/>
                    <AddQtnToItem coc={coc} dataStore={removeUndStore} setPending={setPending} startTransition={startTransition}/>
                    <ChangeItemName coc={coc} dataStore={removeUndStore} AllOutput={removeUndOut} AllInput={removeUndIn} setPending={setPending} startTransition={startTransition}/>

                </div>
            </div>
        </>
    )
}
export default ClientStore





