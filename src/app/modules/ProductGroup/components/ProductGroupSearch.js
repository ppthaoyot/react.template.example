/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-imports */
import * as React from "react";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import { Search } from "@material-ui/icons";
import { Button, LinearProgress, Grid, Typography } from "@material-ui/core";

function ProductGroupSearch(props) {
  return (
    <Formik
      initialValues={{
        name: "",
      }}
      validate={(values) => {
        const errors = {};

        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
        props.submit(values);
      }}
    >
      {/* Render form */}
      {({ submitForm, isSubmitting, values, errors, resetForm }) => (
        <Form>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={9}>
              <Typography style={{ fontSize: 14 }} gutterBottom>
                Search
              </Typography>
              <Field
                fullWidth
                component={TextField}
                required
                type="text"
                label="กรอกคำค้นหา"
                name="name"
              />
            </Grid>
            <Grid
              container
              item
              xs={12}
              lg={3}
              direction="row"
              justify="flex-start"
              alignItems="flex-end"
            >
              {isSubmitting && <LinearProgress />}
              <Button
                startIcon={<Search />}
                fullWidth
                variant="contained"
                color="secondary"
                disabled={isSubmitting}
                onClick={submitForm}
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}

export default ProductGroupSearch;
