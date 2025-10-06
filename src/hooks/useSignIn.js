import { useMutation } from "@apollo/client";
import { SIGN_IN } from "../graphql/queries";
import { useApolloClient } from "@apollo/client";

import useAuthStorage from "./useAuthStorage";

const useSignIn = () => {
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  const [mutate, result] = useMutation(SIGN_IN, {
    onCompleted: (data) => {
      const { accessToken, expiresAt } = data.authenticate;
      // localStorage.setItem("accessToken", accessToken);
      // localStorage.setItem("expiresAt", expiresAt);
      authStorage.setAccessToken(accessToken);
      console.log(accessToken, expiresAt);
      apolloClient.resetStore();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const signIn = async ({ username, password }) => {
    // call the mutate function here with the right arguments
    console.log("before signIn", username, password);
    return await mutate({
      variables: { credentials: { username: username, password: password } },
    });
  };

  return [signIn, result];
};

export default useSignIn;
