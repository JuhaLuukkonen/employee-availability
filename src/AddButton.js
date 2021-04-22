import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

// adding new row do not work

const addRows = [
  {firstname: '', lastName: '', jobTitle: '', age:'', availability: ''}
]

export default function ContainedButtons() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button onClick={() => { addRows()}} variant="contained" color="secondary" >Add</Button>      
    </div>
  );
}