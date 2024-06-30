import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { SignUpModal } from "@modal";

// Mock auth service for testing
const auth = {
  sign_up: async (values) => {
    console.log("Submitted values:", values);
    // Simulate a successful registration response
    return { status: 200 };
  },
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Required"),
  full_name: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
  phone_number: Yup.string().required("Required"), // No specific validation for phone number format
});

const Index = () => {
  const [open, setOpen] = useState(false);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await auth.sign_up(values);
      if (response.status === 200) {
        setOpen(true);
        toast.success("Successfully registered!");
      } else {
        toast.error("Failed to register. Please try again later.");
      }
    } catch (error) {
      console.log("Registration error:", error);
      toast.error("Failed to register. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SignUpModal open={open} handleClose={() => setOpen(false)} />
      <ToastContainer />
      <div className="w-full h-screen flex items-center justify-center">
        <div className="w-full sm:w-[600px] p-5">
          <h1 className="text-center my-6 text-[50px]">Register</h1>
          <Formik
            initialValues={{ email: "", full_name: "", password: "", phone_number: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, touched, errors }) => (
              <Form className="flex flex-col gap-3">
                <Field
                  as={TextField}
                  fullWidth
                  type="email"
                  label="Email"
                  id="email"
                  name="email"
                  variant="outlined"
                  error={touched.email && Boolean(errors.email)}
                  helperText={<ErrorMessage name="email" />}
                />
                <Field
                  as={TextField}
                  fullWidth
                  type="text"
                  label="Full Name"
                  id="full_name"
                  name="full_name"
                  variant="outlined"
                  error={touched.full_name && Boolean(errors.full_name)}
                  helperText={<ErrorMessage name="full_name" />}
                />
                <Field
                  as={TextField}
                  fullWidth
                  type="password"
                  label="Password"
                  id="password"
                  name="password"
                  variant="outlined"
                  error={touched.password && Boolean(errors.password)}
                  helperText={<ErrorMessage name="password" />}
                />
                <Field
                  as={TextField}
                  fullWidth
                  type="text"
                  label="Phone"
                  id="phone_number"
                  name="phone_number"
                  variant="outlined"
                  error={touched.phone_number && Boolean(errors.phone_number)}
                  helperText={<ErrorMessage name="phone_number" />}
                />
                <Button variant="contained" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Registering..." : "Sign Up"}
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Index;
