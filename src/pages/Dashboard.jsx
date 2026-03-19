import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Container,
  Box
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../services/api";

function Home() {

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log("pro",products);
  
  return (
    <>
      {/* Navbar */}
      <AppBar
        position="static"
        sx={{ backgroundColor: "white", boxShadow: "none" }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1,color: "black", fontWeight: "bold" }}>
            MyShop
          </Typography>

          <Button onClick={() => navigate('/')} sx={{ color: "black" }}>
            Home
          </Button>

          <Button onClick={() => navigate('/products')} sx={{ color: "black" }}>
            Products
          </Button>

          <Button onClick={() => navigate('/login')}  sx={{ color: "black" }}>
            Login
          </Button>

          <Button onClick={() => navigate('/register')} sx={{ color: "black" }}>
            Register
          </Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg,#ff6a00,#ee0979)",
          color: "white",
          textAlign: "center",
          py: 10
        }}
      >
        <Typography variant="h3" fontWeight="bold">
          Welcome to MyShop
        </Typography>

        <Typography mt={2}>
          Best products at the best price
        </Typography>

        <Button
          variant="contained"
          sx={{ mt: 3, background: "white", color: "black" }}
        >
          Shop Now
        </Button>
      </Box>

      {/* Products */}
      <Container sx={{ py: 5 }}>

        <Typography variant="h4" mb={4}>
          Featured Products
        </Typography>

        <Grid container spacing={3}>

          {products.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product._id}>

              <Card>

                <CardMedia
                  component="img"
                  height="200"
                  image={product.imageUrls && product.imageUrls.length > 0 ? product.imageUrls[0] : "/images/no-image.png"}
                />

                <CardContent>

                  <Typography variant="h6">
                    {product.name}
                  </Typography>

                  <Typography color="text.secondary">
                    Rs. {product.price}
                  </Typography>

                  <Button
                    variant="contained"
                    sx={{
                      mt: 2,
                      background: "linear-gradient(135deg,#ff6a00,#ee0979)",
                      color: "white"
                    }}
                    fullWidth
                  >
                    Add to Cart
                  </Button>

                </CardContent>

              </Card>

            </Grid>
          ))}

        </Grid>
      </Container>

      {/* Footer */}
      <Box
        sx={{
          background: "#111",
          color: "white",
          textAlign: "center",
          py: 3
        }}
      >
        <Typography>
          © 2026 MyShop. All Rights Reserved.
        </Typography>
      </Box>
    </>
  );
}

export default Home;