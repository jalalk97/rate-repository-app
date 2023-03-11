import { useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-native";
import { GET_REPOSITORY } from "../graphql/queries";
import { GetRepositoryResponse } from "../types";
import RepositoryItem from "./RepositoryItem";

const SingleRepository = () => {
  const { id } = useParams();
  const { data } = useQuery<GetRepositoryResponse>(GET_REPOSITORY, {
    variables: { repositoryId: id },
  });

  if (!data) {
    return null;
  }

  return <RepositoryItem repository={data.repository} showButton />;
};

export default SingleRepository;
