import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";

const Connect = ({ handlePasscodeChange, open }) => {
  const [connecting, setConnecting] = React.useState(false);
  const [passcode, setPasscode] = React.useState();
  const [title, setTitle] = React.useState("Enter Server Connection Passcode");

  const handleConnect = () => {
    handlePasscodeChange(passcode);
    setConnecting(true);
    setTitle(`Connecting to server...`);
  };

  return (
    <Dialog open={open}>
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        {connecting ? (
          <LinearProgress />
        ) : (
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Passcode"
            fullWidth
            variant="outlined"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleConnect();
              }
            }}
          />
        )}
      </DialogContent>
      {connecting ? null : (
        <DialogActions>
          <Button onClick={handleConnect}>Connect</Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default Connect;
