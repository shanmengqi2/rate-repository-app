import Text from "./Text";
import { TextInput, Pressable, View } from "react-native";
import { useFormik } from "formik";
import { StyleSheet } from "react-native";
import * as yup from "yup";
import TextInputCustomize from "./TextInputCustomize";

const initialValues = {
  username: "",
  password: "",
};

const validationSchema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const SignIn = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });
  return (
    <View style={styles.container}>
      {/* <TextInput
        style={styles.textInput}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
        onBlur={formik.handleBlur("username")}
      />*/}
      <TextInputCustomize
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
        onBlur={formik.handleBlur("username")}
        error={formik.touched.username && formik.errors.username}
      />
      {formik.touched.username && formik.errors.username && (
        <Text color="error" style={{ paddingBottom: 10 }}>
          {formik.errors.username}
        </Text>
      )}
      <TextInput
        style={styles.textInput}
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        onBlur={formik.handleBlur("password")}
        secureTextEntry
      />
      {formik.touched.password && formik.errors.password && (
        <Text color="error" style={{ paddingBottom: 10 }}>
          {formik.errors.password}
        </Text>
      )}
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text color="white" fontWeight="bold">
          Sign In
        </Text>
      </Pressable>
    </View>
  );
};

const SignInForm = () => {
  const onSubmit = (values) => {
    const username = values.username;
    const password = values.password;

    if (username && password) {
      console.log("Valid input");
    } else {
      console.log("Invalid input");
    }
  };
  return <SignIn onSubmit={onSubmit} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 25,
  },
  textInput: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  button: {
    width: "100%",
    height: 40,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  error: {
    borderColor: "red",
    borderWidth: 2,
    borderStyle: "solid",
  },
});

export default SignInForm;
