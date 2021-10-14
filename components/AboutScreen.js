import React from "react";

import { Text, ScrollView, View } from "react-native";

import Footer from "./Footer";

import { styles } from "../styles/styles";

const AboutScreen = ({ navigation, route }) => {
  return (
    <View style={{ flex: 1 }}>
      {/*<ScrollView>*/}
      <View style={{ flex: 1 }}>
        <View style={styles.primaryView}>
          <Text style={{ fontSize: 18, textAlign: "justify" }}>
            The "Show Dictionary" app allows you select a television show and
            view further information about it. This information includes, but is
            not limited to, metadata about the show itself, as well as more
            detailed information about each episode of the show. The user is
            able to "favorite" episodes of a show by pressing on the "star" icon
            under the description of each episode, and also view all episodes in
            a show that they have favorited to date. This information is locally
            persistent, so you can maintain your favorites (though on a
            device-by-device basis).
          </Text>
        </View>
      </View>
      {/*</ScrollView>*/}
      <Footer />
    </View>
  );
};

export default AboutScreen;
