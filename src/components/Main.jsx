import { StyleSheet, View, StatusBar } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import AppBar from "./AppBar";
import RepositoryList from "./RepositoryList";
import { Route, Routes, Navigate } from "react-router-native";
import SignIn from "./SignIn";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: "#e1e4e8",
  },
  appBarContainer: {
    backgroundColor: "#24292e",
  },
});

const Main = () => {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.container} edges={["left", "right", "bottom"]}>
      <StatusBar barStyle="light-content" />
      <View style={[styles.appBarContainer, { paddingTop: insets.top }]}>
        <AppBar />
      </View>
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {/* <View style={styles.container}>
        <Text>Rate Repository Application</Text>
      </View> */}
      {/* <RepositoryList />*/}
    </SafeAreaView>
  );
};

export default Main;
