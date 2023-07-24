// hooks and functions
import { useQuery } from "@apollo/client"
import { GET_COMMENTS } from "../../graphql/query"
import formatDate from "../../services/formatDate";

// MUI components
import { Box, Grid, Typography } from "@mui/material";

// components
import Loading from "../Loading/Loading";

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



// comments component
function Comments({ postSlug }) {

    const { loading, error, data } = useQuery(GET_COMMENTS, {
        variables: { postSlug }
    });

    let { comments = {} } = data || {};

    return (
        <div>

            {loading && <Loading />}
            {error && (
                <>
                    <p>Something went wrong...</p>
                    <br /> <p>Try refreshing the page.</p>
                </>
            )}
            {
                !loading && (
                    <Grid
                        container
                        sx={{
                            boxShadow: boxShadow,
                            border: "1px rgb(60, 60, 60) solid",
                            borderRadius: "4px", 
                        }}
                    >
                        <Grid
                            item
                            xs={12}
                            padding={4}
                            marginY={2}
                        >
                            <Typography
                                component="p"
                                variant="h6"
                                fontWeight={500}
                                fontSize="1.25rem"
                            >
                                {
                                    Object.values(comments).length ? "comments:" : "no comments yet..."
                                }
                            </Typography>
                        </Grid>
                        {
                            comments.map(
                                comment => <Grid
                                                item
                                                xs={12}
                                                key={comment.id}
                                                m={2}
                                                p={2}
                                                sx={{
                                                    borderRadius: "4px",
                                                    border: "1px rgb(60, 60, 60) solid",
                                                    borderRadius: "4px", 
                                                }}
                                                >
                                                    <Box component="div" display="flex" flexDirection="column">
                                                        <Grid item padding={2}>
                                                            <Typography fontWeight={800}> {comment.authorName} </Typography>
                                                            <Typography fontWeight={300} fontStyle="italic" fontSize="smaller"> on { formatDate(comment.dateAndTime) } </Typography>
                                                        </Grid>

                                                        <Typography component="p" variant="p" p={4}>
                                                            {comment.content}
                                                        </Typography>
                                                    </Box>
                                           </Grid>
                                )
                        }
                    </Grid>
                )
            }
        </div>
    )
}

export default Comments