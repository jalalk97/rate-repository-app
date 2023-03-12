import { useQuery } from "@apollo/client";
import { ALL_REPOSITORIES } from "../graphql/queries";

import {
  RepositoriesInput,
  RepositoriesResponse,
  SortingPrinciple,
} from "../types";

const useRepositories = (
  { orderBy, orderDirection }: SortingPrinciple,
  searchKeyword: string
) => {
  const { data, loading, error, refetch } = useQuery<
    RepositoriesResponse,
    RepositoriesInput
  >(ALL_REPOSITORIES, {
    variables: { orderBy, orderDirection, searchKeyword },
    fetchPolicy: "cache-and-network",
  });

  return { data, loading, error, refetch };
};

export default useRepositories;
