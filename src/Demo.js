import React from "react";
import { ReactMUIDatatable } from "react-material-ui-datatable";
import IconButton from "@material-ui/core/IconButton";
import EventBusyIcon from '@material-ui/icons/EventBusy';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import SwapHorizIcon from "@material-ui/icons/SwapHoriz";
import DeleteIcon from "@material-ui/icons/Delete";
import users from "./stub.json";

// TODO add rows - hooks - state

const columns = [
  { name: "firstName", label: "First name" },
  { name: "lastName", label: "Last name" },
  { name: "age", label: "Age" },
  {
    name: "availability",
    label: "Availability"
  },
  {
    name: "credits.email",
    label: "Email"
  }
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

const Demo = () => (
  <div className={"App"}>
    <ReactMUIDatatable
      title={"List"}
      data={users}
      columns={columns}
      customCell={customCell}
      toolbarSelectActions={customToolbarSelectActions}
    />
  </div>
);

export default Demo;
