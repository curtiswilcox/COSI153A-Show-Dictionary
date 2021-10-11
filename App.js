/* MOVIE (CPA 2):  */

import React from "react";

import HomeScreen from "./components/HomeScreen";
import ShowInfoScreen from "./components/ShowInfoScreen";
import AboutScreen from "./components/AboutScreen";
import FavoritesScreen from "./components/FavoritesScreen";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

let Stack = createNativeStackNavigator();

const ShowDictionaryApp = () => {
  /*
  const linking = {
    prefixes: [

    ],
    config: {
      screens: {
        ShowInfo: {
          path: '/:show',
          parse: {
            show: (show) => `${show.filename}`
          },
          // stringify: {
          //   show: (show) =>
          // }
        },
        About: 'about',
      }
    },
  }
  */

  return (
    <NavigationContainer>
      {/* linking={linking} fallback={<Text>Loading...</Text>}*/}
      <Stack.Navigator>
        <Stack.Screen name="Show Dictionary" component={HomeScreen} />
        <Stack.Screen
          name="ShowInfo"
          component={ShowInfoScreen}
          options={({ route }) => ({ title: route.params.show.name })}
        />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen
          name="Favorites"
          component={FavoritesScreen}
          options={({ route }) => ({
            title: `${route.params.showname} Favorites`,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ShowDictionaryApp;
