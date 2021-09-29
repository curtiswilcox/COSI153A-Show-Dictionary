import { StyleSheet } from 'react-native';

import Constants from 'expo-constants';
import Device from 'react-native-device-detection';

const styles = StyleSheet.create({
  aboutButton: {
    paddingRight: 20,
  },

  grid: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 25,
  },

  info: {
    alignItems: 'top',
    padding: 20,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  primaryView: {
    padding: 20,
    justifyContent: 'space-between',
  },

  showIconHighlight: {
    backgroundColor: 'white',
    borderRadius: 20,
    border: 'thin solid gray',
    borderWidth: 1,
    shadowColor: 'gray',
    shadowRadius: 20,
  },

  showIcon: {
    resizeMode: 'stretch',
    height: 175,
    width: 175,
    borderRadius: 20,
    border: 'thin solid gray',
  },

  textInput: {
    backgroundColor: 'white',
    height: 50,
    paddingHorizontal: 20,
    borderRadius: 20,
  },

  textShowDescription: {
    paddingLeft: 20,
    fontSize: 17,
    textAlign: 'justify',
  },
});

const footerStyles = StyleSheet.create({
  authorText: {
    fontFamily: 'apple chancery',
    fontSize: 15,
    paddingHorizontal: 10,
  },

  dateText: {
    fontFamily: 'apple chancery',
    fontSize: 15,
    color: 'gainsboro',
    paddingHorizontal: 10,
  },

  footer: {
    backgroundColor: 'gray',
    flexDirection: 'row',
    padding: 20,
  },
});

if (Device.isPhone) {
  Object.assign(styles.aboutButton, {
    paddingRight: 0,
  });

  Object.assign(styles.info, {
    alignItems: 'top',
    flexDirection: 'column',
  });

  Object.assign(styles.showIcon, {
    resizeMode: 'stretch',
    height: 135,
    width: 135,
    borderRadius: 20,
    border: 'thin solid gray',
  });

  Object.assign(styles.textShowDescription, {
    paddingLeft: 0,
    paddingTop: 20,
    fontSize: 17,
    textAlign: 'justify',
  });

  Object.assign(footerStyles.dateText, {
    fontSize: 15,
    color: 'gainsboro',
    paddingHorizontal: 10,
  });
}

export { styles, footerStyles };
