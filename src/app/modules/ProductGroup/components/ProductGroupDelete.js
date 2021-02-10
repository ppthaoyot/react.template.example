/* eslint-disable no-restricted-imports */
import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import { red } from "@material-ui/core/colors";
import * as swal from "../../Common/components/SweetAlert";
import * as productGroupAxios from "../_redux/productGroupAxios";

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(red[400]),
    backgroundColor: red[400],
    "&:hover": {
      backgroundColor: red[700],
    },
  },
}));

function ProductGroupDelete(props) {
  const classes = useStyles();

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

  return (
    <Button
      {...props}
      variant="contained"
      className={classes.root}
      startIcon={<DeleteIcon />}
      onClick={handleDelete}
    >
      Delete
    </Button>
  );
}

export default ProductGroupDelete;
