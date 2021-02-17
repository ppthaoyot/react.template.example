/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-imports */
import React from "react";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
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
import * as swal from "../../Common/components/SweetAlert";
import * as productRedux from "../../Product/_redux/productRedux";
import * as productAxios from "../../Product/_redux/productAxios";
import * as productGroupAxios from "../../ProductGroup/_redux/productGroupAxios";

function ProductEdit(props) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState({
    name: "",
    price: 0,
    stock: 0,
    productGroupId: 0,
    isActive: false,
  });
  const [productGroupList, setProductGroupList] = React.useState([]);
  const productReducer = useSelector(({ product }) => product);

  React.useEffect(() => {
    if (props.productid !== 0) {
      handleGetProductGroup();
      handleGet();
    }
  }, [props.productid]);

  const handleGet = () => {
    productAxios
      .getProduct(props.productid)
      .then((response) => {
        if (response.data.isSuccess) {
          setData({
            ...data,
            name: response.data.data.name,
            price: response.data.data.price,
            stock: response.data.data.stock,
            productGroupId: response.data.data.productGroup.id,
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

  const handleUpdate = (payload, { setSubmitting }) => {
    debugger;
    productAxios
      .updateProduct(props.productid, payload)
      .then((response) => {
        debugger;
        if (response.data.isSuccess) {
          debugger;
          swal
            .swalSuccess("Update Completed", `id: ${response.data.data.id}`)
            .then(() => {
              debugger;
              setSubmitting(false);
              dispatch(productRedux.actions.resetCurrentProduct());
            });
          props.returnvalue("FROM_EDIT_SUBMIT");
        } else {
          debugger;
          setSubmitting(false);
          swal.swalError("Error", response.data.message);
        }
      })
      .catch((err) => {
        setSubmitting(false);
        swal.swalError("Error", err.message);
      })
      .finally(() => {
        handleClose();
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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    props.reset("FROM_EDIT_RESET");
    setOpen(false);
  };

  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={{
          name: data.name,
          price: data.price,
          stock: data.stock,
          productGroupId: data.productGroupId,
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
            ...productReducer.currentProductToAdd,
            name: values.name,
            price: values.price,
            stock: values.stock,
            productGroupId: values.productGroupId,
            isActive: values.isActive,
          };
          setSubmitting(true);
          handleUpdate(payload, { setSubmitting });
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
              <DialogTitle id="form-dialog-title">Edit Product</DialogTitle>
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
                      disabled
                      type="text"
                      label="Stock"
                      name="stock"
                      value={values.stock}
                      onChange={(e) =>
                        setFieldValue(e.target.name, e.target.value)
                      }
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
                        onChange={(e) => {
                          setFieldValue(e.target.name, e.target.value);
                        }}
                      >
                        {productGroupList.map((item) => (
                          <MenuItem
                            key={`productgroup_${item.id}`}
                            value={item.id}
                          >
                            {item.name}
                          </MenuItem>
                        ))}
                      </Field>
                    </FormControl>
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
                        onChange={(e) => {
                          setFieldValue(e.target.name, e.target.value);
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
                <Button
                  onClick={handleClose}
                  color="primary"
                  disabled={isSubmitting}
                >
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

export default ProductEdit;
