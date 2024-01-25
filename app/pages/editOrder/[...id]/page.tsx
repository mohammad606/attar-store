import ContenarClientEditPage from "@/app/commponents/editeOrder/contenarClientEditPage";
import {cookies} from "next/headers";
import {fetchData} from "@/app/server/redDataQuery";
import {data, dataStoryType} from "@/app/type/typeDataFirebase";



const EditeOrder =async ({params:{id}}:{params:{id:string[]}})=>{
    const idOrder:string = id[0]
    const typeOrder:string = id[1]
    const coc :string|undefined= cookies().get('token')?.value
    const cookie:string = typeof coc == 'string'?coc:'no token'

    if(typeOrder == 'input'){
        var dataInput :data= await fetchData(`${coc}/Input and output data/Input/${idOrder}`);

    }else if(typeOrder == 'output'){
        var dataOut :data = await fetchData(`${coc}/Input and output data/Output/${idOrder}`);
    }

    let dataStore :dataStoryType= await fetchData(`/${coc}/Store`);




    return(
        <>
            {/*// @ts-ignore*/}
            <ContenarClientEditPage  typeOrder={typeOrder} dataOrder={typeOrder=="input"?dataInput:dataOut} coc={cookie} dataStore={dataStore}/>
        </>
    )
}

export default EditeOrder