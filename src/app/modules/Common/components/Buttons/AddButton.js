/* eslint-disable no-restricted-imports */
import React from "react";
import Button from "@material-ui/core/Button";
import { ControlPoint } from "@material-ui/icons";

function AddButton(props) {
  return (
    <Button
      {...props}
      fullWidth
      variant="contained"
      color="primary"
      startIcon={<ControlPoint />}
    >
      {props.children}
    </Button>
  );
}

export default AddButton;
