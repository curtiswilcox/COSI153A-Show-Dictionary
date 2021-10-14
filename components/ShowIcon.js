import React, { useState } from "react";

import {
  ActivityIndicator,
  Image,
  Overlay,
  Pressable,
  View,
} from "react-native";

import { styles } from "../styles/styles";

const ShowIcon = ({ show, callback }) => {
  const [loading, setLoading] = useState(true);

  return (
    <Pressable
      accessibilityRole="button"
      onPress={callback}
      style={styles.showIconHighlight}
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
