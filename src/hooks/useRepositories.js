import { useState, useEffect } from "react";
import { GET_REPOSITORIES } from "../graphql/queries";
import { useQuery } from "@apollo/client";

const useRepositories = () => {
  const [repositories, setRepositories] = useState();
  const { data, loading, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    // Other options
  });

  console.log("result data", data);
  console.log("loading", loading);

  useEffect(() => {
    // 等待数据加载完成后再设置 repositories
    if (!loading && data && data.repositories) {
      console.log("Setting repositories", data.repositories);
      setRepositories(data.repositories);
    }
  }, [data, loading]);

  return { repositories, loading, refetch };
};

export default useRepositories;
