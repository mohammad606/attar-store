import HandleEditOrder from "@/app/hooks/handleEditOrder";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {data, dataStoryType, storyObjType} from "@/app/type/typeDataFirebase";


const FormEdit = ({dataEdit, setShow, filteredStory, dataOrder, dataStore, coc,typeOrder,setPending,startTransition}:
{
    dataEdit :any,
    setShow :any,
    filteredStory:storyObjType[],
    dataOrder :data,
    dataStore :dataStoryType,
    coc :string,
    typeOrder :string,
    setPending :any,
    startTransition:any
})=>{
    const [edit ,setEdit] = useState<string|number|undefined>()
    const router = useRouter()
    return (
        <>
            <div className='relative w-full flex justify-end'>
                <p className='text-2xl text-black w-4 cursor-pointer' onClick={()=>setShow(false)}>X</p>
            </div>
            <label htmlFor='item' className='text-blue-950'>{dataEdit.type}</label>
            {dataEdit.type == 'item'?
                <select name="item" id="item" className='text-black border-black border-2 rounded-xl pl-3 w-full'
                        onChange={(e)=>setEdit(e.target.value)}  required>
                    <option ></option>
                    <optgroup label={`Items : `}>
                        {filteredStory?.map((e:storyObjType)=>(
                            <option value={e.item} key={e.id}>{e.item}</option>
                        ))}
                    </optgroup>
                </select>
                :
                <input type='text' id='item' onChange={(e:any)=>setEdit(e.target.value)}
                       className='border-2 pl-4 text-black border-black rounded-2xl w-full' placeholder={`${dataEdit.data}`}/>
            }
            <button type="button"
                    onClick={()=>HandleEditOrder(edit,dataEdit,dataOrder,dataStore,coc,typeOrder,router,setPending,startTransition,setShow)}
                    className="my-3 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                Save Edit
            </button>
        </>
    )
}

export default FormEdit

