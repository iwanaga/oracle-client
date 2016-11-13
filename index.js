const oracledb = require('oracledb');

const config = {
  user          : "",
  password      : "",
  connectString : ""
};

oracledb
  .getConnection(config)
  .then(conn => {
    let sql1 = new Promise((resolve, reject) => {
      resolve(conn.execute(
        `SELECT
           count(*)
         FROM
           schema.table1`,
        [])
      );
    });

    let sql2 = new Promise((resolve, reject) => {
      resolve(conn.execute(
        `SELECT
           count(*)
         FROM
           schema.table2`,
        [])
      );
    });

    return Promise.all([sql1, sql2])
  })
  .then(results => {
    console.log(results.map(result => result.rows[0][0]));
  })
  .catch(err => { console.log(err); });
