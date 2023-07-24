// hooks & functions
import { GET_POST } from "../graphql/query";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { useRefreshTitle } from "../hooks/useRefreshTitle";
import { useEffect } from "react";
import formatDate from "../services/formatDate";

// components
import Loading from "../components/Loading/Loading";
import { Container, Grid, Typography } from "@mui/material";
import CommentForm from "../components/CommentForm/CommentForm"
import { ToastContainer, Flip } from 'react-toastify';

// image styles
import styles from "./styles/blog.module.scss";
import Comments from "../components/Comments/Comments";



// blogs page
function BlogsPage() {
    const { postSlug } = useParams();
    const [title, setTitle] = useRefreshTitle();

    const { loading, error, data } = useQuery(GET_POST, {
        variables: { postSlug },
    });

    let { post = {} } = data || {};



    useEffect(() => {
        if (!loading && data?.post?.title) {
            setTitle(post.title);
        }
    }, [loading]);


    return (
        <div>

            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar
                newestOnTop
                closeOnClick={true}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Flip}
            />

            {loading && <Loading />}
            {error && (
                <>
                    <p>Something went wrong...</p>
                    <br /> <p>Try refreshing the page.</p>
                </>
            )}
                {
                    !loading && (
                        <Container maxWidth="lg">
                            <Grid
                                container
                                className={styles.container} 
                                mt={15}
                            >
                                <Grid
                                    item
                                     xs={12}
                                     className={styles.show_up}
                                >
                                    <img src={post.coverPhoto.url} alt="posts cover photo" width="100%" style={{borderRadius: "2px", maxWidth: "100%"}} className={styles.image}/>
                                </Grid>

                                <Grid
                                    item
                                    xs={12}
                                    display="flex"
                                    justifyContent="start"
                                    paddingX={3}
                                    paddingTop={3}
                                >
                                    <Typography
                                            component="h2"
                                            variant="h4"
                                            color="text.primary"
                                            fontWeight={500}
                                            sx={{
                                                fontSize: "calc(1rem + 0.5vh + 1vmin)",
                                            }}
                                        >
                                        {post.title}
                                    </Typography>
                                </Grid>

                                <Grid
                                    item
                                    xs={12}
                                    display="flex"
                                    justifyContent="end"
                                    alignItems="end"
                                    flexDirection="column"
                                    paddingX={3}
                                    paddingBottom={3}
                                    mt={3}
                                >
                                    <Typography
                                            display="inline"
                                            component="h2"
                                            variant="h4"
                                            color="text.primary"
                                            fontWeight={300}
                                            sx={{
                                                fontSize: "calc(0.75rem + 0.25vh + 0.25vmin)",
                                            }}
                                        >
                                        by {post.author.name}
                                    </Typography>
                                    <Typography
                                            display="inline"
                                            component="h2"
                                            variant="h4"
                                            color="text.primary"
                                            fontWeight={300}
                                            sx={{
                                                fontSize: "calc(0.75rem + 0.25vh + 0.25vmin)",
                                            }}
                                        >
                                        on {formatDate(post.datePublished)}
                                    </Typography>
                                </Grid>

                                <Grid
                                    item
                                    xs={12}
                                    mt={5}
                                    padding={5}
                                    border="1px rgb(60, 60, 60) solid"
                                    borderRadius={1}
                                    mb={20}
                                >
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: post.content.html
                                        }}
                                    >
                                    </div>
                                </Grid>

                                <Grid
                                    item
                                    xs={12}
                                >
                                    <CommentForm postSlug={post.postSlug}/>
                                </Grid>

                                <Grid
                                    item
                                    xs={12}
                                    mt={20}
                                >
                                    <Comments postSlug={post.postSlug}/>
                                </Grid>


                            </Grid>
                        </Container>
                    )
                }
        </div>
    );
}

export default BlogsPage;