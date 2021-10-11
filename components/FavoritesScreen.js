import React from "react";

import { ScrollView, Text, View } from "react-native";

import EpisodeBlock from "./EpisodeBlock";
import Footer from "./Footer";

import { styles } from "../styles/styles";

const FavoritesScreen = ({ navigation, route }) => {
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
              {route.params.favorites.map((episode) => (
                <View key={episode.code}>
                  <EpisodeBlock
                    showname={route.params.filename}
                    episode={episode}
                    seasonHeaderCallback={(episode) => {
                      const favorites = route.params.favorites;
                      for (let i = 0; i < favorites.length; i++) {
                        if (i == 0 && episode.code == favorites[0].code) {
                          return true;
                        } else if (i == 0) {
                          continue;
                        }
                        return (
                          favorites[i - 1].seasonNumber < episode.seasonNumber
                        );
                      }
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
