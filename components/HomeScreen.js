import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Button,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';

import Footer from './Footer';
import ShowIcon from './ShowIcon';

import { styles, footerStyles } from '../styles/styles';

const axios = require('axios').default;

const HomeScreen = ({ navigation }) => {
  const [searchBar, setSearchBar] = useState(false);
  const [searchText, onChangeText] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getAllShows() {
      // const response = await fetch(
      // 'https://wilcoxcurtis.com/show-dictionary/files/shows_en.json/'  // currently doesn't work on Brandeis' network
      // );
      try {
        const response = await axios.get(
          'https://wilcoxcurtis.com/show-dictionary/files/shows_en.json',
          { timeout: 5000 }
        );
        setData(response.data);
      } catch (err) {
        setData(require('../assets/showinformation.json'));
        console.log('file fallback, due to ' + err);
      }

      setLoading(false);
    }
    getAllShows();
  }, []);

  // TODO: consider turning the About `Button` into a `Pressable` so the style can be customized (rounded border radius)
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View>
          <View style={styles.aboutButton}>
            <Button
              onPress={() => navigation.navigate('About', {})}
              title="About"
            />
          </View>
        </View>
      ),
    });
  }, [navigation]);

  return loading ? (
    <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
      <ActivityIndicator size="large" style={{ flex: 1 }} />
    </View>
  ) : (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View style={styles.primaryView}>
            {
              <TextInput
                style={styles.textInput}
                onChangeText={onChangeText}
                placeholder="Enter showname here"
              />
            }
          </View>
          <View style={styles.grid}>
            {Object.keys(data)
              .sort((lhs, rhs) => {
                const lhsSortName = (data[lhs]['sortName'] === undefined
                  ? data[lhs]['SortName']
                  : data[lhs]['sortName']
                ).toLowerCase();
                const rhsSortName = (data[rhs]['sortName'] === undefined
                  ? data[rhs]['SortName']
                  : data[rhs]['sortName']
                ).toLowerCase();

                return lhsSortName > rhsSortName;
              })
              .filter((showname) => {
                const text = searchText == null ? '' : searchText.toLowerCase();
                const sortName = showname.toLowerCase();
                const shownameProper = (data[showname]['name'] === undefined
                  ? data[showname]['Name']
                  : data[showname]['name']
                ).toLowerCase();
                return (
                  text == '' ||
                  showname.includes(text) ||
                  sortName.includes(text) ||
                  shownameProper.includes(text)
                );
              })
              .map((showname) => (
                <View style={{ padding: 10 }}>
                  {
                    <ShowIcon
                      show={data[showname]}
                      callback={() => {
                        navigation.navigate('ShowInfo', {
                          show: data[showname],
                        });
                      }}
                    />
                  }
                </View>
              ))}
            <Text style={{ flexGrow: 1 }}></Text>
            {/* The above line (with the `Text`) is a gross hack to align
        the last line of the grid to the left, while still maintaining the
        proper amount of space at the start and end of each row */}
          </View>
        </ScrollView>
      </View>
      <Footer />
    </View>
  );
};

export default HomeScreen;
