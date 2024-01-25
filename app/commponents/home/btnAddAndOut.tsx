
import {useState} from "react";
import AddItems from './addAndRemove/addItems'
import AddOrder from "@/app/commponents/home/addAndRemove/addOrder";
import {dataInOut, dataStoryType} from "@/app/type/typeDataFirebase";
import {RemoveUndefinedFromArray} from "@/app/hooks/removeUndfindFromArray";


const BtnAddAndOut = ({dataInput,dataOut,dataStore,setPending,startTransition}
:
{
dataInput:dataInOut
,dataOut:dataInOut
,dataStore :dataStoryType
,setPending :any
,startTransition :any
})=>{
    const removeUndIn :dataInOut= RemoveUndefinedFromArray(dataInput)
    const removeUndOut :dataInOut= RemoveUndefinedFromArray(dataOut)
    const removeUndStore :dataStoryType= RemoveUndefinedFromArray(dataStore)

    const [showAdded , setShowAdded] = useState<boolean>(false)
    const [showOrder , setShowOrder] = useState<boolean>(false)
    const handleAdded = ()=>{
        showAdded?setShowAdded(false):setShowAdded(true)
    }
    const handleOrder = ()=>{
        showOrder?setShowOrder(false):setShowOrder(true)
    }

    return (
        <>
            <div className='w-full h-[100px] flex flex-col relative z-2  items-center justify-evenly border-b-2 border-blue-950 mt-5'>
                <h1 className='text-black text-2xl smm:text-white'>Request An Order</h1>
                <div className='w-full flex flex-row justify-evenly '>
                    <div>
                        <button type="button" onClick={handleOrder}
                                className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                            Add Order
                        </button>

                    </div>
                    <div>
                        <button type="button" onClick={handleAdded}
                                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                            Add Items
                        </button>

                    </div>
                </div>

            </div>
            <div className='absolute w-[400px] top-[70px] rounded-l-2xl right-0 bg-gray-400 z-10
                      msm:w-full msm:rounded-none min-h-[150vh]'
                 style={showAdded?{transform:'translate(0px, 0px)',height: "fit-content"}:{display:'none',transform:'translate(500%, 0px)'}}>
                <p className='text-2xl cursor-pointer text-end mt-4 mr-4 text-blue-950' onClick={handleAdded} >X</p>
                <AddItems InputLimit={removeUndIn}  dataStore={removeUndStore} setPending={setPending} startTransition={startTransition} setShowAdded={setShowAdded}/>
            </div>
            <div className='absolute w-[400px] top-[70px] min-h-[150vh] rounded-r-2xl left-0 bg-gray-400 z-10
                     msm:w-full msm:rounded-none'
                 style={showOrder?{transform:'translate(0px, 0px)',height: "fit-content"}:{display:'none',transform:'translate(500%, 0px)'}}>
                <p className='text-2xl cursor-pointer  mt-4 ml-4 text-blue-950' onClick={handleOrder} >X</p>
                <AddOrder OutputLimit={removeUndOut} dataStore={removeUndStore} setPending={setPending} startTransition={startTransition} setShowOrder={setShowOrder}/>
            </div>


        </>)
}
export default BtnAddAndOut