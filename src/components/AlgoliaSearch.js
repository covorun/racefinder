

var client = algoliasearch("YK5VY15RTR", "f37057097bc9e803ba420a539f18bd49");
var index = client.initIndex('Race');

index.setSettings({
  searchableAttributes: [
    'title',
    'location/city',
    'hasRaceDistance',
    'courseDescription',
  ],
  customRanking: ['desc(popularity)'],
});
