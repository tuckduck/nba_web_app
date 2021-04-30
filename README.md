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

Also a better pattern for the dispatcher/holder of references would probably be necessary as the app expands.

Add search by team to the search bar. However with the current API would require pulling the database and reindexing locally since
it currently offers no way to search for a player using team id.
