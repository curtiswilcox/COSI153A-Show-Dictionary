import React, { useState } from "react";

import { ActivityIndicator, View } from "react-native";
import { useValue } from "./Context";

const LoaderScreen = ({ children }) => {
  const { currentValue: loading } = useValue();

  return (
    <View style={{ flex: 1, alignContent: "center", justifyContent: "center" }}>
      {loading ? <ActivityIndicator size="large" /> : children}
    </View>
  );
};

export default LoaderScreen;
