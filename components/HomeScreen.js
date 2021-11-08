import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  Dimensions,
  FlatList,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

import Footer from "./Footer";
import LoaderScreen from "./LoaderScreen";
import ShowIcon from "./ShowIcon";
import { useValue } from "./Context";

import { styles, footerStyles } from "../styles/styles";

const HomeScreen = ({ navigation }) => {
  const [searchText, onChangeText] = useState(null);
  const [originalData, setOriginalData] = useState([]);
  const [data, setData] = useState([]);
  const { currentValue: loading, setCurrentValue: setLoading } = useValue();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View>
          <View style={styles.aboutButton}>
            <Button
              onPress={() => navigation.navigate("About", {})}
              title="About"
            />
          </View>
        </View>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    async function getAllShows(options = {}) {
      try {
        const response = await fetch(
          "https://www.cs.brandeis.edu/~curtiswilcox/show-dictionary/showinformation.json"
        );
        const json = await response.json();
        const data = Object.keys(json)
          .map((showname) => json[showname])
          .sort(
            (lhs, rhs) =>
              lhs.sortName.toLowerCase() > rhs.sortName.toLowerCase()
          );

        setOriginalData(data);
        setData(data);
      } catch (err) {
        setData([]);
        console.log("Could not load from website due to " + err);
      }
      setLoading(false);
    }
    getAllShows();
  }, []);

  useEffect(() => {
    if (!searchText) {
      setData(originalData);
      return;
    }
    setData(
      originalData.filter((show) =>
        show.name.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText]);

  return (
    <LoaderScreen>
      <FlatList
        contentContainerStyle={{ flexGrow: 1 }}
        columnWrapperStyle={{
          paddingHorizontal: "5%",
          ...Platform.select({
            ios: {
              justifyContent: "space-between",
            },
            default: {
              alignSelf: "center",
            },
          }),
        }}
        data={data}
        numColumns={Platform.OS == "ios" || Platform.OS == "android" ? 2 : 7}
        keyExtractor={(item) => item.filename}
        renderItem={({ item }) => (
          <View style={{ padding: 15 }}>
            <ShowIcon
              show={item}
              callback={() => {
                navigation.navigate("ShowInfo", {
                  show: item,
                });
              }}
              canPress={true}
            />
          </View>
        )}
        ListHeaderComponent={
          <>
            <View style={styles.primaryView}>
              <TextInput
                style={styles.textInput}
                onChangeText={onChangeText}
                placeholder="Enter show name"
                clearButtonMode="always"
              />
            </View>
          </>
        }
        ListFooterComponent={<Footer />}
        ListFooterComponentStyle={{
          padding: 0,
          flex: 1,
          justifyContent: "flex-end",
          alignSelf: "auto",
        }}
      />
    </LoaderScreen>
  );
};

export default HomeScreen;
