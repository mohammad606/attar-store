import Swal from "sweetalert2";
import {deleteData} from "@/app/server/firebaseQuery"


const HandleDeleteItemFromStore = (url:string,router:any,setPending:any,startTransition:any)=>{
    Swal.fire({
        title: "Are you sure?",
        text: "You won't Delete this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes"
    }).then((result) => {
        if (result.isConfirmed) {
            deleteData(url).then(r => r)
            setPending(true);
            startTransition(router.refresh);
            setPending(false);
        }
    });




}

export default HandleDeleteItemFromStore