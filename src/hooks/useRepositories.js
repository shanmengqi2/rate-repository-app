import { useState, useEffect } from "react";
import { GET_REPOSITORIES } from "../graphql/queries";
import { useQuery } from "@apollo/client";

const useRepositories = () => {
  const [repositories, setRepositories] = useState();
  const { data, loading, error, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    errorPolicy: "all",
    onError: (error) => {
      console.error("useRepositories - Query error:", error);
      if (error.networkError) {
        console.error("Network error details:", error.networkError);
      }
      if (error.graphQLErrors) {
        console.error("GraphQL errors:", error.graphQLErrors);
      }
    },
    onCompleted: () => {
      console.log("useRepositories - Query completed successfully");
    }
  });

  console.log("result data", data);
  console.log("loading", loading);
  console.log("error", error);

  useEffect(() => {
    // 等待数据加载完成后再设置 repositories
    if (!loading && data && data.repositories) {
      console.log("Setting repositories", data.repositories);
      setRepositories(data.repositories);
    }
  }, [data, loading]);

  return { repositories, loading, error, refetch };
};

export default useRepositories;
