/* eslint-disable no-restricted-imports */
import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import { yellow } from "@material-ui/core/colors";
import * as swal from "../../Common/components/SweetAlert";
import * as productGroupRedux from "../_redux/productGroupRedux";
import * as productGroupAxios from "../_redux/productGroupAxios";
import { useSelector, useDispatch } from "react-redux";
import { ControlPoint } from "@material-ui/icons";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(yellow[400]),
    backgroundColor: yellow[400],
    "&:hover": {
      backgroundColor: yellow[700],
    },
  },
}));

function ProductGroupEdit(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState({ name: "" });

  const handleDelete = () => {
    swal.swalConfirm("Confirm Delete?", "").then((sw) => {
      if (sw.isConfirmed) {
        // TODO
      }
    });
  };

  const getProductGroup = () => {
    let id = props.productgid;
    productGroupAxios
      .getProductGroup(id)
      .then((response) => {
        if (response.data.isSuccess) {
          setData({
            ...data,
            name: response.data.data.name,
          });
          setOpen(true);
        } else {
          swal.swalError("Error", response.data.message);
        }
      })
      .catch((err) => {
        swal.swalError("Error", err.message);
      });
  };

  const handleClickOpen = () => {
    getProductGroup();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTest = () => {
    setOpen(false);
    swal.swalError("Error", "ปิดปรับปรุง กรุณาติดต่อผู้ดูแล");
  };

  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={{
          name: data.name,
        }}
        validate={(values) => {
          const errors = {};

          if (!values.name) {
            errors.name = "Required";
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          //TODO
        }}
      >
        {({ submitForm, isSubmitting, values, errors, resetForm }) => (
          <Form>
            <Button
              // {...props}
              style={{ marginRight: 5 }}
              variant="contained"
              className={classes.root}
              startIcon={<EditIcon />}
              onClick={handleClickOpen}
            >
              Edit
            </Button>

            <Dialog
              fullWidth
              maxWidth={"sm"}
              open={open}
              onClose={handleClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">
                Edit ProductGroup
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
                <Button onClick={handleTest} color="primary">
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
