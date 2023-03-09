import { useQuery } from "@apollo/client";
import { ALL_REPOSITORIES } from "../graphql/queries";

import { RepositoriesResponse } from "../types";

const useRepositories = () => {
  const { data, loading, error, refetch } = useQuery<RepositoriesResponse>(
    ALL_REPOSITORIES,
    {
      fetchPolicy: "cache-and-network",
    }
  );

  return { data, loading, error, refetch };
};

export default useRepositories;
