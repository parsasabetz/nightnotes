import { gql } from "@apollo/client";

// all authors
const GET_AUTHORS = gql`
    query {
        authors {
            id
            name
            age
            authorSlug
            dateJoined
            avatar {
                url
            }
        }
    }
`;

const GET_AUTHOR = gql`
    query ($authorsSlug: String!) {
        author(where: {authorSlug: $authorsSlug}) {
            id
            authorSlug
            name
            age
            career
            dateJoined
            description
            avatar {
                url
            }
        }
    }
`;



// all posts 
/*
    posts: id, title, postSlug, datePublished, url for coverPhoto
    author: name, url for avatar
*/
const GET_POSTS = gql`
    query {
        posts {
            id
            title
            postSlug
            datePublished
            coverPhoto {
                url
            }

            author {
                id
                name
                avatar {
                    url
                }
            }
        }
    }
`;


const GET_POST = gql`
    query ($postSlug: String!) {
        post(where: {postSlug: $postSlug}) {
            id
            postSlug
            title
            datePublished
            coverPhoto {
                url
            }
            author {
                name
            }
            content {
                html
            }
            comments {
                id
                content
                authorName
                dateAndTime
            }
        }
    }
`;


const GET_COMMENTS = gql`
    query getComments($postSlug: String!){
        comments(where: {post: {postSlug: $postSlug}}) {
            id
            authorName
            content
            dateAndTime
            post {
                postSlug
            }
        }
    }
`;



export {
    GET_AUTHORS,
    GET_POSTS,
    GET_AUTHOR,
    GET_POST,
    GET_COMMENTS,
};