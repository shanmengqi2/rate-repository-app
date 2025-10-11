import { FlatList } from "react-native";
import { useParams } from "react-router-native";
import { useRepository } from "../hooks/useRepository";
import { View } from "react-native";
import Text from "./Text";
import theme from "src/theme";
import RepositoryItemTemp from "./RepositoryItemTemp";
import { StyleSheet } from "react-native";
import { format } from "date-fns";

// const RepositoryInfo = ({ repository }) => {
//   // Repository's information implemented in the previous exercise
// };
const styles = StyleSheet.create({
  ReviewItem: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 15,
    gap: 10,
    backgroundColor: "#FFF",
  },
  ReviewItemInfo: {
    flexDirection: "column",
    flex: 1,
    flexShrink: 1,
    gap: 5,
  },
  Score: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItem = ({ review }) => {
  // Single review item
  console.log("ReviewItem11111111111111111111", review);
  return (
    <View style={styles.ReviewItem}>
      <View style={styles.Score}>
        <Text fontWeight="bold" color="primary" fontSize="subheading">
          {review.node.rating}
        </Text>
      </View>
      <View style={styles.ReviewItemInfo}>
        <Text fontWeight="bold" fontSize="subheading">
          {review.node.user.username}
        </Text>
        <Text color="textSecondary">
          {format(review.node.createdAt, "yyyy-MM-dd")}
        </Text>
        <Text style={{ marginTop: 5 }}>{review.node.text}</Text>
      </View>
    </View>
  );
};

const SingleRepository = () => {
  const params = useParams();
  const { id } = params;
  console.log("ididididididiididididi", id);
  const { repository, loading, error } = useRepository(id || null);

  console.log("repositoryyyyyyyyyyy", repository);
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
  if (!repository) {
    console.log("No item data available, returning null");
    return null;
  }

  return (
    <FlatList
      data={repository.reviews.edges}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ node }) => node.id}
      ListHeaderComponent={() => <RepositoryItemTemp repository={repository} />}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default SingleRepository;
