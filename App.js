import { SafeAreaProvider } from "react-native-safe-area-context";
import Main from "./src/components/Main";
import { NativeRouter } from "react-router-native";
import AuthStorage from "./src/utils/authStorage";
import { ApolloProvider } from "@apollo/client";
import AuthStorageContext from "./src/contexts/AuthStorageContext";
import createApolloClient from "./src/utils/apolloClient";

const authStorage = new AuthStorage();

const apolloClient = createApolloClient(authStorage);

const App = () => {
  return (
    <SafeAreaProvider>
      <NativeRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <ApolloProvider client={apolloClient}>
          <AuthStorageContext.Provider value={authStorage}>
            <Main />
          </AuthStorageContext.Provider>
        </ApolloProvider>
      </NativeRouter>
    </SafeAreaProvider>
  );
};

export default App;
