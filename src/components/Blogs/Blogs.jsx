import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../../graphql/query";
import { Grid } from "@mui/material";

import SingleBlog from "./SingleBlog";
import Loading from "../Loading/Loading";


function Blogs() {
    const {loading, error, data} = useQuery(GET_POSTS);

    return (
        <>
        {/* hadnling different status */}
            {
                loading && (
                    <Loading />
                )
            } {
                error && <> <p>Something went wrong...</p><br /> <p>Try refreshing the page.</p> </>
            }

        {/* MUI grid */}

            <Grid
                container
                spacing={3}
                alignItems="center"
            >

                {
                    !loading && data.posts.map(post => <Grid item xs={12} sm={6} md={4} key={post.id} sx={{ height: "22vh"}}> <SingleBlog image={post.coverPhoto.url} title={post.title} postSlug={post.postSlug} author={post.author.name} date={post.datePublished} key={post.id}/> </Grid>)
                }

            </Grid>
        </>
    )
}

export default Blogs;