import React from "react";
import {
  Modal,
  Backdrop,
  Box,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { orderValidationSchema } from "../../../utils/validation";

const Fade = ({ children, in: open }) => {
  const style = {
    opacity: open ? 1 : 0,
    transition: "opacity 0.5s",
  };

  return <div style={style}>{open ? children : null}</div>;
};

const Index = ({ open, handleClose, item }) => {
  console.log(item, "item");
  const initialValues = {
    amount: item?.amount || 1,
    client_id: item?.client_id || "",
    id: item?.id || "",
    service_id: item?.service_id || "",
    status: item?.status || "in_process",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      let response;
      if (item) {
        const payload = { id: item.id, ...values };
        response = await order.update(payload);
      } else {
        response = await order.create(values);
      }

      if (response.status === 200 || response.status === 201) {
        window.location.reload();
        handleClose();
      } else {
        console.error("Failed to save order:", response.data);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setSubmitting(false);
    }
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
            Edit Order
          </Typography>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={orderValidationSchema}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field
                  name="amount"
                  type="number"
                  as={TextField}
                  label="Amount"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  helperText={<ErrorMessage name="amount" />}
                />
                <Field
                  name="client_id"
                  type="text"
                  as={TextField}
                  label="Client ID"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  helperText={<ErrorMessage name="client_id" />}
                />
                <Field
                  name="id"
                  type="text"
                  as={TextField}
                  label="Order ID"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  helperText={<ErrorMessage name="id" />}
                />
                <Field
                  name="service_id"
                  type="text"
                  as={TextField}
                  label="Service ID"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  helperText={<ErrorMessage name="service_id" />}
                />
                <Field
                  name="status"
                  type="text"
                  as={TextField}
                  label="Status"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  helperText={<ErrorMessage name="status" />}
                />

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={isSubmitting}
                  sx={{ marginBottom: "8px" }}
                >
                  {isSubmitting ? "Updating..." : "Update"}
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Fade>
    </Modal>
  );
};

export default Index;
