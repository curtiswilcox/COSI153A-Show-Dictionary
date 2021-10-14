import React, { useEffect, useState } from "react";

import {
  SectionList,
  Platform,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

import EpisodeBlock from "./EpisodeBlock";
import Footer from "./Footer";
import ShowIcon from "./ShowIcon"

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
        <SectionList
          sections={route.params.favorites}
          keyExtractor={(item, index) => item + index}
          stickySectionHeadersEnabled={false}
          renderItem={({ item }) => {
            return (
              <EpisodeBlock
                showname={route.params.show.filename}
                episode={item}
                canFavorite={false}
              />
            );
          }}
          renderSectionHeader={({ section: { title } }) => {
            const seasonType = route.params.show.typeOfSeasons;
            let seasonHeader =
              seasonType.charAt(0).toUpperCase() + seasonType.slice(1);
            seasonHeader += ` ${title}`;
            const seasonTitles = route.params.show.seasonTitles;
            const seasonTitle = seasonTitles
              ? seasonTitles[title]
                ? seasonTitles[title]
                : ""
              : null;
            if (seasonTitle) {
              seasonHeader += `: ${seasonTitle}`;
            }
            return <Text style={styles.seasonHeader}>{seasonHeader}</Text>;
          }}
          ListEmptyComponent={
            <Text
              style={{
                justifyContent: "space-around",
                fontSize: 28,
                fontWeight: "bold",
                textAlign: "center",
                paddingTop: 20,
              }}
            >
              {searchText
                ? "There are no episodes that match the inputted search text."
                : "There are no episodes to see."}
            </Text>
          }
          ListHeaderComponent={
            <>
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
                <View style={styles.info}>
                  <ShowIcon
                    show={route.params.show}
                    callback={() => {}}
                    canPress={false}
                  />
                  <Text style={styles.textShowDescription}>
                    {route.params.show.description}
                  </Text>
                </View>
              </View>
            </>
          }
        />
      </View>
      <Footer />
    </View>
  );
};

export default FavoritesScreen;
