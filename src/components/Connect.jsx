import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

const Connect = () => {
  const [open, setOpen] = React.useState(true);
  const [connecting, setConnecting] = React.useState(false);
  const [title, setTitle] = React.useState(
    "Enter a passcode to connect to the server"
  );

  const handleClose = () => {
    setOpen(false);
  };

  const handleConnect = () => {
    setConnecting(true);
    setTitle("Connecting...");
    setTimeout(() => {
      setConnecting(false);
      setOpen(false);
    }, 2000);
  };

  return (
    <div>
      <Dialog open={open}>
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          {connecting ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <CircularProgress />
            </div>
          ) : (
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Passcode"
              fullWidth
              variant="outlined"
            />
          )}
        </DialogContent>
        {connecting ? null : (
          <DialogActions>
            <Button onClick={handleConnect}>Connect</Button>
          </DialogActions>
        )}
      </Dialog>
    </div>
  );
};

export default Connect;
