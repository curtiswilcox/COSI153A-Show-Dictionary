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

/*
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
      <SectionList
        sections={route.params.favorites}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <EpisodeBlock
            showname={route.params.showname}
            episode={item}
            canFavorite={false}
          />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.seasonHeader}>{title}</Text>
        )}
      />
      {/*route.params.favorites
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
        ))
    </View>
  </ScrollView>
)}

*/
