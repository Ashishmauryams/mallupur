import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";


const GlobalAlert = ({
  open,
  message,
  severity,
  variant,
}) => {
  return (
    <Snackbar
      open={open}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      sx={{
          width: "50%",
        }}
    >
      <Alert
        severity={severity}
        variant={variant}
        sx={{
          width: "100%",
          fontSize:"14px",
          fontWeight:600
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default GlobalAlert;