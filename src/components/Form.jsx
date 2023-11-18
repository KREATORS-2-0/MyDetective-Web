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

const Form = ({ updateForm }) => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [dateOfBirth, setDateOfBirth] = React.useState("");
  const [relationship, setRelationship] = React.useState("");
  const [caseSummary, setCaseSummary] = React.useState("");
  const [caseEvidence, setCaseEvidence] = React.useState("");
  const [criminalRecords, setCriminalRecords] = React.useState([]);
  const [open, setOpen] = React.useState(true);
  const [numRecords, setNumRecords] = React.useState([0]);
  const handleClose = () => {
    setOpen(false);
    updateForm(firstName, "firstName");
    updateForm(lastName, "lastName");
    updateForm(dateOfBirth, "dateOfBirth");
    updateForm(relationship, "relationship");
    updateForm(caseSummary, "caseSummary");
    updateForm(caseEvidence, "caseEvidence");
    updateForm(criminalRecords, "criminalRecords");
    updateForm("", "completed");
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
            id="firstName"
            label="First Name"
            type="email"
            fullWidth
            data={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="lastName"
            label="Last Name"
            type="email"
            fullWidth
            data={lastName}
            onChange={(e) => setLastName(e.target.value)}
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
            <DatePicker
              label="Date Of Birth"
              sx={{ width: "100%" }}
              value={dateOfBirth} // Use 'value' instead of 'data'
              onChange={(newValue) => {
                if (newValue) {
                  setDateOfBirth(newValue.format("YYYY-MM-DD")); // Format the date
                } else {
                  setDateOfBirth(null); // Handle null case (e.g., if the date is cleared)
                }
              }}
            />
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
            value={relationship}
            onChange={(e) => setRelationship(e.target.value)}
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
            id="case_summary"
            label="Case Summary"
            multiline
            fullWidth
            rows={4}
            data={caseSummary}
            onChange={(e) => setCaseSummary(e.target.value)}
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
            id="case_evidence"
            label="Case Evidence"
            multiline
            fullWidth
            rows={4}
            data={caseEvidence}
            onChange={(e) => setCaseEvidence(e.target.value)}
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
              id={num.toString()}
              label="Criminal Records"
              multiline
              fullWidth
              data={criminalRecords[num]}
              onChange={(e) => {
                let temp = criminalRecords;
                temp[num] = e.target.value;
                setCriminalRecords(temp);
              }}
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
