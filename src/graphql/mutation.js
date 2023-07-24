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

export { SEND_COMMENT };