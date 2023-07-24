import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Box, useTheme, useMediaQuery, Fab } from "@mui/material";
import { RadioButtonUnchecked } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";


export default function Footer() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();

    const copyRightText = (
        <Typography variant="body2" align={isMobile ? "center" : "right"}>
            © night notes [n.n.] {new Date().getFullYear()}
        </Typography>
    );

    const aboutText = (
        <Typography variant="body2" align={isMobile ? "center" : "right"}>
            this is a blog of night, meaning all blogs were written at night. meaning, each blog has its own meaning.
        </Typography>
    );

    const handleClick = () => {
        navigate("/zen");
    }

    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: "#113540",
                position: "relative", // change position to relative
                width: "100%",
                // height: "35vh",
                padding: "5% 0",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                marginTop: "30vh",
            }}
        >

            <Container maxWidth="lg" sx={{ marginTop: "auto" }}>
                <Grid container alignItems="center" spacing={5}>

                    {isMobile ? (
                        <Grid item xs={12} sm={4}>
                            <Typography variant="h6" gutterBottom>
                            n.n.
                            </Typography>
                        </Grid>
                        ) : (
                            <Grid item xs={12} sm={4}>
                                <Typography variant="h6" gutterBottom>
                                    night notes
                                </Typography>
                            </Grid>)
                    }

                    <Grid item xs={12} sm={8} >
                        {aboutText}
                    </Grid>

                </Grid>

                <Box mt={5} >
                    {copyRightText}
                </Box>

                <Fab
                    color="primary"
                    aria-label="add"
                    sx={{
                        position: "absolute",
                        bottom: "16px",
                        left: "16px",
                        bgcolor: "primary.main",
                        border: "1px solid white",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        opacity: 0.01
                    }}
                    size="small"
                    onClick={handleClick}
                >
                    <RadioButtonUnchecked sx={{ color: "common.white", fontSize: "1.75rem" }} />
                </Fab>
            </Container>
        </Box>
    );
}