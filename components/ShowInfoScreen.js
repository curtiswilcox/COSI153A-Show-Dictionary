import React, { useEffect, useState } from "react";

import {
  ActivityIndicator,
  Button,
  Image,
  // SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";

import EpisodeBlock from "./EpisodeBlock";
import Footer from "./Footer";

import { styles } from "../styles/styles";

import AsyncStorage from "@react-native-async-storage/async-storage";

const ShowInfoScreen = ({ navigation, route }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.aboutButton}>
          <Button
            onPress={() =>
              navigation.navigate("Favorites", {
                showname: route.params.show.name,
                filename: route.params.show.filename,
                favorites: data.filter((episode) => episode.isFavorite),
              })
            }
            title="Favorites"
          />
        </View>
      ),
    });
  });

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
            console.log(`getData error: ${e}`)
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

  return loading ? (
    <View style={{ flex: 1, alignContent: "center", justifyContent: "center" }}>
      <ActivityIndicator size="large" style={{ flex: 1 }} />
    </View>
  ) : (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View style={styles.primaryView}>
            <View style={styles.info}>
              <Image
                style={styles.showIcon}
                source={{
                  uri: route.params.show.url,
                }}
              />
              <Text style={styles.textShowDescription}>
                {route.params.show.description}
              </Text>
            </View>
            <View>
              {data.map((episode) => (
                <View key={episode.code}>
                  <EpisodeBlock
                    showname={route.params.show.filename}
                    episode={episode}
                    seasonHeaderCallback={(episode) =>
                      episode.episodeInSeason == 1
                    }
                    canFavorite={true}
                  />
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
      <Footer />
    </View>
  );
};

export default ShowInfoScreen;
