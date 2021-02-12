/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-imports */
import React from "react";
import * as swal from "../../Common/components/SweetAlert";
import * as productGroupAxios from "../_redux/productGroupAxios";

function ProductGroupDelete(props) {
  debugger;
  React.useEffect(() => {
    if (props.productgroupid !== 0) {
      handleDelete();
    }
  }, [props.productgroupid]);

  const handleDelete = () => {
    swal.swalConfirm("Confirm Delete?", "").then((sw) => {
      if (sw.isConfirmed) {
        Delete();
      } else {
        handleReset();
      }
    });
  };

  const Delete = () => {
    let id = props.productgroupid;
    productGroupAxios
      .deleteProductGroup(id)
      .then((response) => {
        if (response.data.isSuccess) {
          swal
            .swalSuccess("Delete Completed", `id: ${response.data.data.id}`)
            .then(() => {});
          props.submit("FROM_DELETE_SUBMIT");
        } else {
          swal.swalError("Error", response.data.message);
        }
      })
      .catch((err) => {
        swal.swalError("Error", err.message);
      })
      .finally(() => {
        handleReset();
      });
  };

  const handleReset = () => {
    props.reset("FROM_DELETE_RESET");
  };
  return <div></div>;
}

export default ProductGroupDelete;
