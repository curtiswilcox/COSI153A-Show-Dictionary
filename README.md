# Show Dictionary
### Curtis Wilcox
### COSI 153A (Fall 2021): Tim Hickey
### CPA 2

---

### Video Link
https://www.dropbox.com/s/r1pxsg8j8ywlwgt/cpa-2.MP4?dl=0

### Reflection
- What you did well
  - I was able to modularize my code and optimize it better than I had originally had it, which I greatly appreciated.
  - Determining best practices is something I like doing -- I originally had a `sort`/`filter`/`map` system set up for display my data (within a `ScrollView`), and when I changed to the `FlatList` / `SelectList` (depending on the page) I kept the `ScrollView`. The system wasn't thrilled about that because the whole point of the `FlatList` / `SectionList` is that it calculates where you are on the page and renders data accordingly, and they cannot do that when they are within a `ScrollView`, so I had some serious performance issues when trying to filter the data (in the `TextInput` / "search bar") and also scroll down quickly, so I'm quite pleased I was able to sort that out.
- What you found challenging (if anything)
  - The `SectionList` and `FlatList` are very helpful built-in components, though `SectionList` had some interesting difficulties that took a little bit to figure out (the names of the keys of the dictionary that gets passed to the `data` argument must match the online demo, which I found slightly unintuitive though not entirely surprising).
  - Getting the `AsyncStorage` set up in the app wasn't horribly difficult, though having information sync across pages was a little rough. I have a plan to make it better for the next CPA, but it is currently not quite where I would like it.
- What are the main features you want your app to have (when you finish it in December!)
  - I would like, at a very high level, the user to be able to select a show that they want to look into and then be able to see information about the show, such as a description of it and also information on all of its episodes. The episodic information would include, but not necessarily be limited to, the title and a summary of the episode, as well as its original airdate, the person or people who wrote [CPA 2 update: the information through here has made it onto the app!] and directed it, and view the characters that appeared in certain episodes (not a full cast list, but some of the more "main" or memorable characters, for better ease of finding an episode that one may be trying to recall). Ideally, the user could also mark some episodes as "favorite" to come back to later [CPA 2 update: this is (theoretically) completed!]. I suspect that more ideas will come up as we are shown more and more things in class that I can then incorporate into this app.
