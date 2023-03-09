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
