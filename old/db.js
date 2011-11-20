var mysql = require('mysql');
var TEST_DATABASE = 'exchange';
var TEST_TABLE = 'order';
var client = mysql.createClient({
  user: 'root',
  password: 'Earlhaig07',
});

client.query('USE '+TEST_DATABASE);

client.query(
  'INSERT INTO '+TEST_TABLE+' '+
  'SET timestamp = ?, from = ?, BS = ?, stock = ?, num = ?, shares = ?, price = ?, twilio = ?, state = ?, parent = ?, address = ?, port = ?, endpoint = ?',
  ['2010-08-16 12:42:15', 'asd', 'B', 'XYZ', 'asd', '100', '1', 'true', 'p', 'asd', '123.123.123.123', '1234', '/hello/world']
);

client.query(
  'SELECT * FROM '+TEST_TABLE,
  function selectCb(err, results, fields) {
    if (err) {
      throw err;
    }

    console.log(results);
    console.log(fields);
    client.end();
  }
);