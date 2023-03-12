import { useQuery } from "@apollo/client";
import { ALL_REPOSITORIES } from "../graphql/queries";

import { RepositoriesResponse, SortingPrinciple } from "../types";

const useRepositories = ({ orderBy, orderDirection }: SortingPrinciple) => {
  const { data, loading, error, refetch } = useQuery<
    RepositoriesResponse,
    SortingPrinciple
  >(ALL_REPOSITORIES, {
    variables: { orderBy, orderDirection },
    fetchPolicy: "cache-and-network",
  });

  return { data, loading, error, refetch };
};

export default useRepositories;
