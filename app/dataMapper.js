const client = require('./db_client');

const dataMapper = {
  registrationNewUser: async (userName, email, password) => {
    const sql = `INSERT INTO climber(userName, email, password) VALUES ($1, $2, $3)`;
    const values = [userName, email, password]
    const results = await client.query(sql, values)
    return results.rowCount;
  }
}
module.exports = dataMapper;
