import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import BookIcon from '@mui/icons-material/Book';


function Header() {
    return (
        <AppBar position="sticky" color="primary">
            <Container maxWidth="lg">
                <Toolbar>
                    <Typography component="h1" variant="h5" fontWeight="medium" flex={1}> Night Notes </Typography>
                    <BookIcon/>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Header;