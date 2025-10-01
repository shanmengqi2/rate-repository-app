declare module 'eslint-plugin-react-native' {
  import { ESLint, Linter } from 'eslint';

  interface ReactNativePlugin {
    rules: Record<string, ESLint.Rule>;
    configs: Record<string, Linter.Config>;
    environments: {
      'react-native': {
        globals: Record<string, boolean>;
      };
    };
  }

  const plugin: ReactNativePlugin;
  export default plugin;
}
