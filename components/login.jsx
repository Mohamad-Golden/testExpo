import { useReducer } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import z from "zod";
import Docs from "../assets/docs.svg";
import Field from "./Field";

function reducer(state, action) {
  switch (action.type) {
    case "name":
      return { ...state, name: action.payload.text };
    case "email":
      return { ...state, email: action.payload.text };
    case "password":
      return { ...state, password: action.payload.text };
    case "validEmail":
      return { ...state, emailError: false };
    case "invalidEmail":
      return { ...state, emailError: true };
    case "validPassword":
      return { ...state, passwordError: false };
    case "invalidPassword":
      return { ...state, passwordError: true };
  }
}
function validateEmail(value) {
  const v = z.string().trim().email().safeParse(value).success;
  return v;
}
function validatePassword(value) {
  const v = z.string().trim().min(8).safeParse(value).success;
  return v;
}
const reducerInitial = {
  name: "",
  email: "",
  password: "",
  emailError: false,
  passwordError: false,
};

export default function Login() {
  const [state, dispatch] = useReducer(reducer, reducerInitial);
  const onEmailSubmit = () => {
    validateEmail(state.email)
      ? dispatch({ type: "validEmail" })
      : dispatch({ type: "invalidEmail" });
  };
  const onPasswordSubmit = () => {
    validatePassword(state.password)
      ? dispatch({ type: "validPassword" })
      : dispatch({ type: "invalidPassword" });
  };
  return (
    <View style={styles.mainWrapper}>
      <View style={styles.contentWrapper}>
        <Text style={styles.title}>Sign In</Text>
        <View style={styles.fields}>
          <Field
            title={"Name"}
            value={state.name}
            placeholder="Enter your name"
            onChangeText={(newText) => {
              dispatch({ type: "name", payload: { text: newText } });
            }}
          />
          <Field
            title={"Email"}
            value={state.email}
            helperText={"Value is not a valid email"}
            showError={state.emailError}
            placeholder="Enter your email"
            onSubmitEditing={onEmailSubmit}
            onBlur={onEmailSubmit}
            onChangeText={(newText) => {
              dispatch({ type: "email", payload: { text: newText } });
              if (state.emailError && validateEmail(newText)) {
                dispatch({ type: "validEmail" });
              }
            }}
          />
          <Field
            password
            title={"Password"}
            value={state.password}
            helperText={"Password is not valid"}
            showError={state.passwordError}
            onSubmitEditing={onPasswordSubmit}
            onBlur={onPasswordSubmit}
            secureTextEntry
            placeholder="Enter a secure password"
            onChangeText={(newText) => {
              dispatch({ type: "password", payload: { text: newText } });
              if (state.passwordError && validatePassword(newText)) {
                dispatch({ type: "validPassword" });
              }
            }}
          />
        </View>
        <View style={styles.signInButton}>
          <Button title="Sign in" color={"#5658DD"} />
          {/* <TouchableNativeFeedback underlayColor="white" onPress={() => {console.log('adsf');}}>
            <View style={{backgroundColor: "blue"}}><Text>some</Text></View>
          </TouchableNativeFeedback> */}
        </View>
        <Text style={styles.footer}>
          By signing up,I agree to
          <Text style={{ color: "#5658DD" }}>Terms of Use</Text> as well as
          <Text style={{ color: "#5658DD" }}>Privacy</Text> and{" "}
          <Text style={{ color: "#5658DD" }}>Cookies Policy</Text>.
        </Text>
      </View>
      <Docs style={styles.docsIcon} />
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    alignItems: "center",
    paddingTop: 100,
  },
  contentWrapper: {
    rowGap: 40,
    alignItems: "center",
    width: "80%",
  },
  fields: {
    rowGap: 12,
    alignSelf: "stretch",
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "700",
  },
  signInButton: {
    alignSelf: "stretch",
  },
  footer: {
    color: "#B3B8D3",
    fontSize: 12,
    textAlign: "center",
    fontWeight: "300",
  },
  docsIcon: {
    position: "absolute",
    bottom: 0,
  },
});
