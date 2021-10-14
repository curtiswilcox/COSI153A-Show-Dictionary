import React, { useState } from "react";

import {
  ActivityIndicator,
  Image,
  Overlay,
  Pressable,
  View,
} from "react-native";

import { styles } from "../styles/styles";

const ShowIcon = ({ show, callback, canPress }) => {
  const [loading, setLoading] = useState(true);

  return (
    <Pressable
      accessibilityRole={canPress ? "button" : "none"}
      onPress={callback}
      style={styles.showIcon}
    >
      <Image
        style={styles.showIcon}
        source={{ uri: show.url }}
        onLoad={() => setLoading(false)}
      />
      {loading && (
        <ActivityIndicator style={{ position: "absolute" }} size="large" />
      )}
    </Pressable>
  );
};

export default ShowIcon;
