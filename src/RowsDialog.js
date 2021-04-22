import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
      margin: theme.spacing(5),
      width: '20ch',
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
    <form className={classes.root} >
       <TextField required id="firstName" label="Required" inputprops={{ 'firstName': 'First name' }} 
        defaultValue="First name" variant="outlined"/>
      
      <TextField required id="lastName" label="Required" inputprops={{ 'lastName': 'Last name' }} 
        defaultValue="Last name" variant="outlined"/>
      
      <TextField required id="jobTitle" label="Job title" inputlabelprops={{ shrink: true, 'jobTitle': 'Job title' }} 
        variant="outlined"/>
      
      <TextField id="age" label="Age" type="number" inputlbelprops={{ shrink: true, 'age': 'Age' }} 
        variant="outlined"/>
      
      <TextField id="availability" select label="Availability" value={available} inputprops={{ 'availability': 'Availability' }} onChange={handleChange} 
        helperText="Please select your availability" variant="outlined">
          {availability.map((option) => (            
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
    </form>  
  );
}