/* eslint-disable no-restricted-imports */
import React from "react";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import { yellow } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(yellow[400]),
    backgroundColor: yellow[400],
    "&:hover": {
      backgroundColor: yellow[700],
    },
  },
}));

function EditButton(props) {
  const classes = useStyles();
  return (
    <Button
      {...props}
      variant="contained"
      className={classes.root}
      startIcon={<EditIcon />}
    >
      {props.children}
    </Button>
  );
}

export default EditButton;
