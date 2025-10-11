import Text from "./Text";
import { TouchableOpacity } from "react-native";

import { Link, useNavigate } from "react-router-native";
import { ScrollView } from "react-native";
import { useQuery } from "@apollo/client";
import { useApolloClient } from "@apollo/client";
import useAuthStorage from "../hooks/useAuthStorage";

import { ME } from "../graphql/queries";

const AppBar = () => {
  const { data } = useQuery(ME, {
    fetchPolicy: "cache-and-network",
    errorPolicy: "ignore",
  });
  console.log("data in AppBar", data);
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await authStorage.removeAccessToken();
      // Write null to ME query cache before clearing
      apolloClient.writeQuery({
        query: ME,
        data: { me: null },
      });
      await apolloClient.clearStore();
      navigate("/signin");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <ScrollView
      horizontal
      style={{
        paddingTop: 22,
        paddingLeft: 12,
        paddingRight: 10,
        paddingBottom: 22,
        backgroundColor: "#24292e",
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        opacity: 0.9,
      }}
      contentContainerStyle={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 20,
      }}
    >
      <TouchableOpacity onPress={() => {}}>
        <Link to="/repositories">
          <Text color="white" fontWeight="bold">
            Repositories
          </Text>
        </Link>
      </TouchableOpacity>
      {!data?.me && (
        <TouchableOpacity onPress={() => {}}>
          <Link to="/signin">
            <Text color="white" fontWeight="bold">
              SignIn
            </Text>
          </Link>
        </TouchableOpacity>
      )}
      {!data?.me && (
        <TouchableOpacity onPress={() => {}}>
          <Link to="/signup">
            <Text color="white" fontWeight="bold">
              SignUp
            </Text>
          </Link>
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={() => {}}>
        <Link to="/reviewForm">
          <Text color="white" fontWeight="bold">
            Create a Review
          </Text>
        </Link>
      </TouchableOpacity>
      {data?.me && (
        <TouchableOpacity
          onPress={() => {
            handleSignOut();
          }}
        >
          <Text color="white" fontWeight="bold">
            Sign Out
          </Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

export default AppBar;
