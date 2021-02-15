/* eslint-disable no-restricted-imports */
import React from "react";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  Button,
  Dialog,
  MenuItem,
  Grid,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import { TextField, Select } from "formik-material-ui";
import { useSelector, useDispatch } from "react-redux";
import * as swal from "../../Common/components/SweetAlert";
import * as productRedux from "../../Product/_redux/productRedux";
import * as productAxios from "../../Product/_redux/productAxios";
import * as productGroupAxios from "../../ProductGroup/_redux/productGroupAxios";

function ProductAdd(props) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [productGroupList, setProductGroupList] = React.useState([]);
  const productReducer = useSelector(({ product }) => product);

  React.useEffect(() => {
    if (props.modal) {
      handleGetProductGroup();
      handleClickOpen();
    }
  }, [props.modal]);

  const handleAdd = ({ setSubmitting }, payload) => {
    productAxios
      .addProduct(payload)
      .then((response) => {
        if (response.data.isSuccess) {
          swal
            .swalSuccess("Add Completed", `Add id: ${response.data.data.id}`)
            .then(() => {
              dispatch(productRedux.actions.resetCurrentProduct());
              props.returnvalue("FROM_ADD_SUBMIT");
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

  const handleGetProductGroup = () => {
    productGroupAxios
      .getProductGroupAll()
      .then((res) => {
        //bind data
        if (res.data.isSuccess) {
          setProductGroupList(res.data.data);
        } else {
          //internal error
          swal.swalError("Error", res.data.message);
        }
      })
      .catch((err) => {
        //physical error
        swal.swalError("Error", err.message);
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    props.reset("FROM_ADD_RESET");
    setOpen(false);
  };

  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={{
          name: "",
          price: "",
          stock: "",
          productGroupId: 0,
        }}
        validate={(values) => {
          const errors = {};

          if (!values.name) {
            errors.name = "Required";
          }
          if (!values.price) {
            errors.price = "Required";
          }
          if (!values.stock) {
            errors.stock = "Required";
          }
          if (values.productGroupId === 0) {
            debugger;
            errors.productGroupId = "Required";
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          let payload = {
            ...productReducer.currentProductToAdd,
            name: values.name,
            price: values.price,
            stock: values.stock,
            productGroupId: values.productGroupId,
          };
          handleClose();
          setSubmitting(true);
          resetForm();
          handleAdd({ setSubmitting }, payload);
        }}
      >
        {({
          submitForm,
          isSubmitting,
          values,
          errors,
          resetForm,
          setFieldValue,
          touched,
        }) => (
          <Form>
            <Dialog
              fullWidth
              maxWidth={"sm"}
              open={open}
              onClose={handleClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Add New Product</DialogTitle>
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
                    />
                  </Grid>
                  <Grid item xs={12} lg={12}>
                    <Field
                      fullWidth
                      component={TextField}
                      required
                      type="text"
                      label="Price"
                      name="price"
                      value={values.price}
                      onChange={(e) => setFieldValue("price", e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} lg={12}>
                    <Field
                      fullWidth
                      component={TextField}
                      required
                      type="text"
                      label="Stock"
                      name="stock"
                      value={values.stock}
                      onChange={(e) => setFieldValue("stock", e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} lg={12}>
                    <FormControl fullWidth>
                      <InputLabel id="status-label">ProductGroup</InputLabel>
                      <Field
                        fullWidth
                        component={Select}
                        inputProps={{
                          id: "productgroup-label",
                        }}
                        name="productGroupId"
                        value={values.productGroupId}
                        onChange={(event) => {
                          setFieldValue("productGroupId", event.target.value);
                        }}
                      >
                        <MenuItem disabled key={0} value={0}>
                          กรุณาเลือก
                        </MenuItem>
                        {productGroupList.map((item) => (
                          <MenuItem
                            key={`productgroup_${item.id}`}
                            value={item.id}
                          >
                            {item.name}
                          </MenuItem>
                        ))}
                      </Field>
                      <FormHelperText error>
                        {errors.productGroupId}
                      </FormHelperText>
                      {/* <br></br>
                      values :{JSON.stringify(values)}
                      <br></br>
                      errors :{JSON.stringify(errors)}
                      <br></br>
                      touched : {JSON.stringify(touched)} */}
                    </FormControl>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button
                  onClick={submitForm}
                  color="primary"
                  disabled={isSubmitting}
                >
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

export default ProductAdd;
