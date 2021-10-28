/* MOVIE (CPA 2):  */

import React from "react";

import { Platform } from "react-native";

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
      {/* linking={linking} fallback={<Text>Loading...</Text>} */}
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            ...Platform.select({
              ios: {
                headerLargeTitle: true,
              },
            }),
          }}
        />
        <Stack.Screen
          name="ShowInfo"
          component={ShowInfoScreen}
          options={({ route }) => ({
            title: route.params.show.name,
            // headerBackTitle: 'Home',
            ...Platform.select({
              ios: {
                headerLargeTitle: true,
              },
            }),
          })}
        />
        <Stack.Screen
          name="About"
          component={AboutScreen}
          options={{
            headerBackTitle: 'Home',
            ...Platform.select({
              ios: {
                headerLargeTitle: true,
              },
            }),
          }}
        />
        <Stack.Screen
          name="Favorites"
          component={FavoritesScreen}
          options={({ route }) => ({
            title: `Favorite Episodes from ${route.params.show.name}`,
            ...Platform.select({
              ios: {
                headerLargeTitle: true,
              },
            }),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ShowDictionaryApp;
