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
