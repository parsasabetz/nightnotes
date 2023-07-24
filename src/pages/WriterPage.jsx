import { useQuery } from "@apollo/client"
import { GET_AUTHOR } from "../graphql/query";
import { Container, Grid, Avatar, Typography } from "@mui/material";
import formatDate from "../services/formatDate";

import Loading from "../components/Loading/Loading";
import { useSetTitle } from "../hooks/useRefreshTitle";


function WritersPage() {
    useSetTitle("writer")

    const authorsSlug = "parsasabet";

    const { loading, error, data } = useQuery(GET_AUTHOR, {
        variables: { authorsSlug }
    });



    return (
        <div style={{
            minHeight: "92vh",
        }}>
            {
                !loading && (
                    <Container maxWidth="lg" sx={{height: "70vh"}}>
                        <Grid container mt={20}>

                            <Grid item xs={12} display="flex" flexDirection="row" justifyContent="center" alignItems="center">
                                <Avatar src={data.author.avatar.url} sx={{
                                    width: "calc(15vw + 2*1vh)",
                                    height: "calc(15vw + 2*1vh)",
                                    marginRight: "5vw",
                                    border: "1.5px gray solid"
                                }}/>
                                <Grid>
                                    <Typography component="h3" variant="h7" fontWeight={500} color="rgb(187, 187, 187)">
                                        {data.author.name}, {data.author.age}
                                    </Typography>
                                    <Typography component="p" variant="h8" fontWeight={400} mt={1} color="gray">
                                        {data.author.career}
                                    </Typography>
                                    <Typography component="p" variant="h9" fontWeight={400} mt={1} color="gray">
                                        created {formatDate(data.author.dateJoined)}
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid item xs={12} mt={10} padding={5} border="1px gray solid" borderRadius={1}>
                                <Typography component="p" variant="h10" fontWeight={400} mb={1} fontStyle="italic" color="gray">
                                    about:
                                </Typography>

                                {
                                    data.author.description
                                }

                            </Grid>

                        </Grid>
                    </Container>
                )
            } {
                error && <> <p>Something went wrong...</p><br /> <p>Try refreshing the page.</p> </>
            } {
                loading && (
                    <Loading />
                )
            }
        </div>
    );
}

export default WritersPage