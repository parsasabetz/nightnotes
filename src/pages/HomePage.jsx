import { Container, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import Blogs from "../components/Blogs/Blogs";
import { makeStyles } from "@mui/styles";


const useStyles = makeStyles({
    a: {
        color: "inherit",
        transition: 'all 0.3s',
        '&:hover': {
            color: 'gray !important'
        },
    }
});


function HomePage() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const classes = useStyles();


    return (
        <Container maxWidth="lg" sx={{ position: "relative", height: "100%" }}>
            {isMobile ? (
                // Vertical layout for mobile
                <Grid
                    container
                    padding={3}
                    direction="column"
                >

                    <Grid item xs={12}>
                        <Typography component="h3" variant="h4" mb={3} fontWeight={600} fontSize="1.5rem">
                            night notes is a blog for the nights, that is all it is.
                        </Typography>
                        <Typography component="h4" variant="h5" mb={3} fontWeight={400} fontSize="1rem">
                            created by <Link to="/writer" style={{color: "inherit"}} className={classes.a}>parsa sabet</Link>.
                        </Typography>
                    </Grid>

                    <Grid item xs={12} mt={4} sx={{ display: "flex", flexDirection: "column-reverse", justifyContent: "center", alignItems: "center" }}>
                        <Blogs />
                    </Grid>

                </Grid>
            ) : (
                // Horizontal layout for larger screens
                <Grid
                    container
                    padding={3}
                    mt={8}
                    direction="row"
                >

                    <Grid item xs={12} md={9} padding={3}>
                        <Blogs />
                    </Grid>

                    <Grid item xs={12} md={3} paddingY="20%" paddingX={3}>
                        <Typography component="h3" variant="h4" mb={3} fontWeight={600} fontSize="calc(2vw + 0.1rem)">
                            night notes is a blog for the nights, that is all it is.
                        </Typography>
                        <Typography component="h4" variant="h5" mb={3} fontWeight={400} fontSize="calc(1.25vw + 0.15rem)">
                            created by <Link to="/writer" style={{color: "inherit"}} className={classes.a}>parsa sabet</Link>.
                        </Typography>
                    </Grid>

                </Grid>
            )}
        </Container>
    );
}

export default HomePage;