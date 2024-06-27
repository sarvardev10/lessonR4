import React from "react";
import { Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "@service";
import { ForgetModal } from "@modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Please fill the field"),
  password: Yup.string().required("Required"),
});

const Index = () => {
  const [open, setOpen] = React.useState(false);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await auth.sign_in(values);
      if (response.status === 200) {
        localStorage.setItem("access_token", response?.data.access_token);
        toast.success("Successfully logged in!");
      } else {
        toast.error("Access denied. Please check your credentials.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to log in. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <ForgetModal open={open} handleClose={() => setOpen(false)} />
      <ToastContainer />

      <div className="w-full h-screen flex items-center justify-center">
        <div className="w-full sm:w-[600px] p-5">
          <h1 className="text-center my-6 text-[50px]">Login</h1>
          <Formik
            initialValues={{ email: "", password: "" }}
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
                  type="password"
                  label="Password"
                  id="password"
                  name="password"
                  variant="outlined"
                  error={touched.password && Boolean(errors.password)}
                  helperText={<ErrorMessage name="password" />}
                />

                <Button
                  variant="contained"
                  fullWidth
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Signing In..." : "Sign In"}
                </Button>
              </Form>
            )}
          </Formik>

          <div className="text-center mt-4">
            <Link to="/sign-up">
              <Button variant="text" color="primary">
                Register Here
              </Button>
            </Link>
          </div>
          <div className="text-center mt-4">
            <Button
              variant="text"
              color="primary"
              onClick={() => setOpen(true)}
            >
              Forgot password
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
