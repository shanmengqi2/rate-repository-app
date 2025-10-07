import { Image, StyleSheet } from "react-native";
import { View } from "react-native";
import Text from "./Text";
import theme from "../theme";
import { TouchableOpacity } from "react-native";
import * as Linking from "expo-linking";
import { useParams } from "react-router-native";
import { useRepository } from "../hooks/useRepository";

const RepositoryItem = ({ item: propItem, hasGithub = false }) => {
  const params = useParams();
  const { id } = params;

  // console.log("=== RepositoryItem Debug ===");
  // console.log("params:", params);
  // console.log("id from params:", id);
  // console.log("propItem:", propItem);

  const { repository, loading, error } = useRepository(id || null);

  // console.log("repository from hook:", repository);
  // console.log("loading:", loading);
  // console.log("error:", error);
  // console.log("=== End Debug ===");

  // Determine which item to use
  const item = id ? repository : propItem;

  const openInGithub = (url) => {
    Linking.openURL(url);
  };

  // If we're loading data based on id, show loading state
  if (id && loading) {
    return (
      <View style={theme.repositoryItem}>
        <Text>Loading repository...</Text>
      </View>
    );
  }

  // If there was an error loading
  if (id && error) {
    console.error("Error loading repository:", error);
    return (
      <View style={theme.repositoryItem}>
        <Text>Error loading repository: {error.message}</Text>
      </View>
    );
  }

  // If no item data is available, return null
  if (!item) {
    console.log("No item data available, returning null");
    return null;
  }

  return (
    <View testID="repositoryItem" style={theme.repositoryItem}>
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
      {hasGithub && (
        <View style={styles.openInGithub}>
          <TouchableOpacity onPress={() => openInGithub(item.url)}>
            <Text
              color="white"
              fontWeight="bold"
              fontSize="subheading"
              style={{ textAlign: "center" }}
            >
              Open in Github
            </Text>
          </TouchableOpacity>
        </View>
      )}
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
    width: "85%",
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
  openInGithub: {
    width: "100%",
    paddingVertical: 15,
    backgroundColor: "#0366d6",
    borderRadius: 5,
  },
});

export default RepositoryItem;
