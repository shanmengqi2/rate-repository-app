import Text from "./Text";
import { TouchableOpacity } from "react-native";

import { Link } from "react-router-native";
import { ScrollView } from "react-native";
import { useQuery } from "@apollo/client";
import { useApolloClient } from "@apollo/client";
import useAuthStorage from "../hooks/useAuthStorage";

import { ME } from "../graphql/queries";

const AppBar = () => {
  const { data } = useQuery(ME);
  // console.log("data in AppBar", data);
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();

  const handleSignOut = () => {
    // Implement sign out logic here
    authStorage.removeAccessToken();
    apolloClient.resetStore();
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
      {!data && (
        <TouchableOpacity onPress={() => {}}>
          <Link to="/signin">
            <Text color="white" fontWeight="bold">
              SignIn
            </Text>
          </Link>
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={() => {}}>
        <Text color="white" fontWeight="bold">
          Create a Review
        </Text>
      </TouchableOpacity>
      {data && (
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
