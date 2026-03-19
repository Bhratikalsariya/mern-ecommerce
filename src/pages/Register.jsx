import React, { useState } from "react";
import {
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  InputAdornment,
  IconButton
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import api from "../services/api";


const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Enter valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be 6 characters")
    .required("Password is required")
});

function Register() {

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const [formData, setFormData] = useState({
    name: "",
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
      const response = await api.post("/register", data);

      console.log(response.data);

      alert("User registered successfully");
      navigate("/login");

    } catch (error) {

      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Server error");
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
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          background: "linear-gradient(135deg,#ff6a00,#ee0979)"
        }}
      >
        <Box textAlign="center" px={6}>
          <Typography variant="h3" fontWeight="bold">
            Welcome to Our Store
          </Typography>

          <Typography mt={2} fontSize={18}>
            Discover amazing products and shop the latest trends
          </Typography>
        </Box>
      </Grid>

      {/* RIGHT SIDE */}
      <Grid
        item
        size={6}
        component={Paper}
        elevation={6}
        square
      >
        <Box
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Box width="70%">

            <Typography variant="h4" fontWeight="bold" mb={3}>
              Create Account
            </Typography>

            <Box component="form" onSubmit={handleSubmit(onSubmit)}>

              <TextField
                fullWidth
                label="Full Name"
                name="name"
                margin="normal"
                onChange={handleChange}
                {...register("name")}
                error={!!errors.name}
                helperText={errors.name?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  )
                }}
              />

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

              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{
                  mt: 3,
                  py: 1.5,
                  fontSize: 16,
                  background: "linear-gradient(90deg,#ff6a00,#ee0979)"
                }}
              >
                Create Account
              </Button>

              <Typography mt={2}>
                Already have an account? <a href="/login">Login</a>
              </Typography>

            </Box>

          </Box>
        </Box>
      </Grid>

    </Grid>
  );
}

export default Register;