export interface Repository {
  id: string;
  fullName: string;
  description: string;
  language: string;
  forksCount: number;
  stargazersCount: number;
  ratingAverage: number;
  reviewCount: number;
  reviews: ReviewConnection;
  ownerAvatarUrl: string;
  url: string;
}

export interface RepositoryEdge {
  node: Repository;
  cursor: string;
}

export interface RepositoriesResponse {
  repositories: {
    edges: RepositoryEdge[];
  };
}

export interface LoginFormValues {
  username: string;
  password: string;
}

export interface AuthenticateResult {
  authenticate: {
    accessToken: string;
  };
}

export interface CurrentUserResponse {
  me: {
    id: string;
    username: string;
  };
}

export interface GetRepositoryResponse {
  repository: Repository;
}

export interface User {
  id: string;
  username: string;
}

export interface Review {
  id: string;
  createdAt: string;
  rating: number;
  text: string;
  user: User;
}

export interface ReviewEdge {
  node: Review;
  cursor: string;
}

export interface ReviewConnection {
  edges: ReviewEdge[];
}

export interface NewReviewFormValues {
  ownerName: string;
  repositoryName: string;
  rating: number;
  text: string;
}

export interface CreateReviewInput {
  review: NewReviewFormValues;
}

export interface CreateReviewResult {
  createReview: {
    repositoryId: string;
  };
}

export type AllRepositoriesOrderBy = "CREATED_AT" | "RATING_AVERAGE";

export type OrderDirection = "ASC" | "DESC";

export interface SortingPrinciple {
  orderBy: AllRepositoriesOrderBy;
  orderDirection: OrderDirection;
}

export interface RepositoriesInput extends SortingPrinciple {
  searchKeyword: string;
}
