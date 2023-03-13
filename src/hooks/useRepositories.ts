import { useQuery } from "@apollo/client";
import { ALL_REPOSITORIES } from "../graphql/queries";

import { RepositoriesInput, RepositoriesResponse } from "../types";

const useRepositories = (variables: RepositoriesInput) => {
  const { data, loading, fetchMore, ...result } = useQuery<
    RepositoriesResponse,
    RepositoriesInput
  >(ALL_REPOSITORIES, {
    variables,
    fetchPolicy: "cache-and-network",
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data?.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return { data, fetchMore: handleFetchMore, loading, ...result };
};

export default useRepositories;
