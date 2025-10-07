import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";

export const useRepository = (id) => {
  // console.log("useRepository hook called with id:", id);
  // console.log("useRepository - id type:", typeof id);
  // console.log("useRepository - id is truthy:", !!id);
  // console.log("useRepository - skip value:", !id);

  const { data, loading, error } = useQuery(GET_REPOSITORY, {
    variables: { repositoryId: id },
    skip: !id,
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => {
      console.log("useRepository - Query completed successfully:", data);
    },
    onError: (error) => {
      console.error("useRepository - Query error:", error);
      console.error("useRepository - Error message:", error.message);
      console.error("useRepository - Network error:", error.networkError);
      console.error("useRepository - GraphQL errors:", error.graphQLErrors);
    },
  });

  // console.log("useRepository - data:", data);
  // console.log("useRepository - loading:", loading);
  // console.log("useRepository - error:", error);

  return {
    repository: data?.repository || null,
    loading,
    error,
  };
};
