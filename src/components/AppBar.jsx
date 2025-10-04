import Text from "./Text";
import { TouchableOpacity } from "react-native";

import { Link } from "react-router-native";
import { ScrollView } from "react-native";

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "flex-start",
//     paddingTop: 22,
//     paddingLeft: 10,
//     paddingRight: 10,
//     paddingBottom: 22,
//     gap: 20,
//     backgroundColor: "#24292e",
//     borderBottomWidth: StyleSheet.hairlineWidth,
//     borderBottomColor: "#ccc",
//     opacity: 0.9,
//   },
// });

const AppBar = () => {
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
      <TouchableOpacity onPress={() => {}}>
        <Link to="/signin">
          <Text color="white" fontWeight="bold">
            SignIn
          </Text>
        </Link>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {}}>
        <Text color="white" fontWeight="bold">
          Create a Review
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {}}>
        <Text color="white" fontWeight="bold">
          Sign Out
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AppBar;
