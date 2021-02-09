/* eslint-disable no-restricted-imports */
import * as React from "react";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import { Search, ClearAll, ControlPoint } from "@material-ui/icons";
import {
  Button,
  LinearProgress,
  Grid,
  Card,
  CardContent,
  Typography,
} from "@material-ui/core";

function ProductGroupSearch(props) {
  return (
    <Card elevation={3} style={{ marginBottom: 5 }}>
      <CardContent>
        <Typography style={{ fontSize: 14 }} gutterBottom>
          Search
        </Typography>

        <Formik
          initialValues={{
            pgName: "",
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
                <Grid item xs={12} lg={3}>
                  <Field
                    fullWidth
                    component={TextField}
                    required
                    type="text"
                    label="Name"
                    name="pgName"
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  lg={1}
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  {isSubmitting && <LinearProgress />}
                  <Button
                    icon={<Search />}
                    fullWidth
                    variant="contained"
                    color="secondary"
                    disabled={isSubmitting}
                    onClick={submitForm}
                  >
                    Search
                  </Button>
                </Grid>
                <Grid
                  item
                  xs={12}
                  lg={1}
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  {isSubmitting && <LinearProgress />}
                  <Button
                    icon={<ControlPoint />}
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    onClick={resetForm}
                  >
                    Add +
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
}

export default ProductGroupSearch;
