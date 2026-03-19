import { Box, Typography } from "@mui/material";
import { react } from "react";

function Footer() {
    return (
        <>
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
export default Footer;