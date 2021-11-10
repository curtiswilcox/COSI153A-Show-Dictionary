# Show Dictionary
### Curtis Wilcox
### COSI 153A (Fall 2021): Tim Hickey
### CPA 4

---

### Requirements
- For CPA4 you will continue to work on your app, fixing the issue identified in CPA3. You will also need to create a README.md file which describes your app, including
  - a name for the app
  - an elevator pitch
  - screen shots
  - developer notes (e.g. what technologies you are using, what packages your using, etc.)
- create a narrated movie in which you demonstrate that
  - your app meets all of the requirements (and highlight any that you haven't yet added)
  - that your app runs on a mobile device (or on a phone simulator, not a web browser)
  - that you can run your app using expo start on your own computer (not just on snack.expo.dev)
- add some additional features to your app, including
  - FlatLists or SectionLists
  - Contexts
  - Container components (that use the children prop)
  - some components not yet covered in the class

### Video Link


### Elevator Pitch
The *Show Dictionary* is a quick-and-easy way to find information about episodes of a television show! With over 100 shows to choose from, information such as each episode's name, original release date, the writer(s)/director(s), season/episode number, and summary are readily available for speedy consumption. Should you want to keep track of which episodes you love, you may click on the "favorite star" icon found with each episode to mark when the episode is a favorite, and you can easily filter the list to view only those.

### Developer Notes
The app is based in React Native, and information is obtained from making a `fetch` request to a webpage. The main program page is a `FlatList`, and show-specific information is displayed season-by-season with a `SectionList`. `AsyncStorage` is used to keep device-specific information pertaining to whether or not an episode is a favorite. The `FontAwesome` module supplies the `Icon` component, which renders images like the "favorite" star and the chevron used to collapse seasons in the `SectionList`. Everything else comes directly from `React` / `React Native`.


### Reflection
- What you did well
  -
- What you found challenging (if anything)
  -
- What are the main features you want your app to have (when you finish it in December!)
  -


### Screen Shots
Initial View (post-load) | Bottom of Initial View | Search Bar is Active
:--------------:|:-----------:|:------------:
![test](screenshots/first.PNG) | ![test](screenshots/second.PNG) | ![test](screenshots/third.PNG)


Loading Content w/Context and Children View | Content (post-load) | Collapsed Season
:--------------:|:-----------:|:------------:
![test](screenshots/fourth.PNG) | ![test](screenshots/fifth.PNG) | ![test](screenshots/sixth.PNG)

Showing Favorites (Part 1) | Showing Favorites (Part 2)
:--------------:|:-----------:
![test](screenshots/seventh.PNG) | ![test](screenshots/eighth.PNG)
