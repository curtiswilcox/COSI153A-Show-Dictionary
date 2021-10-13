import React, { useEffect, useState } from "react";

import { Platform, ScrollView, Text, TextInput, View } from "react-native";

import EpisodeBlock from "./EpisodeBlock";
import Footer from "./Footer";

import { styles } from "../styles/styles";

const FavoritesScreen = ({ navigation, route }) => {
  const [searchText, onChangeText] = useState(null);

  // useEffect(() => {
  //   navigation.setOptions({
  //     searchBar: {
  //       onChangeText: (event) => onChangeText(event.nativeEvent.text),
  //     },
  //   });
  // }, [navigation]);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {route.params.favorites.length == 0 ? (
          <View style={{ padding: 10 }}>
            <Text style={{ fontSize: 20 }}>
              There are no favorites currently selected for this show.
            </Text>
          </View>
        ) : (
          <ScrollView>
            <View style={styles.primaryView}>
              <TextInput
                style={styles.textInput}
                onChangeText={onChangeText}
                placeholder="Search for an episode"
                clearButtonMode="always"
              />
            </View>

            <View
              style={{
                ...Platform.select({
                  ios: { ...styles.primaryView, paddingTop: 0 },
                  default: styles.primaryView,
                }),
              }}
            >
              {route.params.favorites
                .sort((lhs, rhs) => {
                  return lhs.code > rhs.code;
                })
                .filter((episode) => {
                  const text =
                    searchText == null ? "" : searchText.toLowerCase();
                  const keywords = episode.keywords ? episode.keywords : "None";

                  const nameKeywords = [
                    episode.name,
                    ...keywords
                      .split(",")
                      .map((word) => word.trim())
                      .filter((word) => word !== "None"),
                  ].map((term) => term.toLowerCase());
                  return (
                    text == "" ||
                    nameKeywords.some((term) => term.includes(text))
                  );
                })
                .map((episode, idx, arr) => (
                  <View key={episode.code}>
                    <EpisodeBlock
                      showname={route.params.filename}
                      episode={episode}
                      seasonHeaderCallback={(episode) => {
                        if (idx == 0) {
                          // first element
                          return true;
                        }
                        return episode.seasonNumber > arr[idx - 1].seasonNumber;
                      }}
                      canFavorite={false}
                    />
                  </View>
                ))}
            </View>
          </ScrollView>
        )}
      </View>
      <Footer />
    </View>
  );
};

export default FavoritesScreen;
