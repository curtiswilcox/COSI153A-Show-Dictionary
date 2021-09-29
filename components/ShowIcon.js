import React, { useState } from 'react';

import { Image, Pressable } from 'react-native';

import { styles } from '../styles/styles';

const ShowIcon = ({ show, callback }) => {
  const [loading, setLoading] = useState(true);
  // {loading ? <ActivityIndicator style={styles.showIcon} /> :
  // }
  /*onLoadEnd={setLoading(false)}*/
  return (
    <Pressable onPress={() => callback()} style={styles.showIconHighlight}>
      <Image
        style={styles.showIcon}
        source={{ uri: show['url'] === undefined ? show['URL'] : show['url'] }}
      />
    </Pressable>
  );
};

export default ShowIcon;
