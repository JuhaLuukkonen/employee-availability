import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function Inputs() {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <Input defaultValue="First name" inputProps={{ 'aria-label': 'firstName' }} />
      <Input defaultValue="Last name" inputProps={{ 'aria-label': 'lastName' }} />
      <Input defaultValue="Job title" inputProps={{ 'aria-label': 'JobTitle' }} />
      <Input defaultValue="Age" inputProps={{ 'aria-label': 'age' }} />
      <Input placeholder="Availability" inputProps={{ 'aria-label': 'availability' }} />      
    </form>
  );
}