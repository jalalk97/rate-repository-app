import { SortingPrinciple } from "../types";

export const CREATED_AT_DESC: SortingPrinciple = {
  orderBy: "CREATED_AT",
  orderDirection: "DESC",
};

export const RATING_AVERAGE_DESC: SortingPrinciple = {
  orderBy: "RATING_AVERAGE",
  orderDirection: "DESC",
};

export const RATING_AVERAGE_ASC: SortingPrinciple = {
  orderBy: "RATING_AVERAGE",
  orderDirection: "ASC",
};
