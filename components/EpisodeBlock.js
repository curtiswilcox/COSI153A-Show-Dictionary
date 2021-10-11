import React, { useEffect, useState } from "react";

import { Button, Pressable, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import { styles } from "../styles/styles";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { format } from "date-fns";
import { esLocale } from "date-fns/locale/es";

const dateLocals = {
  "en-US": "MMMM do, yyyy",
  es: "do 'de' MMMM yyyy",
};

const EpisodeView = ({
  showname,
  episode,
  seasonHeaderCallback,
  canFavorite,
}) => {
  let [episodeIsFavorite, setEpisodeIsFavorite] = useState(episode.isFavorite);

  useEffect(() => {
    async function setFavorite() {
      try {
        const val = await AsyncStorage.getItem(`@${showname}-${episode.code}`);
        if (val !== null) {
          const isFavorite = JSON.parse(val);
          setEpisodeIsFavorite(isFavorite);
          episode.isFavorite = JSON.parse(isFavorite);
        }
      } catch (e) {
        episode.isFavorite = false;
        console.log(`${episode.name} error: ${e}`);
      }
    }
    setFavorite();
  }, [episode.isFavorite]);

  return (
    <View style={styles.episodeBlockOuter}>
      {seasonHeaderCallback(episode) && (
        <Text
          style={{
            fontSize: 28,
            paddingTop: 20,
            paddingBottom: 5,
            fontWeight: "bold",
          }}
        >
          Season {episode.seasonNumber}
        </Text>
      )}
      <View style={styles.episodeBlockMiddle}>
        <View style={styles.episodeBlockInner}>
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 15,
              paddingBottom: 10,
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 17 }}>{episode.code}</Text>
            <Text style={{ fontSize: 17 }}>#{episode.episodeInSeries}</Text>
          </View>
          <View style={{ alignSelf: "center" }}>
            <Text style={{ fontSize: 30, textAlign: "center" }}>
              {episode.name}
            </Text>
          </View>
          <View style={{ alignSelf: "center", padding: 10 }}>
            <Text style={{ fontSize: 17, textAlign: "center" }}>
              {episode.writer}
            </Text>
            <Text style={{ fontSize: 17, textAlign: "center" }}>
              {format(
                new Date(episode.airdate),
                dateLocals[
                  "en-US"
                ] /*, {
                locale: esLocale,
              }*/
              )}
            </Text>
          </View>
          <View>
            <Text style={{ textAlign: "justify", fontSize: 18 }}>
              {episode.summary}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              paddingTop: 10,
              paddingRight: 7,
            }}
          >
            <Pressable
              accessibilityRole={canFavorite ? "button" : "image"}
              onPress={() => {
                if (!canFavorite) {
                  return;
                }
                AsyncStorage.setItem(
                  `@${showname}-${episode.code}`,
                  JSON.stringify(!episode.isFavorite)
                );
                episode.isFavorite = !episode.isFavorite;
                setEpisodeIsFavorite(episode.isFavorite); // for the state redraw
              }}
            >
              <Icon
                name={episode.isFavorite ? "star" : "star-o"}
                size={28}
                color={canFavorite ? "#24A0ED" : "black"}
              />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default EpisodeView;
