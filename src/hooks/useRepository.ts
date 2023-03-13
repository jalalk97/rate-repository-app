import { useQuery } from "@apollo/client";

import { GET_REPOSITORY } from "../graphql/queries";
import { GetRepositoryInput, GetRepositoryResponse } from "../types";

const useRepository = (variables: GetRepositoryInput) => {
  const { data, loading, fetchMore, ...result } = useQuery<
    GetRepositoryResponse,
    GetRepositoryInput
  >(GET_REPOSITORY, {
    variables,
    fetchPolicy: "cache-and-network",
  });

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data?.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return { data, loading, fetchMore: handleFetchMore, ...result };
};

export default useRepository;
