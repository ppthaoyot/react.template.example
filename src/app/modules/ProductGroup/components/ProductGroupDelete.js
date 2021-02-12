/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-imports */
import React from "react";
import * as swal from "../../Common/components/SweetAlert";
import * as productGroupAxios from "../_redux/productGroupAxios";

function ProductGroupDelete(props) {
  debugger;
  React.useEffect(() => {
    if (props.productgroupid !== 0) {
      debugger;
      handleDelete();
    }
  }, [props.productgroupid]);

  const handleDelete = () => {
    swal.swalConfirm("Confirm Delete?", "").then((sw) => {
      if (sw.isConfirmed) {
        Delete();
      }
    });
  };

  const Delete = () => {
    let id = props.productgid;
    productGroupAxios
      .deleteProductGroup(id)
      .then((response) => {
        if (response.data.isSuccess) {
          //Success
          swal
            .swalSuccess("Delete Completed", `id: ${response.data.data.id}`)
            .then(() => {
              props.submit(response.data.isSuccess);
            });
        } else {
          swal.swalError("Error", response.data.message);
        }
      })
      .catch((err) => {
        swal.swalError("Error", err.message);
      });
  };

  return <div></div>;
}

export default ProductGroupDelete;
