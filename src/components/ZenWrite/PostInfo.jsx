// MUI
import { Grid, Typography, TextField, Button } from '@mui/material'

//styles
import 'react-toastify/dist/ReactToastify.css';


// GQL
import { SEND_POST } from '../../graphql/mutation';


// hooks & funcs
import { useState } from 'react';
import { warning_toast, error_toast } from '../../services/toastFuncs';
import { useMutation } from '@apollo/client';



// post
function PostInfo({ content, status }) {
    const [title, setTitle] = useState("");
    const [file, setFile] = useState(null);
    const [fileID, setFileID] = useState("");
    const [sent, setSent] = useState(false);

    const currentDateRaw = new Date();
    const currentDate = currentDateRaw.toISOString();
    const authorSlug = "parsasabet";

    const [sendPost, { loading, error, data }] = useMutation(SEND_POST);



    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };


    function formatString(str) {
        // Remove spaces and special characters
        const formattedStr = str.replace(/[^\w\s]/gi, "").replace(/\s+/g, "-");
        return formattedStr.toLowerCase();
    }


    const handleSendPost = async () => {
        if (!title || !content || !file) {
            warning_toast("fill your info right...");
            return;
        }

        try {
            const form = new FormData();
            form.append("fileUpload", file);

            const response = await fetch(
                `${import.meta.env.VITE_REACT_APP_HYGRAPH_ASSET_URI}`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${import.meta.env.VITE_REACT_APP_HYGRAPH_ASSET_TOKEN}`,
                    },
                    body: form,
                }
            );

            const data = await response.json();
            setFileID(data.id);



            await sendPost({
                variables: {
                    title,
                    content,
                    dateAndTime: currentDate,
                    postSlug: formatString(title),
                    photoID: data.id,
                    authorSlug,
                },
            });

            console.log("mutated.")

            setSent(true);
            status()

        } catch (err) {
            console.error(err);
            error_toast(err.message);
        }
    };




    return (
        <Grid
            container
            sx={{
                border: "1px gray solid",
                borderRadius: "4px",
            }}
        >
            <Grid item xs={12} padding={4} marginY={2}>
            <Typography
                component="p"
                variant="h6"
                fontWeight={500}
                fontSize="1.25rem"
            >
                post info:
            </Typography>
            </Grid>

            <Grid item xs={12} paddingX={6} mb={6}>
            <TextField
                id="titleInput"
                label="title"
                variant="outlined"
                color="secondary"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            </Grid>

            <Grid item xs={12} paddingX={6}>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    width: "100%",
                }}>
                    <input type="file" accept="image/*" onChange={handleFileChange} />
                </div>
            </Grid>

            <Grid
            item
            xs={12}
            paddingX={6}
            mb={6}
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
            }}
            >
            <Button
                variant="contained"
                size="large"
                sx={{
                textTransform: "none",
                }}
                onClick={handleSendPost}
                disabled={sent ? true : false}
            >
                {sent ? (loading ? "posting..." : "posted") : "post"}
            </Button>
            </Grid>
        </Grid>
    );
}

export default PostInfo;