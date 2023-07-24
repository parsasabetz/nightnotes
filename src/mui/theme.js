import { createTheme } from "@mui/material";


const theme = createTheme({
    typography: {
        fontFamily: `'IBM Plex Mono', monospace`,
            fontWeightThin: 100,
                fontWeightLight: 300,
                    fontWeightMedium: 500,
    },
    palette: {
        primary: {
            main: '#0B2027', // a dark blue color
        },
        secondary: {
            main: '#747C95', // a light blue/grey color
        },
        text: {
            primary: '#a9a9a9', // white text color
            secondary: '#d7d7d7', // light grey text color
        },
        background: {
            default: '#21270a', // a dark blue background color
            paper: '#0B027', // a slightly lighter blue background color
        },
    },
    breakpoints: {
        values: {
          xs: 0,
          sm: 600,
          md: 960,
          lg: 1280,
          xl: 1920,
        },
      },
});

export default theme;