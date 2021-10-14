import React from 'react';

import { Platform, Text, View } from 'react-native';

import { footerStyles } from '../styles/styles';

const Footer = () => {
  return (
    <View style={footerStyles.footer}>
      <Text style={footerStyles.authorText}>Curtis Wilcox</Text>
      <Text style={footerStyles.dateText}>
        {Platform.OS == 'ios' || Platform.OS == 'android' ? "© 2021" : "Last Updated: October 15, 2021"}
      </Text>
      <Text style={footerStyles.dateText}>COSI 153A: Tim Hickey</Text>
    </View>
  );
};


export default Footer;
