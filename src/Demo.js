import React from "react";
import { ReactMUIDatatable } from "react-material-ui-datatable";
import IconButton from "@material-ui/core/IconButton";
import EventBusyIcon from '@material-ui/icons/EventBusy';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import SwapHorizIcon from "@material-ui/icons/SwapHoriz";
import DeleteIcon from "@material-ui/icons/Delete";
import users from "./stub.json";
import AddUserRow from "./AddUserRow";
// Demo.js file should be named EmployeeList 

const columns = [
  { name: "firstName", label: "First name", id: "firstName" },
  { name: "lastName", label: "Last name", id: "lastName" },
  { name: "jobTitle", label: "Job title", id: "jobTitle" },
  { name: "age", label: "Age", id:"age" },
  { name: "availability", label: "Availability", id:"availability" },
];

const customCell = ({ value, column, row }) => {
  if (column.name === "availability") {
    return value === "Available" ? <EventAvailableIcon /> 
    :  "Not available" ? <EventBusyIcon /> 
    : <NotInterestedIcon />;
  }

  return value;
};

const customToolbarSelectActions = ({
  data,
  selectedData,
  updateSelectedData,
  handleDelete
}) => (
  <React.Fragment>
    <IconButton
      onClick={() => {
        const nextSelectedData = data.reduce((nextSelectedData, row) => {
          if (!selectedData.includes(row)) {
            nextSelectedData.push(row);
          }

          return nextSelectedData;
        }, []);

        updateSelectedData(nextSelectedData);
      }}
    >
      <SwapHorizIcon />
    </IconButton>
    <IconButton
      onClick={() => {
        handleDelete(selectedData);
      }}
    >
      <DeleteIcon />
    </IconButton>
  </React.Fragment>
);

const addedRows = [
  {firstname: '', lastName: '', jobTitle: '', age:'', availability: ''}
]

const rows = [
  {firstname: '', lastName: '', jobTitle: '', age:'', availability: ''}
]

const btnStyle = {
  display: "flex",
  verticalAlign: "center"        
}

const Demo = () => (
  <div className={"App"}> 
    
    <ReactMUIDatatable
      title={"List"}      
      rows={rows}      
      data={users}
      columns={columns}
      customCell={customCell}
      toolbarSelectActions={customToolbarSelectActions}
    />    
    ______
    
    <AddUserRow
    addedRows={addedRows}
    style={btnStyle}
    />         
  </div>
);

export default Demo;
