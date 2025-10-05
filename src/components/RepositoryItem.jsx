import { Image, StyleSheet } from "react-native";
import { View } from "react-native";
import Text from "./Text";
import theme from "../theme";

const RepositoryItem = ({ item }) => {
  return (
    <View style={theme.repositoryItem}>
      <View style={styles.avatarName}>
        <Image source={{ uri: item.ownerAvatarUrl }} style={styles.avatar} />
        <View style={styles.nameDescription}>
          <Text style={styles.name}>{item.fullName}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.language}>{item.language}</Text>
        </View>
      </View>

      <View className="statistics" style={styles.statistics}>
        <View className="statItemGroup" style={styles.statItemGroup}>
          <Text fontWeight="bold">
            {item.stargazersCount > 1000
              ? (item.stargazersCount / 1000).toFixed(1) + "k"
              : item.stargazersCount}
          </Text>
          <Text color="textSecondary">Stars</Text>
        </View>
        <View className="statItemGroup" style={styles.statItemGroup}>
          <Text fontWeight="bold">
            {item.forksCount > 1000
              ? (item.forksCount / 1000).toFixed(1) + "k"
              : item.forksCount}
          </Text>
          <Text color="textSecondary">Forks</Text>
        </View>
        <View className="statItemGroup" style={styles.statItemGroup}>
          <Text fontWeight="bold">
            {item.reviewCount > 1000
              ? (item.reviewCount / 1000).toFixed(1) + "k"
              : item.reviewCount}
          </Text>
          <Text color="textSecondary">Reviews</Text>
        </View>
        <View className="statItemGroup" style={styles.statItemGroup}>
          <Text fontWeight="bold">{item.ratingAverage}</Text>
          <Text color="textSecondary">Rating</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  statistics: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    marginTop: 15,
  },
  statItemGroup: {
    flexDirection: "column",
    gap: 5,
    alignItems: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  avatarName: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 15,
  },
  nameDescription: {
    flexDirection: "column",
    justifyContent: "flex-end",
    // paddingRight: 25,
    width: "85%"
  },
  name: {
    fontWeight: "bold",
  },
  description: {
    color: "#737373",
    marginTop: 11,
    fontWeight: "bold",
  },
  language: {
    color: "#FFF",
    fontWeight: "bold",
    backgroundColor: "#0366d6",
    alignSelf: "flex-start",
    padding: 5,
    borderRadius: 5,
    marginTop: 10,
    overflow: "hidden",
  },
});

export default RepositoryItem;
