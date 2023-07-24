// hooks, functions
import { useState } from "react";
import { useSetTitle } from "../hooks/useRefreshTitle";

// MUI components
import { Box, Input } from "@mui/material";
import ZenWrite from "../components/ZenWrite/ZenWrite";

// components

// styles



// zen component
const Zen = () => {
    useSetTitle("ensō")
    const [value, setValue] = useState("");
    const [allow, setAllow] = useState(false);

    if (value === "mu") {
        setValue("");
        setAllow(true);
    }

    return (
        <>
            {
                !allow ? (
                    <Box component="div"  sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "92vh",
                    }}>
                        <form>
                            <Input type="password" value={value} onChange={ (e) => setValue(e.target.value) } placeholder="Speak, dharma" />
                        </form>
                    </Box>
                ) : (

                    <ZenWrite />

                )
            }
        </>
    );
};

export default Zen;