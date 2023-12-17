import { StyleSheet, Text, View } from "react-native";
import Input from "./Input";

export default function Field({ title, ...rest }) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{title}</Text>
      <Input {...rest} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { rowGap: 8,  },
  title: { color: "#B3B8D3", fontWeight: "600", fontSize: 14 },
});
