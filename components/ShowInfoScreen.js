import React, { useEffect, useState } from "react";

import {
  ActivityIndicator,
  Button,
  Image,
  LayoutAnimation,
  Platform,
  Pressable,
  ScrollView,
  SectionList,
  Text,
  TextInput,
  View,
} from "react-native";

import EpisodeBlock from "./EpisodeBlock";
import Footer from "./Footer";
import ShowIcon from "./ShowIcon";

import { styles } from "../styles/styles";

import AsyncStorage from "@react-native-async-storage/async-storage";
// import { BlurView, VibrancyView } from "@react-native-community/blur";

const ShowInfoScreen = ({ navigation, route }) => {
  const [originalData, setOriginalData] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, onChangeText] = useState(null);
  // const [showingSeasons, setShowingSeasons] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.aboutButton}>
          <Button
            onPress={() =>
              navigation.navigate("Favorites", {
                show: route.params.show,
                favorites: splitBySeasons(
                  originalData.filter((episode) => episode.isFavorite)
                ),
              })
            }
            title="Favorites"
          />
        </View>
      ),
    });
  }, [data]);

  useEffect(() => {
    const filteredSplit = splitBySeasons(
      originalData.filter((episode) => {
        if (!searchText) {
          return true;
        }

        return episode.filterTerms.some((term) =>
          term.includes(searchText.toLowerCase())
        );
      })
    );
    setData(filteredSplit);
  }, [searchText]);

  useEffect(() => {
    async function dealWithData() {
      const originalData = await getData();
      const seasonSplitData = splitBySeasons(originalData);
      setOriginalData(originalData);
      setData(seasonSplitData);
      // setShowingSeasons(
      //   [...new Set(originalData.map((episode) => episode.seasonNumber))].map(
      //     (seasonNumber) => {
      //       return {
      //         number: seasonNumber,
      //         showing: true,
      //       };
      //     }
      //   )
      // );
      setLoading(false);
    }
    dealWithData();
  }, []);

  const getData = async () => {
    try {
      const filename = route.params.show.filename;
      const response = await fetch(
        `https://www.cs.brandeis.edu/~curtiswilcox/show-dictionary/${filename}.json`
      );

      const data = await response.json();

      data.forEach((episode) => {
        episode.keywords = episode.keywords
          ? episode.keywords
              .split(",")
              .map((word) => word.trim())
              .filter((word) => word !== "None")
          : [];
      });

      data.forEach((episode) => {
        episode.filterTerms = [
          episode.name,
          episode.summary,
          ...episode.keywords,
        ].map((term) => term.toLowerCase());
      });

      await Promise.all(
        data.map(async (episode) => {
          episode.isFavorite = false;
          try {
            const isFavorite = await AsyncStorage.getItem(
              `@${filename}-${episode.code}`
            );
            episode.isFavorite =
              isFavorite !== null ? JSON.parse(isFavorite) : false;
          } catch (e) {
            episode.isFavorite = false;
            console.log(`getData error: ${e}`);
          }
        })
      );
      data.sort((lhs, rhs) => parseInt(lhs.code) > parseInt(rhs.code));
      return data;
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  const splitBySeasons = (data) => {
    const seasonNumbers = [
      ...new Set(data.map((episode) => parseInt(episode.seasonNumber))),
    ].sort();

    let seasonSectionStructure = [];

    seasonNumbers.forEach((season) => {
      const episodesInSeason = data
        .filter((episode) => episode.seasonNumber == season)
        .sort((lhs, rhs) => parseInt(lhs.code) > parseInt(rhs.code));
      seasonSectionStructure.push({
        title: season,
        data: episodesInSeason,
      });
    });
    seasonSectionStructure.sort(
      (lhs, rhs) =>
        parseInt(lhs.data[0].seasonNumber) > parseInt(rhs.data[0].seasonNumber)
    );
    return seasonSectionStructure;
  };

  /*
  useEffect(() => {
    async function getData() {
      try {
        const filename = route.params.show.filename;
        const response = await fetch(
          `https://www.cs.brandeis.edu/~curtiswilcox/show-dictionary/${filename}.json`
        );

        const data = await response.json();

        data.forEach(async (episode) => {
          episode.isFavorite = false;
          try {
            const isFavorite = await AsyncStorage.getItem(
              `@${filename}-${episode.code}`
            );
            episode.isFavorite =
              isFavorite !== null ? JSON.parse(isFavorite) : false;
          } catch (e) {
            episode.isFavorite = false;
            console.log(`getData error: ${e}`);
          }
        });

        setData(data);
      } catch (err) {
        setData([]);
      }
      setLoading(false);
    }

    // https://stackoverflow.com/questions/46504660/refresh-previous-screen-on-goback
    // const willFocusSubscription = navigation.addListener("focus", () => {
    //   if (data.length == 0) {
    //     getData();
    //   } else {
    //     data.forEach(async (episode) => {
    //       try {
    //         const isFavorite = await AsyncStorage.getItem(
    //           `@${route.params.show.filename}-${episode.code}`
    //         );
    //         console.log(isFavorite)
    //         episode.isFavorite =
    //           isFavorite !== null ? JSON.parse(isFavorite) : false;
    //       } catch (e) {
    //         episode.isFavorite = false;
    //         console.log(`willFocusSubscription error: ${e}`)
    //       }
    //       setData(data);
    //     });
    //   }
    // });

    // return willFocusSubscription;
    getData();
  }, []);
*/
  return loading ? (
    <View style={{ flex: 1, alignContent: "center", justifyContent: "center" }}>
      <ActivityIndicator size="large" style={{ flex: 1 }} />
    </View>
  ) : (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <SectionList
          sections={data}
          keyExtractor={(item, index) => item + index}
          stickySectionHeadersEnabled={false}
          renderItem={({ item }) => (
            <EpisodeBlock
              showname={route.params.show.filename}
              episode={item}
              canFavorite={true}
            />
          )}
          renderSectionHeader={({ section: { title } }) => {
            const seasonType = route.params.show.typeOfSeasons;
            let seasonHeader =
              seasonType.charAt(0).toUpperCase() + seasonType.slice(1);
            seasonHeader += ` ${title}`;
            const seasonTitles = route.params.show.seasonTitles;
            const seasonTitle = seasonTitles
              ? seasonTitles[title] // not a bug, there are some shows with season titles for only some of the seasons
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
                    ios: {
                      ...styles.primaryView,
                      paddingTop: 0,
                      paddingHorizontal: "1%",
                    },
                    default: {
                      ...styles.primaryView,
                      paddingHorizontal: "19%",
                    },
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

export default ShowInfoScreen;

/*<Pressable
  onPress={() => {
    LayoutAnimation.configureNext(
      LayoutAnimation.Presets.easeInEaseOut
    );
    setShowingSeasons((current) => {
      current.forEach((season) => {
        if (season.number == title.split(" ")[1]) {
          season.showing = !season.showing;
        }
      });
      return current;
    });
  }}
>
<Text
  style={[
    styles.seasonHeader,
    { accessibilityRole: "button" },
  ]}
>
  {title}
</Text>
</Pressable>*/
