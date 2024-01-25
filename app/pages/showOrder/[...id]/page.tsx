
import {cookies} from "next/headers";
import ContenarOrderForItems from "@/app/commponents/showOrder/contenarOrderForItems";
import {fetchData} from "@/app/server/redDataQuery";
import {dataInOut, dataStoryType} from "@/app/type/typeDataFirebase";


const OrderForItem =async ({params:{id}}:{params:{id:string[]}})=>{
    const idOrder:string = id[0]
    const typeOrder :string= id[1]
    const coc:string|undefined = cookies().get('token')?.value
    const cookie:string = typeof coc == 'string'?coc:'no token'

    if(typeOrder == 'input'){
        var dataInput :dataInOut= await fetchData(`${coc}/Input and output data/Input`);

    }else if(typeOrder == 'order'){
        var dataOut :dataInOut= await fetchData(`${coc}/Input and output data/Output`);
    }
    let dataStore :dataStoryType= await fetchData(`/${coc}/Store`);



    return (
        <>
            {/* @ts-ignore*/}
            <ContenarOrderForItems typeOrder={typeOrder} dataOrder={typeOrder=="input"?dataInput:dataOut} dataStore={dataStore} coc={cookie} id={idOrder}/>
        </>
    )
}

export default OrderForItem