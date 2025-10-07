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
    }
  }
`;
