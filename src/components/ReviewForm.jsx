import * as yup from "yup";
import { useFormik } from "formik";
import Text from "./Text";
import { Pressable, View } from "react-native";
import { useNavigate } from "react-router-native";
import useCreateView from "src/hooks/useCreateView";
import TextInputCustomize from "./TextInputCustomize";
import { StyleSheet } from "react-native";

const initialValues = {
  ownerName: "",
  rating: 0,
  repositoryName: "",
  text: "",
};

const validationSchema = yup.object({
  ownerName: yup.string().required("ownerName is required"),
  repositoryName: yup.string().required("repositoryName is required"),
  rating: yup.number().min(0).max(100).required("rating is required"),
  text: yup.string().optional(),
});

const ReviewForm = () => {
  const navigate = useNavigate();
  const [createReview] = useCreateView();
  const onSubmit = async (values) => {
    const { ownerName, rating, repositoryName, text } = values;
    try {
      const { repositoryId } = await createReview({
        ownerName,
        rating: Number(rating),
        repositoryName,
        text,
      });
      navigate(`/repository/${repositoryId}`);
    } catch (error) {
      console.error(error);
    }
  };
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
        placeholder="Repository owner name"
        value={formik.values.ownerName}
        onChangeText={formik.handleChange("ownerName")}
        onBlur={formik.handleBlur("ownerName")}
        error={formik.touched.ownerName && formik.errors.ownerName}
      />
      {formik.touched.ownerName && formik.errors.ownerName && (
        <Text color="error" style={{ paddingBottom: 10 }}>
          {formik.errors.ownerName}
        </Text>
      )}
      <TextInputCustomize
        placeholder="Repository name"
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange("repositoryName")}
        onBlur={formik.handleBlur("repositoryName")}
        error={formik.touched.repositoryName && formik.errors.repositoryName}
      />
      {formik.touched.repositoryName && formik.errors.repositoryName && (
        <Text color="error" style={{ paddingBottom: 10 }}>
          {formik.errors.repositoryName}
        </Text>
      )}
      <TextInputCustomize
        placeholder="Rating between 0 and 100"
        value={formik.values.rating}
        onChangeText={formik.handleChange("rating")}
        onBlur={formik.handleBlur("rating")}
        error={formik.touched.rating && formik.errors.rating}
      />
      {formik.touched.rating && formik.errors.rating && (
        <Text color="error" style={{ paddingBottom: 10 }}>
          {formik.errors.rating}
        </Text>
      )}
      <TextInputCustomize
        placeholder="Review"
        value={formik.values.text}
        onChangeText={formik.handleChange("text")}
        onBlur={formik.handleBlur("text")}
        multiline
      />
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text color="white" fontWeight="bold">
          Create a Review
        </Text>
      </Pressable>
    </View>
  );
};

export default ReviewForm;

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
