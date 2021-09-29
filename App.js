// MOVIE: https://www.dropbox.com/sh/fe5cpt5avuemgyf/AADGtr5tH3S7oMVYpHJuvV8-a?dl=0

import React from 'react';

import HomeScreen from './components/HomeScreen';
import ShowInfoScreen from './components/ShowInfoScreen';
import AboutScreen from './components/AboutScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import AsyncStorage from '@react-native-async-storage/async-storage';

let Stack = createNativeStackNavigator();

const ShowDictionaryApp = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Show Dictionary"
          component={HomeScreen}
          // options={({ navigation, route }) => ({
          //   headerTitle: (props) => (
          //       <Text style={{fontWeight: 'bold'}}>Show Dictionary</Text>
          //   ),
          // })}
        />
        {<Stack.Screen name="ShowInfo" component={ShowInfoScreen} />}
        {<Stack.Screen name="About" component={AboutScreen} />}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ShowDictionaryApp;
