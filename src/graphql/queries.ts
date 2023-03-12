import { gql } from "@apollo/client";

export const ALL_REPOSITORIES = gql`
  query AllRepositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
  ) {
    repositories(orderBy: $orderBy, orderDirection: $orderDirection) {
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

export const GET_REPOSITORY = gql`
  query GetRepository($repositoryId: ID!) {
    repository(id: $repositoryId) {
      id
      description
      forksCount
      fullName
      language
      ownerAvatarUrl
      ratingAverage
      reviewCount
      reviews {
        edges {
          node {
            id
            createdAt
            rating
            text
            user {
              id
              username
            }
          }
          cursor
        }
      }
      stargazersCount
      url
    }
  }
`;
