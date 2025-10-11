import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";
import { useApolloClient } from "@apollo/client";
import useAuthStorage from "./useAuthStorage";

const useCreateView = () => {
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  const [mutate, result] = useMutation(CREATE_REVIEW, {
    onCompleted: (data) => {
      console.log("View created:", data.createView);
      apolloClient.resetStore();
    },
    onError: (error) => {
      console.error("Error creating view:", error);
    },
  });

  const createReview = async (review) => {
    try {
      // console.log("review!!!!!!", review);
      const token = await authStorage.getAccessToken();
      const { data } = await mutate({
        variables: { review },
        context: {
          headers: {
            authorization: token ? `Bearer ${token}` : "",
          },
        },
      });
      // console.log("review data!!!!!!!!!!!!", data);
      return data.createReview;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return [createReview, result];
};

export default useCreateView;
