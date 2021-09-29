import React from 'react';

import { Image, ScrollView, Text, View } from 'react-native';

import Footer from './Footer';

import { styles } from '../styles/styles';

const ShowInfoScreen = ({ navigation, route }) => {
  navigation.setOptions({
    headerTitle:
      route.params.show['name'] === undefined
        ? route.params.show['Name']
        : route.params.show['name'],
  });

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.primaryView}>
          <View style={styles.info}>
            <Image
              style={styles.showIcon}
              source={{
                uri:
                  route.params.show['url'] === undefined
                    ? route.params.show['URL']
                    : route.params.show['url'],
              }}
            />
            <Text style={styles.textShowDescription}>
              {route.params.show['description'] === undefined
                ? route.params.show['Description']
                : route.params.show['description']}
            </Text>
          </View>
        </ScrollView>
      </View>
      <Footer />
    </View>
  );
};

export default ShowInfoScreen;
