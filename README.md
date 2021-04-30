# NBA player web application
first React project for @tuckduck
## Functionality
Can search through NBA players with the search bar. The API has a search parameter which matches against player first OR last name.
When searches result in more players than can be displayed, scroll through pages with the buttons at the bottom of the page. 
Can switch between a Card and List view to view the players.
## Neat bits
Player cards are colored to reflect their team color
## Next Steps
Utilize more builtin React Components rather than building new customs. Main barrier to this is understanding how to create and inject 
components dynamically. ie. with the card grid how to create new rows/columns and then insert a new card into them dynamically. Similar
issue with using React listgroup, instead I had to work around using vanilla html.

Potential feature would be to add search by team to the search bar. However with the current API would require pulling the database and 
reindexing locally since the API currently offers no way to search for a player(s) via team id or name. The API search parameter leaves
much to be desired, so possibly looking for a better API or storing data locally would be options moving forward.

Also my current design of the dispatcher object holding all the component references probably needs improvement. Need to look further
into React "hooks" and lifecycle methods, seem to provide support for this kind of stuff.

![nba_app_example](https://user-images.githubusercontent.com/42545096/116763290-e5eab780-a9e2-11eb-9bce-94c7e61fe5c8.png)
