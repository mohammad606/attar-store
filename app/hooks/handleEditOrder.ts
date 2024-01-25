import {updateData} from "@/app/server/firebaseQuery";
import Swal from "sweetalert2";
import {data, dataStoryType, items, qtn, storyObjType} from "@/app/type/typeDataFirebase";


const HandleEditOrder = (data:string|number|undefined,dataEdit:any,dataOrder:data,dataStore:dataStoryType,coc:string,typeOrder:string,router:any,setPending:any,startTransition:any,setShow:any)=>{
    function replaceItemAtIndex(arr:items|qtn, index:number, newItem:number|string|undefined) {
        return [...arr.slice(0, index), newItem,...arr.slice(index + 1)];
    }


    // ----------------------------------------------
    const handleEditNoa = ()=>{
        if(typeOrder == "output"){
            updateData(`${coc}/Input and output data/Output/${dataOrder.id}`, {noa: data}).then(r  =>r)
        }else if(typeOrder == "input"){
            updateData(`${coc}/Input and output data/Input/${dataOrder.id}`, {noa: data}).then(r  =>r)
        }
    }
    // ----------------------------------------------
    const handleEditClient = ()=>{
        if(typeOrder == "output"){
            updateData(`${coc}/Input and output data/Output/${dataOrder.id}`, {client: data}).then(r  =>r)

        }else if(typeOrder == "input"){
            updateData(`${coc}/Input and output data/Input/${dataOrder.id}`, {client: data}).then(r  =>r)
        }

    }
    // ----------------------------------------------
    const handleEditSender=()=>{
        if(typeOrder == "output"){
            updateData(`${coc}/Input and output data/Output/${dataOrder.id}`, {sender: data}).then(r  =>r)

        }else if(typeOrder == "input"){
            updateData(`${coc}/Input and output data/Input/${dataOrder.id}`, {sender: data}).then(r  =>r)
        }
    }
    // ----------------------------------------------
    const handleEditItem=()=>{
        const qtnInStoreItemOld = dataStore.find((e:storyObjType) => e?.item === dataEdit.data)?.qtn;
        const SHQtnInStoreItemOld :number=  qtnInStoreItemOld?qtnInStoreItemOld:0
        const qtnInStoreItemNew = dataStore.find((e:storyObjType) => e?.item === data)?.qtn;
        const SHQtnInStoreItemNew:number =  qtnInStoreItemNew?qtnInStoreItemNew:0
        const updateArrayItems = replaceItemAtIndex(dataOrder.items, dataEdit.id, data);
        const qtnInOrder = dataOrder.qtn.find((e:any, index:number) => {return index == dataEdit.id})
        const SHQtnInOrder:number = qtnInOrder?qtnInOrder:0
        dataStore.forEach((e:any)=>{
            if(typeOrder == "output"){
                e.item == dataEdit.data?
                    updateData(`${coc}/Store/${e.id}`,{qtn:SHQtnInStoreItemOld+SHQtnInOrder}):
                    e.item == data ?
                        updateData(`${coc}/Store/${e.id}`,{qtn:SHQtnInStoreItemNew-SHQtnInOrder}):
                        false
            }else if(typeOrder == "input"){
                e.item == dataEdit.data?
                    updateData(`${coc}/Store/${e.id}`,{qtn:SHQtnInStoreItemOld-SHQtnInOrder}):
                    e.item == data ?
                        updateData(`${coc}/Store/${e.id}`,{qtn:SHQtnInStoreItemNew+SHQtnInOrder}):
                        false
            }
        })
        typeOrder == "output"?
            updateData(`${coc}/Input and output data/Output/${dataOrder.id}`,{items:updateArrayItems}):
            typeOrder == "input"?
                updateData(`${coc}/Input and output data/Input/${dataOrder.id}`,{items:updateArrayItems}):
                false

    }
    // ----------------------------------------------
    const handleEditQtn=()=>{
        const updateArrayItems = replaceItemAtIndex(dataOrder.qtn, dataEdit.id, data);
        const ItemInOrder = dataOrder.items.find((e:any, index:number) => {
            return index == dataEdit.id
        })
        const qtnInStoreItem = dataStore.find((e:storyObjType) => e?.item === ItemInOrder)?.qtn;
        const SHQtnInStoreItem :number= qtnInStoreItem?qtnInStoreItem:0
        const newQtn:number = typeof data == 'number'?data:0
        const handleObjectQtn = ()=>{
            if(typeOrder == 'output'){
                updateData(`${coc}/Input and output data/Output/${dataOrder.id}`, {qtn: updateArrayItems}).then(r  =>r)
                if(newQtn >= dataEdit.data){
                    return {qtn : SHQtnInStoreItem - (newQtn - dataEdit.data)}
                }else {
                    return {qtn : SHQtnInStoreItem + (dataEdit.data - newQtn)}
                }
            }else if (typeOrder == "input"){
                updateData(`${coc}/Input and output data/Input/${dataOrder.id}`, {qtn: updateArrayItems}).then(r  =>r)
                if(newQtn >= dataEdit.data){
                    return {qtn : SHQtnInStoreItem + (newQtn - dataEdit.data)}
                }else {
                    return {qtn : SHQtnInStoreItem - (dataEdit.data - newQtn)}
                }
            }
        }


        dataStore.forEach((e:storyObjType)=>{
            e.item == ItemInOrder?
                updateData(`${coc}/Store/${e.id}`,handleObjectQtn()):
                false
        })
    }
    // ----------------------------------------------


    Swal.fire({
        title: "Are you sure?",
        text: "You won't to Edit it !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes"
    }).then((result) => {
        if (result.isConfirmed) {
            dataEdit.type == 'noa'?
                handleEditNoa():
                dataEdit.type == 'client'?
                    handleEditClient():
                    dataEdit.type == 'sender'?
                        handleEditSender():
                        dataEdit.type == 'item'?
                            handleEditItem():
                            dataEdit.type == 'qtn'?
                                handleEditQtn():
                                false

            setShow(false)
            setPending(true);
            startTransition(router.refresh);
            setPending(false);
        }
    });
}

export default HandleEditOrder