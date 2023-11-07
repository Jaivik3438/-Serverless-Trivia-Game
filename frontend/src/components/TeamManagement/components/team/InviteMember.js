import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Stack, TextField } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

export default function InviteMember() {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleInvite = () => {
    console.log("Invite ", email);
    // TODO: Handle API call
  };

  return (
    <div>
      <Button onClick={handleOpen} variant="contained">Invite Member</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack direction={"column"} gap={2}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Invite A New Member
          </Typography>
          <TextField
            id="outlined-basic"
            label="Enter e-mail of the user"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button onClick={handleInvite} variant="contained" fullWidth={false}>Invite User</Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
