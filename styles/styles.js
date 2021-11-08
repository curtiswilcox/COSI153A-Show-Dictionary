import { Dimensions, Platform, StyleSheet } from "react-native";

import Constants from "expo-constants";

const styles = StyleSheet.create({
  aboutButton: {
    ...Platform.select({
      ios: {
        paddingRight: 0,
      },
      default: {
        paddingRight: 20,
      },
    }),
  },

  episodeBlockInner: {
    ...Platform.select({
      ios: {
        padding: "5%",
      },
      default: {
        padding: 10,
      },
    }),
  },

  episodeBlockMiddle: {
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 10,
  },

  episodeBlockOuter: {
    flexDirection: "column",
    paddingVertical: 15,
    ...Platform.select({
      ios: {
        paddingHorizontal: "4%",
      },
      default: {
        paddingHorizontal: "20%",
      },
    }),
  },

  grid: {
    justifyContent: "space-around",
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 25,
  },

  info: {
    alignItems: "flex-start",
    padding: 20,
    flex: 1,
    justifyContent: "center",
    ...Platform.select({
      ios: {
        flexDirection: "column",
      },
      default: {
        flexDirection: "row",
      },
    }),
  },

  primaryView: {
    justifyContent: "space-between",
    ...Platform.select({
      ios: {
        paddingHorizontal: "4%",
        paddingVertical: 20,
      },
      default: {
        padding: 20,
      },
    }),
  },

  seasonHeader: {
    fontSize: 28,
    paddingTop: 10,
    paddingBottom: 10,
    fontWeight: "bold",
    ...Platform.select({
      ios: {
        paddingLeft: "5%",
      },
      default: {
        paddingLeft: "20%",
      },
    }),
  },

  showIcon: {
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: "center",
    shadowColor: "gray",
    shadowRadius: 20,
    resizeMode: "stretch",
    ...Platform.select({
      ios: {
        height: Dimensions.get("window").width / 2.75,
        width: Dimensions.get("window").width / 2.75,
      },
      default: {
        height: Dimensions.get("window").width / 8.5,
        width: Dimensions.get("window").width / 8.5,
      },
    }),
  },

  textInput: {
    backgroundColor: "white",
    borderRadius: 20,
    height: 50,
    paddingHorizontal: 20,
  },

  textShowDescription: {
    fontSize: 18,
    ...Platform.select({
      ios: {
        paddingLeft: 0,
        paddingTop: 20,
        textAlign: "justify",
      },
      default: {
        paddingLeft: 20,
      },
    }),
  },
});

const footerStyles = StyleSheet.create({
  authorText: {
    fontSize: 15,
    paddingHorizontal: 10,
    ...Platform.select({
      ios: {},
      default: {
        fontFamily: "apple chancery",
      },
    }),
  },

  dateText: {
    color: "white",
    ...Platform.select({
      ios: {},
      default: {
        fontFamily: "apple chancery",
      },
    }),
  },

  footer: {
    backgroundColor: "gray",
    flexDirection: "row",
    padding: 20,
    justifyContent: "space-between",
  },
});

export { styles, footerStyles };
