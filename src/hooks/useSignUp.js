import { useMutation } from "@apollo/client";
import { SIGNUP } from "../graphql/mutations";
// import { useApolloClient } from "@apollo/client";
import useSignIn from "./useSignIn";
import { useNavigate } from "react-router-native";

const useSignUp = () => {
  // const apolloClient = useApolloClient();
  const navigate = useNavigate();
  const [signIn] = useSignIn();
  const [mutate, result] = useMutation(SIGNUP, {
    onCompleted: (data) => {
      console.log("User signed up:", data.createUser);
      // apolloClient.resetStore();
    },
    onError: (error) => {
      console.error("Error signing up:", error);
      console.error("Network error:", error.networkError);
      console.error("GraphQL errors:", error.graphQLErrors);
      if (error.networkError && error.networkError.result) {
        console.error("Network error result:", error.networkError.result);
      }
    },
  });

  const signUp = async ({ username, password }) => {
    // console.log("before signUp", username, password); // ok
    const variables = { user: { username: username, password: password } };
    // console.log("Mutation variables:", JSON.stringify(variables, null, 2));
    try {
      await mutate({
        variables,
      });
      await signIn({ username, password });
      navigate("/");
    } catch (error) {
      console.error("Error signing up:", error);
      console.error("Error message:", error.message);
      if (error.networkError) {
        console.error("Network error details:", error.networkError);
        if (error.networkError.result) {
          console.error("Network error result:", error.networkError.result);
        }
      }
      if (error.graphQLErrors) {
        console.error("GraphQL errors:", error.graphQLErrors);
      }
      throw error; // 重新抛出错误以便上层处理
    }
  };

  return [signUp, result];
};

export default useSignUp;
