import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import DialogContentText from "@mui/material/DialogContentText";
import { MenuItem, Divider, Chip } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const relationships = [
  "Parent",
  "Child",
  "Sibling",
  "Spouse",
  "Partner",
  "In-law",
  "Grandparent",
  "Grandchild",
  "Uncle/Aunt",
  "Nephew/Niece",
  "Cousin",
  "Extended family member",
  "Boyfriend/Girlfriend",
  "Fiancé/Fiancée",
  "Ex-spouse/Ex-partner",
  "Casual/Intimate Partner",
  "Close friend",
  "Acquaintance",
  "Childhood friend",
  "Best friend",
  "Social circle member",
  "Colleague/Co-worker",
  "Supervisor/Boss",
  "Subordinate/Employee",
  "Business partner",
  "Client/Customer",
  "Professional mentor",
  "Classmate",
  "School friend",
  "Teacher/Professor",
  "Student",
  "Academic advisor",
  "Neighbor",
  "Stranger",
];

const Form = () => {
  const [open, setOpen] = React.useState(true);
  const [numRecords, setNumRecords] = React.useState([0]);
  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    setNumRecords([...numRecords, numRecords.length]);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Pre-Interrogation Form</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Suspect Background and Profile Information: Detailed Pre-Interrogation
          Form for Tailoring Effective Interrogation Strategies
        </DialogContentText>
        <Divider style={{ marginTop: "20px" }}>
          <Chip label="Suspect Profile" />
        </Divider>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            alignItems: "center",
            marginTop: "10px",
          }}
        >
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="First Name"
            type="email"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Last Name"
            type="email"
            fullWidth
          />
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "10px",
            alignItems: "center",
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker label="Date Of Birth" sx={{ width: "100%" }} />
          </LocalizationProvider>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "10px",
            alignItems: "center",
          }}
        >
          <TextField
            id="outlined-select-currency"
            select
            label="Relationships"
            helperText="Please select suspect's relationship to the victim"
            fullWidth
          >
            {relationships.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </div>

        <Divider style={{ marginTop: "20px" }}>
          <Chip label="Case Information" />
        </Divider>
        <div
          style={{
            display: "flex",
            marginTop: "10px",
            justifyItems: "center",
          }}
        >
          <TextField
            id="outlined-multiline-static"
            label="Case Summary"
            multiline
            fullWidth
            rows={4}
          />
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "10px",
            alignItems: "center",
          }}
        >
          <TextField
            id="outlined-multiline-static"
            label="Case Evidence"
            multiline
            fullWidth
            rows={4}
          />
        </div>
        <Divider style={{ marginTop: "20px" }}>
          <Chip label="Criminal History" />
        </Divider>

        {/* this is adding for previuos criminal records let user to add more by providing add button */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            alignItems: "center",
            marginTop: "10px",
          }}
        >
          {numRecords.map((num) => (
            <TextField
              id="outlined-multiline-static"
              label="Criminal Records"
              multiline
              fullWidth
            />
          ))}

          <IconButton aria-label="delete" size="large" onClick={handleAdd}>
            <AddCircleOutlineIcon fontSize="inherit" />
          </IconButton>
        </div>

        <DialogActions>
          <Button onClick={handleClose}>Submit</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default Form;
