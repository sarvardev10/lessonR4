import SignIn from "./sign-in";
import SignUp from "./sign-up";
export { SignIn, SignUp };
import React from "react";
import { Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "@service";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Please fill the field"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required("Required"),
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
});

const Register = () => {
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await auth.sign_up(values);
      if (response.status === 200) {
        toast.success("Successfully registered!");
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to register. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <ToastContainer />

      <div className="w-full h-screen flex items-center justify-center">
        <div className="w-full sm:w-[600px] p-5">
          <h1 className="text-center my-6 text-[50px]">Register</h1>
          <Formik
            initialValues={{ email: "", password: "", confirmPassword: "", firstName: "", lastName: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, touched, errors }) => (
              <Form className="flex flex-col gap-3">
                <Field
                  as={TextField}
                  fullWidth
                  type="text"
                  label="First Name"
                  id="firstName"
                  name="firstName"
                  variant="outlined"
                  error={touched.firstName && Boolean(errors.firstName)}
                  helperText={<ErrorMessage name="firstName" />}
                />

                <Field
                  as={TextField}
                  fullWidth
                  type="text"
                  label="Last Name"
                  id="lastName"
                  name="lastName"
                  variant="outlined"
                  error={touched.lastName && Boolean(errors.lastName)}
                  helperText={<ErrorMessage name="lastName" />}
                />

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
                  type="password"
                  label="Confirm Password"
                  id="confirmPassword"
                  name="confirmPassword"
                  variant="outlined"
                  error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                  helperText={<ErrorMessage name="confirmPassword" />}
                />

                <Button
                  variant="contained"
                  fullWidth
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Registering..." : "Register"}
                </Button>
              </Form>
            )}
          </Formik>

          <div className="text-center mt-4">
            <Link to="/login">
              <Button variant="text" color="primary">
                Already have an account? Login here
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
