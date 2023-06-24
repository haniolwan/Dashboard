import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { query } from "./query";

const deleteRow = async (path, remove, setData) => {
  try {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    // if (result.isConfirmed) {
    //   const {
    //     data: { success, message },
    //   } = await query(`/api/dashboard/${path}/${remove}`, "delete");
    //   if (success) {
    //     Swal.fire("Deleted!", "Your file has been deleted.", "success");
    //   }
    //   setData(function (oldEmployees) {
    //     return oldEmployees.filter(
    //       (employee) => employee.id !== parseInt(remove)
    //     );
    //   });
    // }
  } catch ({ response: { statusText } }) {
    toast.error(<span className="capitalize">{statusText}</span>);
  }
};

export default deleteRow;
