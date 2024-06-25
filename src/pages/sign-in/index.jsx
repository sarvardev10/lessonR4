import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { auth } from "@service";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Index = () => {
  const [form, setForm] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await auth.sign_in(form);
      if (response.status === 200) {
        localStorage.setItem("access_token", response?.data.access_token);
        toast.success("Successfully logged in!");
      } else {
        toast.error("Access denied. Please check your credentials.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to log in. Please try again later.");
    }
  };

  return (
    <>
      <ToastContainer />

      <div className="w-full h-screen flex items-center justify-center">
        <div className="w-full sm:w-[600px] p-5">
          <h1 className="text-center my-6 text-[50px]">Login</h1>
          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              type="email"
              onChange={handleChange}
              label="Email"
              id="email"
              name="email"
            />

            <TextField
              fullWidth
              type="password"
              onChange={handleChange}
              label="Password"
              id="password"
              name="password"
            />

            <Button variant="contained" type="submit">
              Sign In
            </Button>
          </form>

          {/* Register Here button */}
          <div className="text-center mt-4">
            <Link to="/sign-up">
              <Button variant="text" color="primary">
                Register Here
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
