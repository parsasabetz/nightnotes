import { gql } from "@apollo/client";


const SEND_COMMENT = gql`

    mutation sendComment(
        $postSlug: String!
        $authorName: String!
        $authorEmail: String!
        $content: String!
        $dateAndTime: DateTime!
        $createdAt: DateTime!
    ) {
        createComment(
            data: {
                post: { connect: { postSlug: $postSlug } }
                authorName: $authorName
                authorEmail: $authorEmail
                content: $content
                dateAndTime: $dateAndTime
                createdAt: $createdAt
            }
            ) {
                id
                post {
                    postSlug
                }
                authorName
                authorEmail
                content
                dateAndTime
                createdAt
            }
    }

`;


// we disabled required for postSlug in post model to not include postSlug in here!
const SEND_POST = gql`
    mutation sendPost(
        $title: String!
        $content: RichTextAST!
        $dateAndTime: DateTime!
        $photoID: ID!
        $authorSlug: String!
    ) {
        createPost(
            data: {
                title: $title
                content: $content
                datePublished: $dateAndTime
                coverPhoto: { connect: {id: $photoID} }
                author: { connect: { authorSlug: $authorSlug } }
            }
            ) {
                id
                postSlug
                title
                datePublished
                content {
                    html
                }
                author {
                    name
                }
                coverPhoto {
                    url
                }
        }
    }
`;



export { SEND_COMMENT, SEND_POST };