import React from 'react';

import { Text, View } from 'react-native';

import Footer from './Footer';

import { styles } from '../styles/styles';

const AboutScreen = ({ navigation, route }) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <View style={styles.primaryView}>
            <Text>
              The "Show Dictionary" app allows you select a television show and
              view further information about it. This information includes, but
              is not limited to, metadata about the show itself, as well as more
              detailed information about each episode of the show [note: this
              functionality is still forthcoming].
            </Text>
          </View>
        </View>
      </View>
      <Footer />
    </View>
  );
};

export default AboutScreen;
