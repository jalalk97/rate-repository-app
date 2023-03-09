export interface Repository {
  id: string;
  fullName: string;
  description: string;
  language: string;
  forksCount: number;
  stargazersCount: number;
  ratingAverage: number;
  reviewCount: number;
  ownerAvatarUrl: string;
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
