import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

 const notifySuccess = (message:any) =>
  toast(<p style={{ fontSize: 16 }}>{message}</p>, {
    position: "top-right",
    autoClose: 2000,
    pauseOnHover: true,
    type: "success",
    theme: "colored"
  });

  const notifyError = (message:any) =>
  toast(<p style={{ fontSize: 16 }}>{message}</p>, {
    position: "top-right",
    autoClose: 2000,
    pauseOnHover: true,
    type: "error",
    theme: "colored"
  });


  export default {notifySuccess,notifyError}