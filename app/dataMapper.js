const client = require('./db_client');

const dataMapper = {
  registrationNewUser: async (username, email, password) => {
    const sql = `INSERT INTO climber(username, email, password) VALUES ($1, $2, $3)`;
    const values = [username, email, password]
    const results = await client.query(sql, values)
    return results.rowCount;
  },

  getAllUser: async () => {
    const sql = `SELECT * FROM climber`;
    const results = await client.query(sql)
    return results.rows;
  },

  getUserByUserName: async (username) => {
    const sql = `SELECT * FROM climber WHERE username=$1`;
    const values = [username]
    const results = await client.query(sql, values)

    return results.rows[0];
  },

  getAllFriendsOfClimber: async (climberId) => {
    const sql = 'SELECT c.* FROM climber c JOIN friendships f ON c.id = f.friend_id WHERE f.climber_id = $1';
    const values = [climberId];
    const results = await client.query(sql, values);
    return results.rows;
  },

  searchClimber: async (username) => {
    const sql = `SELECT * FROM climber WHERE username ILIKE $1`;
    const values = [`${username}%`];
    const results = await client.query(sql, values);
    return results.rows;
  }

}

module.exports = dataMapper;


