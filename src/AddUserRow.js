import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddButton from './AddButton';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';


const availability = [
  {
    value: 'Available',
    label: 'available',
  },
  {
    value: 'Not available',
    label: 'not available',
  },
  {
    value: 'Unknown',
    label: 'unknown',
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function MultilineTextFields() {
  const classes = useStyles();
  const [available, setAvailable] = React.useState('Available');

  const handleChange = (event) => {
    setAvailable(event.target.value);
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField required id="outlined-required" label="Required" inputProps={{ 'firstName': 'First name' }} 
        defaultValue="First name" variant="outlined" />
      
      <TextField required id="outlined-required" label="Required" inputProps={{ 'lastName': 'Last name' }} 
        defaultValue="Last name" variant="outlined" />
      
      <TextField required id="outlined-required" label="Job title" inputLabelProps={{ shrink: true, 'jobTitle': 'Job title' }} variant="outlined" />
      
      <TextField id="age" label="Age" type="number" InputLabelProps={{ shrink: true, 'age': 'Age' }} 
        variant="outlined" />
      
      <TextField id="availability" select label="Availability" value={available} onChange={handleChange} 
        helperText="Please select your availability" variant="outlined" >
          {availability.map((option) => (
            
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        
      <AddButton />      
    </form>
  );
}