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
            main: '#0B2027',
        },
        secondary: {
            main: '#747C92',
        },
        text: {
            primary: '#CFD7C7',
        },
        background: {
            default: "#CFD7C7",
        },
    },
});

export default theme;