import * as React from "react";
import {
  Modal,
  Backdrop,
  Box,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { orderValidationSchema } from "../../../utils/validation";
import service from "../../../service/service";
import order from "../../../service/order";
import { useState, useEffect } from "react";

const Fade = ({ children, in: open }) => {
  const style = {
    opacity: open ? 1 : 0,
    transition: "opacity 0.5s",
  };

  return <div style={style}>{open ? children : null}</div>;
};
// eslint-disable-next-line react/prop-types
const Index = ({ open, handleClose, item }) => {
  console.log(item, "item"); // Log item to check its content
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await service.get();
        if (response.status === 200 && response.data?.services) {
          setData(response.data.services);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // Set initial values based on whether editing an existing item or creating a new one
  const initialValues = item
    ? {
        client_full_name: item.client_full_name || "",
        client_phone_number: item.client_phone_number || "",
        amount: item.amount || "",
        service_id: item.service_id || "",
      }
    : {
        client_full_name: "",
        client_phone_number: "",
        amount: "",
        service_id: "",
      };

  console.log("initialValues:", initialValues); // Log initialValues for debugging

  const handleSubmit = async (values) => {
    if (item) {// eslint-disable-next-line react/prop-types
      const payload = { id: item.id, ...values };
      try {
        const response = await order.update(payload);
        if (response.status === 201) {
          window.location.reload();
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await order.create(values);
        if (response.status === 201) {
          window.location.reload();
        }
      } catch (error) {
        console.log(error);
      }
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
            {item ? "Edit Order" : "Create Order"}
          </Typography>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={orderValidationSchema}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field
                  name="client_full_name"
                  type="text"
                  as={TextField}
                  label="Name"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  helperText={
                    <ErrorMessage
                      name="client_full_name"
                      component="p"
                      className="text-[red] text-[15px]"
                    />
                  }
                />
                <Field
                  name="client_phone_number"
                  type="text"
                  as={TextField}
                  label="Phone"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  helperText={
                    <ErrorMessage
                      name="client_phone_number"
                      component="p"
                      className="text-[red] text-[15px]"
                    />
                  }
                />
                <Field
                  name="amount"
                  type="number"
                  as={TextField}
                  label="Amount"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  helperText={
                    <ErrorMessage
                      name="amount"
                      component="p"
                      className="text-[red] text-[15px]"
                    />
                  }
                />
                <Field
                  name="service_id"
                  as={Select}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  displayEmpty
                  inputProps={{
                    name: "service_id",
                    id: "service_id",
                  }}
                  helperText={
                    <ErrorMessage
                      name="service_id"
                      component="p"
                      className="text-[red] text-[15px]"
                    />
                  }
                >
                  <MenuItem value="" disabled>
                    Select a service
                  </MenuItem>
                  {data.map((item, index) => (// eslint-disable-next-line react/prop-types
                    <MenuItem key={index} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Field>

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={isSubmitting}
                  sx={{ marginTop: "8px" }}
                >
                  {isSubmitting ? "Saving..." : "Save"}
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
