import Swal, { SweetAlertIcon, SweetAlertPosition } from "sweetalert2";

export interface toastOptions {
    toast?: boolean,
    position?: SweetAlertPosition,
    icon?:SweetAlertIcon,
    title?:string,
    showConfirmButton?:boolean,
    timer?:number

}

export default class CustomSwal {
 
    static toast({
            toast = true,
            position = "top-end", 
            icon = "success", 
            title = "Success", 
            showConfirmButton = false,
            timer = 1500} : toastOptions = {}) {

            Swal.fire({
                toast,
                position,
                icon,
                title,
                showConfirmButton,
                timer
            });
    }

    static modalError(title:string,message:string) {
        Swal.fire({
            icon: "error",
            title,
            text: message,
          });
    }
}