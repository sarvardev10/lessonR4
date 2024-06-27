import { useState } from "react";
import {
  Modal,
  Backdrop,
  Box,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSpring, animated } from "@react-spring/web";

const Fade = ({ children, in: open }) => {
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
  });

  return <animated.div style={style}>{open ? children : null}</animated.div>;
};

const SignUpModal = ({ open, handleClose }) => {
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Verification code:", code);
    navigate("/");
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h5" sx={{ my: 2, textAlign: "center" }}>
            Enter Verification Code
          </Typography>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <TextField
              fullWidth
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              label="Code"
              id="code"
            />
            <Button variant="contained" fullWidth type="submit">
              Submit
            </Button>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};

export default SignUpModal;
