import { Box, Button, Card, CardContent, CardMedia, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import api from "../services/api";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "./Footer";

function Products() {
    const { categoryId } = useParams();
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(() => {
        if (categoryId) {
            fetchProductsByCategory(categoryId);
            setSelectedCategory(categoryId);
        } else {
            fetchProducts();
            setSelectedCategory("all");
        }
        fetchCategories();
    }, [categoryId]);

    const fetchProductsByCategory = async () => {
        try {
            const res = await api.get(`/products/category/${categoryId}`);
            setProducts(res.data);
        } catch (error) {
            console.log(error);
        }
    };
    const fetchProducts = async () => {
        try {
            const res = await api.get("/products");
            setProducts(res.data);
        } catch (error) {
            console.log(error);
        }
    };
    const fetchCategories = async () => {
        try {
            const res = await api.get("/category");
            setCategories(res.data);
        } catch (error) {
            console.log(error);
        }
    }
    const handleCategoryChange = async (e) => {
        const value = e.target.value;
        setSelectedCategory(value);

        if (value === "all") {
            navigate("/products");
        } else {
            navigate(`/products/${value}`);
        }
    }

    return (
        <>
            {/* Navbar */}
            <Navbar />


            <Box sx={{ p: 4, background: "#f8f8f8", minHeight: "100vh" }}>

                <Typography variant="h4" fontWeight="bold" mb={4} textAlign="center">
                    Products
                </Typography>



                {/* ✅ Category Dropdown */}
                <FormControl sx={{ width: 300, paddingBottom:5 }}>
                    <InputLabel>Select Category</InputLabel>

                    <Select
                        value={selectedCategory}
                        label="Select Category"
                        onChange={handleCategoryChange}
                    >
                        <MenuItem value="all">All Categories</MenuItem>

                        {categories.map((cat) => (
                            <MenuItem key={cat._id} value={cat._id}>
                                {cat.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Grid container spacing={3}>
                    {products.length > 0 ?
                        <>
                            {products.map((product) => {
                                return (
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
                                );
                            })}
                        </>
                        :
                        (<Typography>No products found</Typography>)
                    }

                </Grid>
            </Box>

            <Footer />
        </>
    );

}

export default Products;