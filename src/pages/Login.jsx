import React, { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Typography,
  Box,
  InputAdornment,
  IconButton
} from "@mui/material";

import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../services/api";
import { Navigate, useNavigate } from "react-router-dom";

const schema = yup.object({
  email: yup
    .string()
    .email("Enter valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be 6 characters")
    .required("Password is required")
});


function Login() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const onSubmit = async (data) => {
    console.log(data);

    try {
      const response = await api.post("auth/login", data);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      navigate("/");

    } catch (error) {

      if (error.response?.data?.message) {
        setError("root", {
          type: "manual",
          message: error.response.data.message
        });
      } else {
        setError("root", {
          type: "manual",
          message: "Something went wrong"
        });
      }

    }
  };

  return (
    <Grid container sx={{ height: "100vh" }}>

      {/* LEFT SIDE */}
      <Grid
        item
        size={6}
        sx={{
          background: "linear-gradient(135deg,#ff6a00,#ee0979)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff"
        }}
      >
        <Box textAlign="center" px={6}>
          <Typography variant="h3" fontWeight="bold">
            Welcome Back
          </Typography>

          <Typography mt={2} fontSize={18}>
            Login to continue shopping your favorite products
          </Typography>
        </Box>
      </Grid>

      {/* RIGHT SIDE LOGIN FORM */}
      <Grid
        item
        size={6}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f8f8f8"
        }}
      >

        <Box width="60%">

          <Typography variant="h4" fontWeight="bold" mb={3}>
            Login
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmit)}>

            <TextField
              fullWidth
              label="Email"
              name="email"
              margin="normal"
              onChange={handleChange}
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                )
              }}
            />

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              margin="normal"
              onChange={handleChange}
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

             {/* ✅ General API error */}
              {errors.root && (
                <Typography color="error" mt={1}>
                  {errors.root.message}
                </Typography>
              )}

            <Button
              fullWidth
              variant="contained"
              type="submit"
              sx={{
                mt: 3,
                py: 1.5,
                fontSize: 16,
                background: "linear-gradient(90deg,#ff6a00,#ee0979)"
              }}
            >
              Login
            </Button>

            <Typography mt={2}>
              Don't have an account? <a href="/register">Register</a>
            </Typography>

          </Box>

        </Box>

      </Grid>

    </Grid>
  );
}

export default Login;