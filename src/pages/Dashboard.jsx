import React, { useEffect, useState } from "react";
import {
  Typography,
  Button,
  Grid,
  Container,
  Box,
  Card,
  CardMedia,
  CardContent
} from "@mui/material";
import api from "../services/api";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

function Home() {

  const [categories, setCategory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/category");
      setCategory(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log("categories", categories);

  return (
    <>
      {/* Navbar */}
      <Navbar />

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

      {/* Categories */}
      <Container sx={{ py: 5 }}>

        <Typography variant="h4" mb={4}>
          Featured Categories
        </Typography>

        <Grid container spacing={3}>

          {categories.map((category) => {
            console.log(category);
            return (
              <>
                <Grid item xs={12} sm={6} md={3} key={category._id} width={300} maxHeight={500}>

                  <Card>

                    <CardContent>

                      <Typography variant="h6">
                        {category.name}
                      </Typography>

                      <Typography color="text.secondary">
                        {category.description}
                      </Typography>

                      <Button
                        variant="contained"
                        sx={{
                          mt: 2,
                          background: "linear-gradient(135deg,#ff6a00,#ee0979)",
                          color: "white"
                        }}
                        fullWidth
                        onClick={() => navigate(`/products/${category._id}`)}
                      >
                        View Products
                      </Button>

                    </CardContent>

                  </Card>

                </Grid>
              </>
            );
          })}

        </Grid>
      </Container>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default Home;