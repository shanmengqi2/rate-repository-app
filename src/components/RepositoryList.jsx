import { FlatList, View, StyleSheet } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import { Link } from "react-router-native";
import { TouchableOpacity } from "react-native";
import Text from "./Text";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];
  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem item={item} />}
    />
  );
};

const RepositoryList = () => {
  const { repositories, loading, error } = useRepositories();

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading repositories...</Text>
      </View>
    );
  }

  if (error) {
    console.error("RepositoryList error:", error);
    return (
      <View style={styles.container}>
        <Text>Error loading repositories: {error.message}</Text>
        <Text>Please check if the GraphQL server is running at {process.env.APOLLO_URI || 'the configured URL'}</Text>
      </View>
    );
  }

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <TouchableOpacity>
          <Link to={`/repository/${item.id}`}>
            <RepositoryItem item={item} />
          </Link>
        </TouchableOpacity>
      )}
    />
  );
};

export default RepositoryList;
