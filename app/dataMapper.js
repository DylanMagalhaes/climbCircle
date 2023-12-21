const client = require('./db_client');

const dataMapper = {
  registrationNewUser: async (userName, email, password) => {
    const sql = `INSERT INTO climber(userName, email, password) VALUES ($1, $2, $3)`;
    const values = [userName, email, password]
    const results = await client.query(sql, values)
    return results.rowCount;
  },

  getAllUser: async () => {
    const sql = `SELECT * FROM climber`;
    const results = await client.query(sql)
    return results.rows;
  },

  getUserByUserName: async (userName) => {
    const sql = `SELECT * FROM climber WHERE userName=$1`;
    const values = [userName]
    const results = await client.query(sql, values)
    return results.rows[0];
  }



}
module.exports = dataMapper;


