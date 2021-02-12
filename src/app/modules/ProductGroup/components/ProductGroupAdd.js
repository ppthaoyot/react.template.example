/* eslint-disable no-restricted-imports */
import React from "react";
import Button from "@material-ui/core/Button";
// import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ControlPoint } from "@material-ui/icons";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import { useSelector, useDispatch } from "react-redux";
import * as swal from "../../Common/components/SweetAlert";
import * as productGroupRedux from "../_redux/productGroupRedux";
import * as productGroupAxios from "../_redux/productGroupAxios";

function ProductGroupAdd(props) {
  const dispatch = useDispatch();
  const productGroupReducer = useSelector(({ productGroup }) => productGroup);
  const [open, setOpen] = React.useState(false);

  const handleAdd = ({ setSubmitting }, payload) => {
    productGroupAxios
      .addProductGroup(payload)
      .then((response) => {
        if (response.data.isSuccess) {
          //Success
          swal
            .swalSuccess("Add Completed", `Add id: ${response.data.data.id}`)
            .then(() => {
              dispatch(productGroupRedux.actions.resetCurrentProductGroup());
              props.submit(response.data.isSuccess);
            });
        } else {
          swal.swalError("Error", response.data.message);
        }
      })
      .catch((err) => {
        swal.swalError("Error", err.message);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={{
          name: "",
        }}
        validate={(values) => {
          const errors = {};

          if (!values.name) {
            errors.name = "Required";
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          let payload = {
            ...productGroupReducer.currentProductGroupToAdd,
            name: values.name,
          };
          handleClose();
          resetForm();
          handleAdd({ setSubmitting }, payload);
        }}
      >
        {({ submitForm, isSubmitting, values, errors, resetForm }) => (
          <Form>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              startIcon={<ControlPoint />}
              onClick={handleClickOpen}
            >
              Add
            </Button>

            <Dialog
              fullWidth
              maxWidth={"sm"}
              open={open}
              onClose={handleClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">
                Add New ProductGroup
              </DialogTitle>
              <DialogContent>
                <Field
                  fullWidth
                  component={TextField}
                  required
                  autoFocus
                  type="text"
                  label="Name"
                  name="name"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={submitForm} color="primary">
                  Save
                </Button>
              </DialogActions>
            </Dialog>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ProductGroupAdd;
