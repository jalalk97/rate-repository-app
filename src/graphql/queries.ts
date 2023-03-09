import { gql } from "@apollo/client";

export const ALL_REPOSITORIES = gql`
  query AllRepositories {
    repositories {
      edges {
        node {
          id
          description
          forksCount
          fullName
          language
          ownerAvatarUrl
          ratingAverage
          reviewCount
          stargazersCount
        }
      }
    }
  }
`;

export const CURRENT_USER = gql`
  query CurrentUser {
    me {
      id
      username
    }
  }
`;
