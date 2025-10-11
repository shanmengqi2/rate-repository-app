import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          description
          fullName
          ownerAvatarUrl
          language
          stargazersCount
          forksCount
          ratingAverage
          reviewCount
          id
          url
        }
        cursor
      }
    }
  }
`;

// other queries...
export const SIGN_IN = gql`
  mutation SignIn($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
      accessToken
      expiresAt
    }
  }
`;

export const ME = gql`
  query {
    me {
      id
      username
    }
  }
`;

export const GET_REPOSITORY = gql`
  query GetRepository($repositoryId: ID!) {
    repository(id: $repositoryId) {
      id
      fullName
      url
      description
      ownerAvatarUrl
      language
      stargazersCount
      forksCount
      reviewCount
      ratingAverage
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;

export const GET_USER_REPOSITORIES = gql`
  query GetUserRepositories($username: String!) {
    user(username: $username) {
      repositories {
        edges {
          node {
            id
            fullName
            url
            description
            ownerAvatarUrl
            language
            stargazersCount
            forksCount
            reviewCount
            ratingAverage
          }
        }
      }
    }
  }
`;

export const GET_USER_REVIEWS = gql`
  query GetUserReviews($username: String!) {
    user(username: $username) {
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            repository {
              id
              fullName
              url
            }
          }
        }
      }
    }
  }
`;
