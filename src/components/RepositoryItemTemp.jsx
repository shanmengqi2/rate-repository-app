import { Image, StyleSheet } from "react-native";
import { View } from "react-native";
import Text from "./Text";
import theme from "../theme";
import { TouchableOpacity } from "react-native";
import * as Linking from "expo-linking";

const RepositoryItem = ({ repository }) => {
  const openInGithub = (url) => {
    Linking.openURL(url);
  };

  // If no item data is available, return null
  if (!repository) {
    console.log("No item data available, returning null");
    return null;
  }

  return (
    <View testID="repositoryItem" style={theme.repositoryItem}>
      <View style={styles.avatarName}>
        <Image
          source={{ uri: repository.ownerAvatarUrl }}
          style={styles.avatar}
        />
        <View style={styles.nameDescription}>
          <Text style={styles.name}>{repository.fullName}</Text>
          <Text style={styles.description}>{repository.description}</Text>
          <Text style={styles.language}>{repository.language}</Text>
        </View>
      </View>

      <View className="statistics" style={styles.statistics}>
        <View className="statItemGroup" style={styles.statItemGroup}>
          <Text fontWeight="bold">
            {repository.stargazersCount > 1000
              ? (repository.stargazersCount / 1000).toFixed(1) + "k"
              : repository.stargazersCount}
          </Text>
          <Text color="textSecondary">Stars</Text>
        </View>
        <View className="statItemGroup" style={styles.statItemGroup}>
          <Text fontWeight="bold">
            {repository.forksCount > 1000
              ? (repository.forksCount / 1000).toFixed(1) + "k"
              : repository.forksCount}
          </Text>
          <Text color="textSecondary">Forks</Text>
        </View>
        <View className="statItemGroup" style={styles.statItemGroup}>
          <Text fontWeight="bold">
            {repository.reviewCount > 1000
              ? (repository.reviewCount / 1000).toFixed(1) + "k"
              : repository.reviewCount}
          </Text>
          <Text color="textSecondary">Reviews</Text>
        </View>
        <View className="statItemGroup" style={styles.statItemGroup}>
          <Text fontWeight="bold">{repository.ratingAverage}</Text>
          <Text color="textSecondary">Rating</Text>
        </View>
      </View>

      <View style={styles.openInGithub}>
        <TouchableOpacity onPress={() => openInGithub(repository.url)}>
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
