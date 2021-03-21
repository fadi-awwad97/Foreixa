module.exports = {
    'url': 'http://127.0.0.1:8529', // The default URL for a local server
    'database': 'FirstDatabase', // The database name

    // Database user credentials to use
    'username': 'root',
    'password': 'Fadiawwad123'
};

var DB = new arangojs.Database({
    url: dbConfig.url
  });

  DB.useDatabase(dbConfig.database);

  DB.useBasicAuth(dbConfig.username, dbConfig.password);

  