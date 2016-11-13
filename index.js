const oracledb = require('oracledb');

const config = {
  user          : "",
  password      : "",
  connectString : ""
};

oracledb.getConnection(config, (err, connection) => {
  if (err) { console.error(err.message); return; }

  connection.execute(
    `SELECT
       *
     FROM
       schema.table`,
    [],
    (err, result) => {
      if (err) { console.error(err.message); return; }
      console.log(result.rows);
    }
  );
});
