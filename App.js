import { SafeAreaProvider } from "react-native-safe-area-context";
import Main from "./src/components/Main";
import RepositoryList from "./src/components/RepositoryList";

const App = () => {
  return (
    <SafeAreaProvider>
      <Main />
      <RepositoryList />
    </SafeAreaProvider>
  );
};

export default App;
