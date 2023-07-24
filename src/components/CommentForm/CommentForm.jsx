// MUI
import { Grid, Typography, TextField, Button } from '@mui/material'

//styles
import 'react-toastify/dist/ReactToastify.css';



// GQL
import { SEND_COMMENT } from '../../graphql/mutation';


// hooks & funcs
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import validator from 'validator'
import { warning_toast, error_toast } from '../../services/toastFuncs';


// style object
const boxShadow = {
    boxShadow:
        `
            0px 2.8px 9.5px rgba(0, 0, 0, 0.031),
            0px 6.7px 22.8px rgba(0, 0, 0, 0.044),
            0px 12.5px 42.9px rgba(0, 0, 0, 0.055),
            0px 22.3px 76.6px rgba(0, 0, 0, 0.066),
            0px 41.8px 143.3px rgba(0, 0, 0, 0.079),
            0px 100px 343px rgba(0, 0, 0, 0.11);
        `
}




// comment form
function CommentForm({ postSlug }) {
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userText, setUserText] = useState("");
    const [sent, setSent] = useState(false);

    const currentDateRaw = new Date();
    const currentDate = currentDateRaw.toISOString();


    const [ sendComment, {loading, error, data} ] = useMutation(SEND_COMMENT, {
        variables: {
            postSlug: postSlug,
            authorName: userName,
            authorEmail: userEmail,
            content: userText,
            dateAndTime: currentDate,
            createdAt: currentDate
        }
    })



    const handleSendComment = () => {
        if (userName && userEmail && userText) {
            if (validator.isEmail(userEmail)) {
                setSent(true);
                sendComment();
            } else {
                warning_toast("fill your info right...");
            }
        } else {
            error_toast("fill your info...");
        }
    }




    return (
        <Grid
            container
            sx={{
                boxShadow: boxShadow,
                border: "1px rgb(60, 60, 60) solid",
                borderRadius: "4px",
                backgroundColor: "rgb(72, 72, 72)",
            }}
        >
            <Grid
                item
                xs={12}
                padding={4}
                marginY={2}
            >
                <Typography component="p" variant='h6' fontWeight={500} fontSize="1.25rem" >a comment?</Typography>
            </Grid>

            <Grid
                item
                xs={12}
                paddingX={6}
                mb={6}
            >
                <TextField
                    id="nameInput"
                    label="name" 
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    value={userName}
                    onChange={ (e) => setUserName(e.target.value) }
                    required
                />
            </Grid>

            <Grid
                item
                xs={12}
                paddingX={6}
                mb={6}
            >
                <TextField
                    id="nameInput"
                    label="email"
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    value={userEmail}
                    onChange={ (e) => setUserEmail(e.target.value) }
                    required
                />
            </Grid>

            <Grid
                item
                xs={12}
                paddingX={6}
                mb={6}
            >
                <TextField
                    id="nameInput"
                    label="your comment"
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    multiline={true}
                    minRows={3}
                    value={userText}
                    onChange={ (e) => setUserText(e.target.value) }
                    required
                />
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
                    flexDirection: "column"
                }}
            >
                <Button
                    variant="contained"
                    size="large"
                    sx={{
                        textTransform: "none"
                    }}
                    onClick={ handleSendComment }
                    disabled={ sent ? true : false }
                >
                    {
                        (sent) ?
                            loading ? "posting..." :  "posted" : 
                        "post comment"
                    }
                 </Button>
            </Grid>

        </Grid>
    )
}

export default CommentForm