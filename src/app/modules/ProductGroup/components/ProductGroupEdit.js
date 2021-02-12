/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-imports */
import React from "react";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import * as swal from "../../Common/components/SweetAlert";
import * as productGroupRedux from "../_redux/productGroupRedux";
import * as productGroupAxios from "../_redux/productGroupAxios";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Dialog,
  MenuItem,
  Grid,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import { TextField, Select } from "formik-material-ui";

function ProductGroupEdit(props) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState({
    name: "",
    isActive: false,
  });

  const productGroupReducer = useSelector(({ productGroup }) => productGroup);
  React.useEffect(() => {
    if (props.productgroupid !== 0) {
      handleGet();
    }
  }, [props.productgroupid]);

  const handleGet = () => {
    productGroupAxios
      .getProductGroup(props.productgroupid)
      .then((response) => {
        if (response.data.isSuccess) {
          setData({
            ...data,
            name: response.data.data.name,
            isActive: response.data.data.isActive,
          });
        } else {
          swal.swalError("Error", response.data.message);
        }
      })
      .catch((err) => {
        swal.swalError("Error", err.message);
      })
      .finally(() => {
        handleOpen(true);
      });
  };

  const handleUpdate = (payload) => {
    productGroupAxios
      .updateProductGroup(props.productgroupid, payload)
      .then((response) => {
        if (response.data.isSuccess) {
          swal
            .swalSuccess("Update Completed", `id: ${response.data.data.id}`)
            .then(() => {
              dispatch(productGroupRedux.actions.resetCurrentProductGroup());
            });
          props.submit(true);
        } else {
          swal.swalError("Error", response.data.message);
        }
      })
      .catch((err) => {
        swal.swalError("Error", err.message);
      })
      .finally(() => {
        handleClose();
      });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    props.reset("EDIT");
    setOpen(false);
  };

  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={{
          name: data.name,
          isActive: data.isActive,
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
            isActive: values.isActive,
          };
          resetForm();
          handleUpdate(payload);
        }}
      >
        {({
          submitForm,
          isSubmitting,
          values,
          errors,
          resetForm,
          setFieldValue,
        }) => (
          <Form>
            <Dialog
              fullWidth
              maxWidth={"xs"}
              open={open}
              onClose={handleClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">
                Edit ProductGroup
              </DialogTitle>
              <DialogContent>
                <Grid container spacing={3}>
                  <Grid item xs={12} lg={12}>
                    <Field
                      fullWidth
                      component={TextField}
                      required
                      autoFocus
                      type="text"
                      label="Name"
                      name="name"
                      value={values.name}
                      onChange={(e) => setFieldValue("name", e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} lg={12}>
                    <FormControl fullWidth>
                      <InputLabel id="status-label">Status</InputLabel>
                      <Field
                        fullWidth
                        component={Select}
                        inputProps={{
                          id: "status-label",
                        }}
                        name="isActive"
                        value={values.isActive}
                        onChange={(event) => {
                          setFieldValue("isActive", event.target.value);
                        }}
                      >
                        <MenuItem key={0} value={true}>
                          Active
                        </MenuItem>
                        <MenuItem key={1} value={false}>
                          Delete
                        </MenuItem>
                      </Field>
                    </FormControl>
                  </Grid>
                </Grid>
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

export default ProductGroupEdit;
