import { TextInput as NativeInput, StyleSheet } from "react-native";
import theme from "../theme";
const styles = StyleSheet.create({
  textInput: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  error: {
    borderColor: theme.colors.error,
    borderWidth: 2,
  },
});

const TextInputCustomize = ({ error, style, ...props }) => {
  return (
    <NativeInput
      style={[styles.textInput, error && styles.error, style]}
      {...props}
    />
  );
};

export default TextInputCustomize;
