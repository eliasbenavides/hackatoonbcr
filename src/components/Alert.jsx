import { Alert as AlertMui, Snackbar } from "@mui/material";
const Alert = ({
  text = "",
  alertType = "success",
  isActive = false,
  handleClose,
}) => {
  return (
    <Snackbar
      open={isActive}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      autoHideDuration={6000}
      onClose={handleClose}
      sx={{ marginTop: "50px" }}
      key={"top" + "center"}
    >
      <AlertMui severity={alertType}>{text}</AlertMui>
    </Snackbar>
  );
};

export default Alert;
