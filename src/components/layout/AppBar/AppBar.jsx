// MUI components
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';


// react imports
import { useEffect, useState } from 'react';

// RRD
import { Link, useLocation } from 'react-router-dom';

// styles
const useStyles = makeStyles({
    a: {
        color: "inherit",
        transition: 'all 0.3s',
        '&:hover': {
            color: 'gray !important'
        },
        '&:visited': {
            color: 'inherit'
        }
    }
});



const drawerWidth = 240;
// const navItems = ['home', 'writers', 'about'];

function DrawerAppBar(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    const classes = useStyles();
    const location = useLocation();
    const [navItems, setNavItems] = useState(['home', 'writer', 'about']);


    const isWritersPage = location.pathname === '/writer';
    const isAboutPage = location.pathname === '/about';

    const handleRouteChange = () => {
        !isAboutPage && !isWritersPage ? setNavItems(['writer', 'about']) : setNavItems(['home', 'writer', 'about']);
    }

    useEffect( () => {
        handleRouteChange();
    }, [location]);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };


    const container = window !== undefined ? () => window().document.body : undefined;

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }} >
        <Typography variant="h6" sx={{ my: 2 }}>
            n.n.
        </Typography>
        <Divider />
        <List>
            {navItems.map((item) => (
                <ListItem key={item} disablePadding>
                    <ListItemButton sx={{ textAlign: 'center' }}>
                        <Link
                            key={item}
                            to={`/${item}`}
                            style={{ color: 'inherit', textDecoration: 'none' }}
                            className={classes.a}
                        >
                            {item}
                        </Link>
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
        </Box>
    );



    return (
        <Box sx={{ display: 'flex' }} mb={12}>
            <CssBaseline />

            <AppBar component="nav">
                <Toolbar sx={{ height: "8vh" }}>
                    <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                        <Typography variant="h6" component="div" sx={{ mr: 2, fontSize: "0.8rem" }}>
                            {
                                isWritersPage ? (<Link to="/" style={{color: "inherit", textDecoration: "none"}}>n.n./ writer</Link>) : (
                                    isAboutPage ? (<Link to="/" style={{color: "inherit", textDecoration: "none"}}>n.n./ about</Link>) : <Link to="/" style={{color: "inherit", textDecoration: "none"}}>night notes</Link>
                                )
                            }
                        </Typography>
                    </Box>

                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ marginLeft: 'auto', display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, textDecoration: "none" }}
                        >
                            {
                                isWritersPage ? (<Link to="/" style={{color: "inherit", textDecoration: "none"}}>n.n./ writer</Link>) : (
                                    isAboutPage ? (<Link to="/" style={{color: "inherit", textDecoration: "none"}}>n.n./ about</Link>) : <Link to="/" style={{color: "inherit", textDecoration: "none"}}>night notes</Link>
                                )
                            }
                    </Typography>

                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {navItems.map((item) => (
                            <Link key={item} to={`/${item}`} style={{ color: 'inherit', textDecoration: 'none', margin: '0 10px' }} className={classes.a}>
                                {item}
                            </Link>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>

            <Box component="nav">
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    anchor="right"
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                            backgroundColor: "#0B2027"
                        },
                    }}
                    >
                        {drawer}
                </Drawer>
            </Box>

        </Box>
    );
}


export default DrawerAppBar;