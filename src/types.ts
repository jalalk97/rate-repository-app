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

export interface RespositoryConnection {
  edges: RepositoryEdge[];
  pageInfo: PageInfo;
}

export interface RepositoriesResponse {
  repositories: RespositoryConnection;
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
  me: User;
}

export interface GetRepositoryResponse {
  repository: Repository;
}

export interface GetRepositoryInput {
  repositoryId: string;
  after?: string;
  first?: number;
}

export interface User {
  id: string;
  username: string;
  reviews: ReviewConnection;
}

export interface Review {
  id: string;
  createdAt: string;
  rating: number;
  text: string;
  user: User;
  repository: Repository;
}

export interface ReviewEdge {
  node: Review;
  cursor: string;
}

export interface ReviewConnection {
  edges: ReviewEdge[];
  pageInfo: PageInfo;
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

export interface RepositoriesInput {
  after?: string;
  first?: number;
  orderBy?: AllRepositoriesOrderBy;
  orderDirection?: OrderDirection;
  searchKeyword?: string;
}

export interface CurrentUserInput {
  includeReviews: boolean;
}

export interface PageInfo {
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  startCursor: string;
  endCursor: string;
}
