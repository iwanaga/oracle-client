const oracledb = require('oracledb');
const moment   = require('moment');

const today  = moment();
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
           count(col_name)
         FROM
           schema.table1
         WHERE
           some_date = :YYYYMMDD`,
        [today.subtract(2, 'days').format('YYYYMMDD')])
      );
    });

    let sql2 = new Promise((resolve, reject) => {
      resolve(conn.execute(
        `SELECT
           count(col_name)
         FROM
           schema.table2`,
        [])
      );
    });

    return Promise.all([sql1, sql2])
  })
  .then(results => {
    console.log(results.map(result => result.rows));
  })
  .catch(err => { console.log(err); });
