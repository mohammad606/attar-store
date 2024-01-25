import {useState} from "react";
import {updateData} from "@/app/server/firebaseQuery";
import {useRouter} from "next/navigation";
import {dataStoryType, storyObjType} from "@/app/type/typeDataFirebase";


const AddQtnToItem = ({dataStore,coc,setPending,startTransition}
:{
    dataStore :dataStoryType,
    coc :string,
    setPending :any,
    startTransition :any
})=>{
    let rot = useRouter()

    const [dataInput , setDataInput] = useState({
        item:'',
        qtn:''
    })
    const handleChange = (e:any) => setDataInput(prevState => ({ ...prevState, [e.target.name]: e.target.value }));

    const HandelSendData = ():void=>{
        dataStore.map((e:storyObjType)=>{
            if(e.item == dataInput.item){
                return updateData(`${coc}/Store/${e.id}`,{qtn:Number(dataInput.qtn)})
            }
        })
        setPending(true);
        startTransition(rot.refresh);
        setPending(false);
    }


    return (
        <div className='w-[300px]  h-[344px] mt-5   px-4 py-2 border-2 border-blue-950 rounded-2xl flex flex-col'>

            <h1 className='text-2xl my-3'>Add Qtn : </h1>
            <form className='flex flex-col justify-between h-full'>
                <div className='my-2 flex flex-col'>
                    <label htmlFor='item'>Item : </label>
                    <select name="item" id="item" onChange={handleChange} className='text-black border-black border-2 rounded-xl pl-3 my-2'
                            required>
                        <option ></option>
                        <optgroup label="Items : ">
                            {dataStore?.map((e:storyObjType)=>(
                                <option value={e.item} key={e.id}>{e.item}</option>
                            ))}
                        </optgroup>
                    </select>
                </div>
                <div className='my-2 flex flex-col'>
                    <label htmlFor='qtn'>Qtn : </label>
                    <input type='text' id='qtn' name='qtn' onChange={handleChange}  required className='pl-2 border-2 border-black rounded-2xl text-black ' placeholder='Qtn ... '/>
                </div>
                <div className='my-2 flex flex-col'>
                    <button type="button"
                            onClick={HandelSendData}
                            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">
                        Save
                    </button>
                </div>
            </form>

        </div>

    )
}

export default AddQtnToItem