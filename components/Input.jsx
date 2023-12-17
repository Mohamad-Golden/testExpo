import { Animated, StyleSheet, Text, TextInput } from "react-native";
import { View } from "react-native";
import { useEffect, useRef, useState } from "react";
import { Feather } from "@expo/vector-icons";

export default function Input({
  showError,
  helperText,
  inputStyle,
  wrapperStyle,
  secureTextEntry,
  ...rest
}) {
  const [showPassword, setShowPassword] = useState(false);
  const animeValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (showError) {
      Animated.timing(animeValue, {
        useNativeDriver: true,
        toValue: 1,
        duration: 200,
      }).start();
    } else {
      Animated.timing(animeValue, {
        useNativeDriver: true,
        toValue: 0,
        duration: 200,
      }).start();
    }
  }, [animeValue, showError]);
  return (
    <View style={[styles.mainWrapper, wrapperStyle]}>
      <View style={styles.inputWrapper}>
        <TextInput
          secureTextEntry={secureTextEntry && !showPassword}
          placeholderTextColor={"#424867"}
          style={[
            styles.input,
            {
              borderColor: showError ? "#EF4444" : "#424867",
            },
            inputStyle,
          ]}
          {...rest}
        />
        {secureTextEntry ? (
          <View style={styles.eyeIconWrapper}>
            <Feather.Button
              size={20}
              name={showPassword ? "eye-off" : "eye"}
              backgroundColor={"transparent"}
              onPress={() => {
                setShowPassword((current) => !current);
              }}
            ></Feather.Button>
          </View>
        ) : null}
      </View>
      {showError && (
        <Animated.Text style={[styles.helperText, { opacity: animeValue }]}>
          {helperText}
        </Animated.Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  helperText: { color: "#EF4444", fontSize: 12, fontWeight: "500" },
  mainWrapper: { rowGap: 8 },
  inputWrapper: { position: "relative" },
  input: {
    borderWidth: 1.5,
    borderRadius: 6,
    color: "white",
    paddingLeft: 16,
    paddingRight: 50,
    paddingVertical: 12,
  },
  eyeIconWrapper: {
    position: "absolute",
    top: 0,
    right: 0,
    height: "100%",
    justifyContent: "center",
  },
});
