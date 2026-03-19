import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { React } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    }
    return (
        <>
            <AppBar
                position="static"
                sx={{ backgroundColor: "white", boxShadow: "none" }}
            >
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1, color: "black", fontWeight: "bold" }}>
                        MyShop
                    </Typography>

                    <Button onClick={() => navigate('/')} sx={{ color: "black" }}>
                        Home
                    </Button>

                    <Button onClick={() => navigate('/products')} sx={{ color: "black" }}>
                        Products
                    </Button>
                    {
                        token ? (
                            <>
                                <Button onClick={handleLogout} sx={{ color: "black" }}>
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button onClick={() => navigate('/login')} sx={{ color: "black" }}>
                                    Login
                                </Button>

                                <Button onClick={() => navigate('/register')} sx={{ color: "black" }}>
                                    Register
                                </Button>
                            </>
                        )
                    }
                </Toolbar>
            </AppBar>
        </>
    );
}

export default Navbar;